import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Message, MessageDocument } from './schemas/message.schema';
import CreateMessageDto from './dto/create-message.dto';

@Injectable()
export default class MessageRepository extends BaseRepository<MessageDocument> {
  constructor(
    @InjectModel(Message.name) model: PaginateModel<MessageDocument>,
  ) {
    super(model);
  }
}
