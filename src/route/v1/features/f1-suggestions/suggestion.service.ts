import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { SuggestionDocument } from './schemas/suggestion.schema';
import SuggestionRepository from './suggestion.repository';

@Injectable()
export default class SuggestionService extends BaseService<SuggestionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly suggestionRepository: SuggestionRepository,
  ) {
    super(logger, suggestionRepository);
  }
}
