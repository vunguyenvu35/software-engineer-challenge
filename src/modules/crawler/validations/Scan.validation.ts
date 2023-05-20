import { IsNotEmpty } from 'class-validator';

export class ScanValidation {
  @IsNotEmpty()
  url: string;
}
