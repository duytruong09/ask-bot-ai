import { Request } from 'express';

import { routerHelper } from '@helper/router.helper';
import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import AppService from './app.service';
import BotService from '@lazy-module/bots/bot.service';

@ApiTags('Welcome')
@Controller()
export default class AppController {
  private data: string = '';
  constructor(
    private readonly appService: AppService,
    private readonly botService: BotService,
  ) {}

  @Get()
  async sayHello(@Query('prompt') prompt: string): Promise<string> {
    this.data = `${this.data}${prompt}\n`;
    const reply = await this.botService.generateResponseGPT4(this.data);

    this.data = `${this.data}${reply}\n`;

    console.log({ reply });
    return this.data;
  }
}
