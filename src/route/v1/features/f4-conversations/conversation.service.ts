import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationDocument } from './schemas/conversation.schema';
import ConversationRepository from './conversation.repository';
import MessageRepository from '@features/f3-messages/message.repository';

@Injectable()
export default class ConversationService extends BaseService<ConversationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly conversationRepository: ConversationRepository,
    readonly messageRepository: MessageRepository,
  ) {
    super(logger, conversationRepository);
  }
}
