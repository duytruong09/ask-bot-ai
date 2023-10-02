import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  SubSuggestion,
  SubSuggestionDocument,
} from './schemas/sub-suggestion.schema';

@Injectable()
export default class SubSuggestionRepository extends BaseRepository<SubSuggestionDocument> {
  constructor(
    @InjectModel(SubSuggestion.name)
    model: PaginateModel<SubSuggestionDocument>,
  ) {
    super(model);
  }
}
