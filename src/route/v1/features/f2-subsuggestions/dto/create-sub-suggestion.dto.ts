import { MultiLanguage } from '@interface/multi-language.interface';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MultiLanguageDto } from 'src/util/types/dto/multi-lang.dto';

export default class CreateSubSuggestionDto {
  @IsNotEmpty()
  @IsMongoId()
  suggestionId: string;

  @IsNotEmpty()
  @Type(() => MultiLanguageDto)
  title: MultiLanguage;

  @IsOptional()
  @IsString()
  defaultMessage: string;
}
