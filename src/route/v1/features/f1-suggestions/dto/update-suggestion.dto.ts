import { PartialType } from '@nestjs/mapped-types';

import CreateSuggestionDto from './create-suggestion.dto';

export default class UpdateSuggestionDto extends PartialType(
  CreateSuggestionDto,
) {}
