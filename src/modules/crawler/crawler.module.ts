import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import * as providers from './providers';
import { ImageDto, PageDto } from './dto';

@Module({
  imports: [PageDto, ImageDto],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class CrawlerModule {}
