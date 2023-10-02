import { PartialType } from '@nestjs/mapped-types';

import CreateSubSuggestionDto from './create-sub-suggestion.dto';

export default class UpdateSubSuggestionDto extends PartialType(
  CreateSubSuggestionDto,
) {}
