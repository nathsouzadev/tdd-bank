import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OperationsDto } from './dto/operations.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/cashin')
  cashIn(@Body() operationsDto: OperationsDto) {
    return this.appService.cashin(operationsDto.id, operationsDto.value);
  }

  @Post('/purchase')
  purchase(@Body() operationsDto: OperationsDto) {
    return this.appService.purchase(operationsDto.id, operationsDto.value);
  }
}
