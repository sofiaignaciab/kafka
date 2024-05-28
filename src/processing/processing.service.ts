import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { PrismaService } from '../prisma.service';
import { ProducerService } from '../kafka/producer.service';

@Injectable()
export class ProcessingService implements OnModuleInit, OnApplicationShutdown {
  private readonly estados = ['recibido', 'preparando', 'entregando', 'finalizado'];
  private readonly estadoInterval = 1000; //1 sec

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly prisma: PrismaService,
    private readonly producerService: ProducerService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'solicitudes-topic' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const solicitud = JSON.parse(message.value.toString());
          console.log(`Processing solicitud: ${JSON.stringify(solicitud)}`);
          await this.processSolicitud(solicitud);
        },
      },
    );
  }

  async processSolicitud(solicitud: any) {
    const { id, estado } = solicitud;
    const currentStateIndex = this.estados.indexOf(estado);
    console.log(`Current state: ${estado}`);

    if (currentStateIndex < this.estados.length - 1) {
      const nextState = this.estados[currentStateIndex + 1];
      console.log(`Updating state to: ${nextState}`);
      await this.updateSolicitudEstado(id, nextState);

      setTimeout(() => {
        this.producerService.produce({
          topic: 'solicitudes-topic',
          messages: [{ value: JSON.stringify({ id, estado: nextState }) }],
        });
      }, this.estadoInterval);
    }
  }

  async updateSolicitudEstado(id: number, estado: string) {
    await this.prisma.solicitud.update({
      where: { id: Number(id) },
      data: { estado },
    });
    console.log(`State updated for solicitud ${id} to ${estado}`);
  }

  async onApplicationShutdown() {
    await this.consumerService.onApplicationShutdown();
  }
}
