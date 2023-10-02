import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Suggestion, SuggestionDocument } from './schemas/suggestion.schema';

@Injectable()
export default class SuggestionRepository extends BaseRepository<SuggestionDocument> {
  constructor(
    @InjectModel(Suggestion.name) model: PaginateModel<SuggestionDocument>,
  ) {
    super(model);
  }
}
