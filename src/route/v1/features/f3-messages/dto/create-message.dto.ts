import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { TypeChatGPTEnum } from '../enum/type-chatGPT.enum';
import { TypeChatEnum } from '@features/f4-conversations/enum/type-chat.enum';

export default class CreateMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsMongoId()
  conversationId: string;

  @ValidateIf((o) => !(o.images || o.document))
  @IsString()
  text: string;

  @ValidateIf((o) => !(o.text || o.document))
  @IsString()
  images: string;

  @ValidateIf((o) => !(o.images || o.text))
  @IsString()
  document: string;

  @IsOptional()
  @IsEnum(TypeChatGPTEnum)
  typeChatGPT: TypeChatGPTEnum;

  @IsOptional()
  @IsMongoId()
  subSuggestionId?: string;

  @IsOptional()
  @IsEnum(TypeChatEnum)
  type: TypeChatEnum;
}
