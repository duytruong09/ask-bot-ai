import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Conversation,
  ConversationSchema,
} from './schemas/conversation.schema';
import ConversationController from './conversation.controller';
import ConversationRepository from './conversation.repository';
import ConversationService from './conversation.service';
import MessageModule from '@features/f3-messages/message.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Conversation.name,
        schema: ConversationSchema,
      },
    ]),
    MessageModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
  exports: [ConversationService, ConversationRepository],
})
export default class ConversationModule {}
