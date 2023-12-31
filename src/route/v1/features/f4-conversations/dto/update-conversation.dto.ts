import { PartialType } from '@nestjs/mapped-types';

import CreateConversationDto from './create-conversation.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export default class UpdateConversationDto extends PartialType(
  CreateConversationDto,
) {
  @IsOptional()
  @IsMongoId()
  conversationId: string;
}
