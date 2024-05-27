import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { SolicitudController } from './request.controller';

@Module({
  imports: [KafkaModule],
  controllers: [AppController, SolicitudController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}