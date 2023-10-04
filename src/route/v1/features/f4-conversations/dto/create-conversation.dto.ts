import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeChatEnum } from '../enum/type-chat.enum';

export default class CreateConversationDto {
  @IsMongoId()
  subSuggestionId: string;

  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  latestReplyMessage?: string;

  @IsOptional()
  @IsEnum(TypeChatEnum)
  type: TypeChatEnum;
}
