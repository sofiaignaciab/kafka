import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { PrismaService } from './prisma.service';
import { SolicitudService } from './solicitudes/solicitud.service';
import { SolicitudController } from './solicitudes/solicitud.controller';

@Module({
  imports: [KafkaModule],
  controllers: [AppController, SolicitudController],
  providers: [AppService, TestConsumer, PrismaService, SolicitudService],
})
export class AppModule {}