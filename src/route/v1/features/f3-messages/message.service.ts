import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { MessageDocument } from './schemas/message.schema';
import MessageRepository from './message.repository';
import BotService from '@lazy-module/bots/bot.service';
import UserService from '@authorization/a1-user/user.service';
import ConversationService from '@features/f4-conversations/conversation.service';
import SubSuggestionService from '@features/f2-subsuggestions/sub-suggestion.service';
import CreateMessageConversationDto from './dto/create-message-conversation.dto';

@Injectable()
export default class MessageService extends BaseService<MessageDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly messageRepository: MessageRepository,
    readonly userService: UserService,
    readonly botService: BotService,
    readonly conversationService: ConversationService,
    readonly subSuggestionService: SubSuggestionService,
  ) {
    super(logger, messageRepository);
  }

  async createMessage(data: CreateMessageConversationDto) {
    const subSuggestion = await this.subSuggestionService.findOneById(
      data.subSuggestionId,
      {
        populate: {
          path: 'suggestionId',
          select: 'title',
        },
        project: {
          _id: 1,
          'suggestionId.title': 1,
          title: 1,
        },
      },
    );

    const replyFromBot = await this._getReplyFromBot({
      conversationId: data.conversationId,
      suggestionTitle: subSuggestion?.title,
      subSuggestionTitle: subSuggestion?.suggestionId.title,
      userId: data.userId,
      text: data.text,
    });

    const conversation = await this.conversationService.upsertConversation({
      conversationId: data.conversationId,
      subSuggestionId: data.subSuggestionId,
      userId: data.userId,
      title: data.text || 'Assistance request',
      latestReplyMessage: replyFromBot,
      type: data.type,
    });

    await this.userService.increaseCountMessages(data.userId);

    return this.messageRepository.create({
      ...data,
      replyFromBot,
      conversationId: conversation._id.toString(),
    });
  }

  async _getReplyFromBot(data: {
    conversationId: string;
    suggestionTitle: string;
    subSuggestionTitle: string;
    userId?: string;
    text?: string;
  }) {
    const oldChatMessages = await this.messageRepository.findManyBy(
      {
        conversationId: data.conversationId,
        userId: data.userId,
      },
      {
        projection: {
          text: 1,
          replyFromBot: 1,
          image: 1,
          document: 1,
          createdAt: 1,
        },
        sort: {
          createdAt: -1,
        },
        limit: 10,
      },
    );

    const promptList: string[] = [];
    if (oldChatMessages.length > 0)
      oldChatMessages
        .sort(
          (a: { createdAt: string }, b: { createdAt: string }) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .forEach((chat: { text: string; replyFromBot: string }) => {
          if (chat.text) {
            promptList.push(
              `\nAsker: "${chat.text.trim().replace(/\n\s*\n/g, '\n')}"`,
            );
            if (chat.replyFromBot)
              promptList.push(
                `\nBot: "${chat.replyFromBot
                  .trim()
                  .replace(/\n\s*\n/g, '\n')}"`,
              );
          }
        });

    const promptListData = promptList
      .join('')
      .trim()
      .replace(/\n\s*\n/g, '\n');

    const prompt = `Trả lời câu hỏi theo chủ đề  ${data.suggestionTitle}, trả lời nội dung hướng đến ${data.subSuggestionTitle}
      Lưu ý:
      + Bên dưới là đoạn hội thoại trước đó, Nếu đoạn hội thoại này liên quan đến câu trả lời, vui lòng dựa vào thông tin trong hội thoại để phản hồi lại, nếu không có, thì bỏ đoạn hội thoại để trả lời mới: 
      [${promptListData}].
      + Câu trả lời/phản hồi ngắn gọn, súc tích, dễ hiểu.
      Dựa trên các nội dung/lưu ý trên, phản hồi nội dung sau ( câu phản hồi phải theo đúng ngôn ngữ Asker đang dùng để hỏi):
      ${data.text}.
      Câu trả lời bao gồm hai thành phần: Tiêu đề là phần tiêu đề chung cho toàn bộ đoạn hội thoại, Trả lời là phần trả lời cho câu hỏi phía trên. 
    `;

    // generate reply
    const replyFromBot = await this.botService.generateResponseGPT4(prompt);

    return replyFromBot;
  }
}
