import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LangEnum } from '@enum/lang.enum';
import { MultiLanguage } from 'src/util/types/multi-lang';

@Schema({ timestamps: true, versionKey: false, collection: 'subsuggestions' })
export class SubSuggestion {
  @Prop({ type: String, ref: 'Suggestion' })
  suggestionId: string;

  @Prop({ type: Object, required: true })
  title: MultiLanguage;

  @Prop({ type: String, default: '' })
  defaultMessage: string;
}

export type SubSuggestionDocument = SubSuggestion & Document;
export const SubSuggestionSchema = SchemaFactory.createForClass(SubSuggestion);
