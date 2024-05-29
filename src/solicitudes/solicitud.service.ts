import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSolicitudDto } from '../dto/create-solicitud.dto';
import { ProducerService } from '../kafka/producer.service';

@Injectable()
export class SolicitudService {
  constructor(private prisma: PrismaService, private producerService: ProducerService) {}

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
        estado: 'received',
      },
    });
    await this.producerService.produce({
      topic: 'solicitudes-topic',
      messages: [{ value: JSON.stringify({ id: solicitud.id, estado: 'received' }) }],
    });
    //return the request
    return {
      ...solicitud,
      itemname: compra.itemname,
      price: compra.price,
    };
  }
  async findById(id: number) {
      return this.prisma.solicitud.findUnique({
          where: { id },
      });
  }

  async updateStatus(id: number, estado: string) {
      return this.prisma.solicitud.update({
          where: { id },
          data: { estado },
      });
  }
}