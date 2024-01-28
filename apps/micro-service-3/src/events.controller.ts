import { Controller, Get } from '@nestjs/common';
import { MessageInterface } from '@app/rabbitmq';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('last10')
  async getLast10Events(): Promise<MessageInterface[]> {
    return await this.eventsService.getLast10Events();
  }
}
