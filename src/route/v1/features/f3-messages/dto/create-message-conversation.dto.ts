import { PartialType } from '@nestjs/mapped-types';

import CreateMessageDto from './create-message.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export default class CreateMessageConversationDto extends PartialType(
  CreateMessageDto,
) {
  @IsOptional()
  @IsMongoId()
  conversationId: string;
}
