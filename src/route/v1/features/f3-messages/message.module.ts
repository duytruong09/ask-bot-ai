import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Message, MessageSchema } from './schemas/message.schema';
import MessageController from './message.controller';
import MessageRepository from './message.repository';
import MessageService from './message.service';
import BotService from '@lazy-module/bots/bot.service';
import SubSuggestionModule from '@features/f2-subsuggestions/sub-suggestion.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
    SubSuggestionModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, BotService],
  exports: [MessageService, MessageRepository],
})
export default class MessageModule {}
