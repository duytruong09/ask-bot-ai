import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { SubSuggestionDocument } from './schemas/sub-suggestion.schema';
import SubSuggestionRepository from './sub-suggestion.repository';

@Injectable()
export default class SubSuggestionService extends BaseService<SubSuggestionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly subSuggestionRepository: SubSuggestionRepository,
  ) {
    super(logger, subSuggestionRepository);
  }
}
