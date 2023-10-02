import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SubSuggestion,
  SubSuggestionSchema,
} from './schemas/sub-suggestion.schema';
import SubSuggestionController from './sub-suggestion.controller';
import SubSuggestionRepository from './sub-suggestion.repository';
import SubSuggestionService from './sub-suggestion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubSuggestion.name,
        schema: SubSuggestionSchema,
      },
    ]),
  ],
  controllers: [SubSuggestionController],
  providers: [SubSuggestionService, SubSuggestionRepository],
  exports: [SubSuggestionService, SubSuggestionRepository],
})
export default class SubSuggestionModule {}
