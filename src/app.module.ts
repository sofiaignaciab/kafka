import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { PrismaService } from './prisma.service';
import { SolicitudService } from './solicitudes/solicitud.service';
import { SolicitudController } from './solicitudes/solicitud.controller';
import { ProcessingService } from './processing/processing.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController, SolicitudController],
  providers: [AppService, TestConsumer, PrismaService, SolicitudService, ProcessingService],
})
export class AppModule {}