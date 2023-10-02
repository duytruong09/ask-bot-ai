import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { MultiLanguage } from 'src/util/types/multi-lang';

export default class CreateSettingDto {
  @IsOptional()
  @IsString()
  readonly policy: string;

  @IsOptional()
  @IsString()
  readonly logo: string;

  @IsOptional()
  @IsString()
  readonly transactionPolicy: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsNumber()
  readonly countQuestionsFree: number;

  @IsOptional()
  @IsObject()
  privacyPolicy: MultiLanguage;

  @IsOptional()
  @IsObject()
  termsAndService: MultiLanguage;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  priceList: any[];
}
