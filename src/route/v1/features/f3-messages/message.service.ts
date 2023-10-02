import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { MessageDocument } from './schemas/message.schema';
import MessageRepository from './message.repository';
import CreateMessageDto from './dto/create-message.dto';
import BotService from '@lazy-module/bots/bot.service';
import WebsocketCustomGateway from '@lazy-module/websocket-custom/websocket-custom.gateway';
import UserService from '@authorization/a1-user/user.service';
import ConversationService from '@features/f4-conversations/conversation.service';

@Injectable()
export default class MessageService extends BaseService<MessageDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly messageRepository: MessageRepository,
    readonly userService: UserService,
    readonly botService: BotService,
    readonly conversationService: ConversationService,
    private readonly websocketCustomGateway: WebsocketCustomGateway,
  ) {
    super(logger, messageRepository);
  }
}
