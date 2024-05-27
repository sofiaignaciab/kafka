import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown{
    private readonly kafka = new Kafka({
        brokers: ['localhost:9092'],
    });
    private readonly producer: Producer = this.kafka.producer();

    //connect the producer to the server
    async onModuleInit() {
        await this.producer.connect();
    }
    //to produce messages
    async produce(record: ProducerRecord){
        await this.producer.send(record);
    }

    //disconnect the producer when the app stops
    async onApplicationShutdown() {
        await this.producer.disconnect();
    }

}