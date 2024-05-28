import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSolicitudDto } from '../dto/create-solicitud.dto';

@Injectable()
export class SolicitudService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSolicitudDto) {
    return this.prisma.solicitud.create({
      data: {
        correo: data.correo,
        itemid: data.itemid,
        estado: 'recibido',
      },
    });
  }
}