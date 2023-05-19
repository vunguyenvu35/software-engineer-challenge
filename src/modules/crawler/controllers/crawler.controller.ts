import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { CrawlerService } from '../providers';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly CrawlerService: CrawlerService) {}

  @Get()
  public async getTable(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    res.json({ message: 'Hello!' });
  }

  @Get('scan')
  public async getFile(
    @Query('url') url: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const body = await this.CrawlerService.fetchData(url);
    await this.CrawlerService.makeImage(body);
    const fileName = 'image.png';
    const filePath = './storage/image.png';
    const file = createReadStream(join(process.cwd(), filePath));
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="' + fileName + '"',
    });
    return new StreamableFile(file);
  }
}
