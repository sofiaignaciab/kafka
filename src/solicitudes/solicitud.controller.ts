import { Controller, Post, Body } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from '../dto/create-solicitud.dto';

@Controller('solicitudes')
export class SolicitudController{
  constructor(private readonly solicitudService: SolicitudService) {}

  @Post()
  async create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudService.create(createSolicitudDto);
  }
}