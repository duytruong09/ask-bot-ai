import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MultiLanguage } from 'src/util/types/multi-lang';
import { TypeChatEnum } from '../enum/type-chat.enum';

@Schema({ timestamps: true, versionKey: false })
export class Conversation {
  @Prop({ type: String, ref: 'Suggestion' })
  suggestionId: string;

  @Prop({ type: String, ref: 'User' })
  userId: string;

  @Prop({ type: Object, required: true })
  title: MultiLanguage;

  @Prop({ type: String })
  firstMessage: string;

  @Prop({ type: String })
  firstReplyMessage: string;

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
