import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MultiLanguageDto } from 'src/util/types/dto/multi-lang.dto';
import { MultiLanguage } from 'src/util/types/multi-lang';
import { TypeChatEnum } from '../enum/type-chat.enum';

export default class CreateConversationDto {
  @IsMongoId()
  suggestionId: string;

  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @Type(() => MultiLanguageDto)
  title: MultiLanguage;

  @IsOptional()
  @IsString()
  firstMessage?: string;

  @IsOptional()
  @IsString()
  firstReplyMessage?: string;

  @IsOptional()
  @IsEnum(TypeChatEnum)
  type: TypeChatEnum;
}
