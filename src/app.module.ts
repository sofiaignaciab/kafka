import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { PrismaService } from './prisma.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AppService, TestConsumer, PrismaService],
})
export class AppModule {}