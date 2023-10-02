import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MultiLanguage } from 'src/util/types/multi-lang';
import { LangEnum } from '@enum/lang.enum';

@Schema({ timestamps: true, versionKey: false })
export class Setting {
  @Prop({ type: String, default: '' })
  readonly policy: string;

  @Prop({ type: String, default: '' })
  readonly logo: string;

  @Prop({ type: String, default: '' })
  readonly transactionPolicy: string;

  @Prop({ type: String, default: '' })
  readonly image: string;

  @Prop({ type: Number, default: 0 })
  readonly countQuestionsFree: number;

  @Prop({ type: Object, default: { [LangEnum.english]: '' } })
  privacyPolicy: MultiLanguage;

  @Prop({ type: Object, default: { [LangEnum.english]: '' } })
  termsAndService: MultiLanguage;

  @Prop({
    type: [
      {
        title: { type: Object, [LangEnum.english]: '' },
        money: Number,
        discountPercent: Number,
        unit: String,
        days: Number,
      },
    ],
    default: [],
  })
  priceList: {
    title: MultiLanguage;
    money: number;
    discountPercent: number;
    unit: string;
    days: number;
  }[];
}

export type SettingDocument = Setting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);
