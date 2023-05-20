import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import * as providers from './providers';
import { ImageDto, PageDto } from './dto';
import { ScanValidation } from './validations';

@Module({
  imports: [PageDto, ImageDto, ScanValidation],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class CrawlerModule {}
