import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LangEnum } from '@enum/lang.enum';
import { MultiLanguage } from 'src/util/types/multi-lang';

@Schema({ timestamps: true, versionKey: false, collection: 'suggestions' })
export class Suggestion {
  @Prop({ type: Object, required: true })
  title: MultiLanguage;

  @Prop({ type: String, default: '' })
  icon: string;
}

export type SuggestionDocument = Suggestion & Document;
export const SuggestionSchema = SchemaFactory.createForClass(Suggestion);
