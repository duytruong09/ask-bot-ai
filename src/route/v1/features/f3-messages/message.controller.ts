import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import CreateMessageDto from './dto/create-message.dto';
import UpdateMessageDto from './dto/update-message.dto';
import MessageService from './message.service';
import SettingService from '@common/c13-setting/setting.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { editFileName } from '@lazy-module/storage/storage.helper';
import StorageService from '@lazy-module/storage/storage.service';
import { unlinkSync } from 'fs';

@ApiTags('Messages')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly settingService: SettingService,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(
    @ApiQueryParams() { filter, population, ...options }: AqpDto,
  ): Promise<any> {
    const result = await this.messageService.findManyBy(filter, {
      populate: population,
      ...options,
    });
    return result;
  }

  /**
   * convert image to text
   *
   * @param body
   * @returns
   */
  @Post('/upload-image-to-text')
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', '..', '..', 'public'),
        filename: editFileName,
      }),
    }),
  )
  async convertImageToText(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const { fileUrl } = await this.storageService.uploadFile(file.path);

    const text = await this.settingService.convertImageToText(fileUrl);

    unlinkSync(file.path);

    return { text, fileUrl };
  }

  /**
   * Document to text
   *
   * @param body
   * @returns
   */
  @Post('/upload-file-to-text')
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', '..', '..', 'public'),
        filename: editFileName,
      }),
    }),
  )
  async convertDocumentToText(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const text = await this.settingService.convertDocumentToText(file);

    const { fileUrl } = await this.storageService.uploadFile(file.path);

    unlinkSync(file.path);

    return { text, fileUrl };
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateMessageDto): Promise<any> {
    return this.messageService.create(body);
  }

  /**
   * Update by ID
   *
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateMessageDto,
  ): Promise<any> {
    const result = await this.messageService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   *
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.messageService.deleteManyHardByIds(
      ids.split(',').map((item: any) => new Types.ObjectId(item)),
    );
    return result;
  }

  /**
   * Delete by ID
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.messageService.deleteOneHardById(id);

    return result;
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.messageService.paginate(query);
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams() { population, projection }: AqpDto,
  ): Promise<any> {
    const result = await this.messageService.findOneById(id, {
      populate: population,
      projection,
    });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
