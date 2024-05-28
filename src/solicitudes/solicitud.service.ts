import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSolicitudDto } from '../dto/create-solicitud.dto';

@Injectable()
export class SolicitudService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSolicitudDto) {
    //get name with itemid
    const compra = await this.prisma.compras.findUnique({
      where: { id: Number(data.itemid) },
    });

    if (!compra) {
      throw new Error('Item not found');
    }

    //create request
    const solicitud = await this.prisma.solicitud.create({
      data: {
        correo: data.correo,
        itemid: Number(data.itemid),
        estado: 'recibido',
      },
    });
    //return the request
    return {
      ...solicitud,
      itemname: compra.itemname,
      price: compra.price,
    };
  }
}