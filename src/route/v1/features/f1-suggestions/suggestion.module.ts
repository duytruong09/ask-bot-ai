import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Suggestion, SuggestionSchema } from './schemas/suggestion.schema';
import SuggestionController from './suggestion.controller';
import SuggestionRepository from './suggestion.repository';
import SuggestionService from './suggestion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Suggestion.name,
        schema: SuggestionSchema,
      },
    ]),
  ],
  controllers: [SuggestionController],
  providers: [SuggestionService, SuggestionRepository],
  exports: [SuggestionService, SuggestionRepository],
})
export default class SuggestionModule {}
