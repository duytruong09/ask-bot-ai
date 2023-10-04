import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MultiLanguage } from 'src/util/types/multi-lang';
import { TypeChatEnum } from '../enum/type-chat.enum';

@Schema({ timestamps: true, versionKey: false })
export class Conversation {
  @Prop({ type: String, ref: 'SubSuggestion' })
  subSuggestionId: string;

  @Prop({ type: String, ref: 'User' })
  userId: string;

  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String })
  latestReplyMessage: string;

  @Prop({
    type: String,
    enum: TypeChatEnum,
    default: TypeChatEnum.CHAT_HISTORY,
  })
  type: TypeChatEnum;
}

export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.index({ chatName: 'text' });
