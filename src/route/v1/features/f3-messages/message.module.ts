import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Message, MessageSchema } from './schemas/message.schema';
import MessageController from './message.controller';
import MessageRepository from './message.repository';
import MessageService from './message.service';
import BotService from '@lazy-module/bots/bot.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, BotService],
  exports: [MessageService, MessageRepository],
})
export default class MessageModule {}
