import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notification.service';

@Controller('notification')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':id')
  async getSolicitudStatus(@Param('id') id: string) {
    return this.notificationsService.getSolicitudStatus(Number(id));
  }
}
