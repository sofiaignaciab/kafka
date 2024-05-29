import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProducerService } from '../kafka/producer.service';
import { NotificationsService } from 'src/notification/notification.service';

@Injectable()
export class ProcessingService implements OnModuleInit, OnApplicationShutdown {
  private readonly estados = ['received', 'preparing', 'delivering', 'finalized'];
  private readonly interval = 1000; //1 sec
  private processing = true;

  constructor(
    private readonly prisma: PrismaService,
    private readonly producerService: ProducerService,
    private readonly notificationService: NotificationsService
  ) {}

  async onModuleInit() {
    this.startProcessingLoop();
  }

  async startProcessingLoop() {
    while (this.processing) {
      // Obtener todas las solicitudes que no están en el estado final
      const solicitudes = await this.prisma.solicitud.findMany({
        where: {
          estado: {
            not: 'finalizado',
          },
        },
      });

      for (const solicitud of solicitudes) {
        await this.processSolicitud(solicitud);
      }

      // Esperar antes de la siguiente iteración
      await new Promise(resolve => setTimeout(resolve, this.interval));
    }
  }

  async processSolicitud(solicitud: any) {
    const { id, estado } = solicitud;
    const currentStateIndex = this.estados.indexOf(estado);

    // Enviar notificación para el estado "recibido"
    if (estado === 'received') {
      console.log(`Order id: ${id} received.`)
      await this.notificationService.notifyByEmail(id, estado);
    }

    if (currentStateIndex < this.estados.length - 1) {
      const nextState = this.estados[currentStateIndex + 1];
      await this.updateSolicitudEstado(id, nextState);

      await this.notificationService.notifyByEmail(id, nextState);

      setTimeout(() => {
        this.producerService.produce({
          topic: 'solicitudes-topic',
          messages: [{ value: JSON.stringify({ id, estado: nextState }) }],
        });
      }, this.interval);
    }
  }

  async updateSolicitudEstado(id: number, estado: string) {
    await this.prisma.solicitud.update({
      where: { id: Number(id) },
      data: { estado },
    });
    console.log(`State updated for id request ${id} to ${estado}.`);
  }

  async onApplicationShutdown() {
    this.processing = false;
  }
}
