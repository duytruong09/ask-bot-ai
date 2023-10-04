import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ConversationDocument } from './schemas/conversation.schema';
import ConversationRepository from './conversation.repository';
import UpdateConversationDto from './dto/update-conversation.dto';

@Injectable()
export default class ConversationService extends BaseService<ConversationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly conversationRepository: ConversationRepository,
  ) {
    super(logger, conversationRepository);
  }

  async upsertConversation(data: UpdateConversationDto) {
    const conversation = await this.conversationRepository.findOneById(
      data.conversationId,
    );

    if (conversation)
      return this.conversationRepository.updateOneById(conversation._id, {
        latestReplyMessage: data.latestReplyMessage,
      });

    return this.conversationRepository.create(data);
  }
}
