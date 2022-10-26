import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { MongoDbIdDto } from '../common/dto/mongoDbId.dto';
import { TakeBookDto } from './dto/take.book.dto';
import { ReturnDateDto } from './dto/return.date.dto';
import { RebateBookDto } from './dto/rebate.book.dto';
import { UpdateReturndateDto } from './dto/update.returndate.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/:id/take')
  async takeBook(
    @Body() takeBookDto: TakeBookDto,
    @Body() returnDateDto: ReturnDateDto,
    @Param() param: MongoDbIdDto,
  ) {
    const result = await this.clientService.takeBook(
      takeBookDto,
      param.id,
      returnDateDto,
    );

    return { statusCode: 201, data: result, message: 'OK' };
  }

  @Post('/:id/rebate')
  async rebateBook(
    @Param() param: MongoDbIdDto,
    @Body() rebateBookDto: RebateBookDto,
  ) {
    const result = await this.clientService.rebateBook(param.id, rebateBookDto);
    return { statusCode: 201, data: result, message: 'OK' };
  }

  @Post('/:id/update-returnDate')
  async updateReturnDate(
    @Body() returnDateDto: UpdateReturndateDto,
    @Param() param: MongoDbIdDto,
  ) {
    const result = await this.clientService.updateReturnDate(
      returnDateDto,
      param.id,
    );

    return { statusCode: 201, data: result, message: 'OK' };
  }
}
