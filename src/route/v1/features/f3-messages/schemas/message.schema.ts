import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TypeChatGPTEnum } from '../enum/type-chatGPT.enum';

@Schema({ timestamps: true, versionKey: false })
export class Message {
  @Prop({ type: String, ref: 'User' })
  userId: string;

  @Prop({ type: String, ref: 'Conversation' })
  conversationId: string;

  @Prop({ type: String, default: '' })
  text: string;

  @Prop({ type: String, default: '' })
  images: string;

  @Prop({ type: String, default: '' })
  document: string;

  @Prop({ type: String, default: '' })
  replyFromBot: string;

  @Prop({ type: [String], default: [] })
  suggestionQuestions: string;

  @Prop({ type: String, enum: TypeChatGPTEnum, default: TypeChatGPTEnum.GPT35 })
  typeChatGPT: TypeChatGPTEnum;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
