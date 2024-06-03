import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from '../dto/create-solicitud.dto';

@Controller('solicitudes')
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) {}

  @Post()
  async create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudService.create(createSolicitudDto);
  }

  @Get(':id')
  async getSolicitudEstado(@Param('id') id: string) {
    const solicitudId = parseInt(id, 10);
    if (isNaN(solicitudId)) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    const solicitud = await this.solicitudService.findById(solicitudId);
    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
    return {
      id: solicitud.id,
      estado: solicitud.estado,
    };
  }
}
