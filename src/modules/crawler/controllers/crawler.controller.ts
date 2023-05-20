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
import { ImageDto } from '../dto';
import { ScanValidation } from '../validations';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly CrawlerService: CrawlerService) {}

  @Get()
  public async getTable(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    res.json({ message: 'Hello Crawler API!' });
  }

  @Get('scan')
  public async getImageTable(
    @Query() query: ScanValidation,
    @Res({ passthrough: true }) res: Response,
  ) {
    const page = await this.CrawlerService.fetchData(query.url);
    // find table
    const e = await this.CrawlerService.getElementHTML(page.document, 'table');
    if (e === null) {
      res.status(403);
      res.json({
        code: 403,
        message: 'The website has not table element!',
        data: {},
      });
    } else {
      const fileName = 'image.png';
      const image = new ImageDto();
      image.name = fileName;
      // make image and response to client.
      await this.CrawlerService.makeImage(e, image);
      const file = createReadStream(join(process.cwd(), image.outpath()));
      res.set({
        'Content-Type': image.ContentType,
        'Content-Disposition': 'attachment; filename="' + image.name + '"',
      });
      return new StreamableFile(file);
    }
  }
}
