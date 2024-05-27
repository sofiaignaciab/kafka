import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopic, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
    private readonly kafka = new Kafka({
        brokers: ['localhost:9092'],
    });
    private readonly consumers: Consumer[] = [];

    async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig){ //specify the implementation
        const consumer = this.kafka.consumer({groupId: 'nestjs-kafka'});
        await consumer.connect(); //connect the consumer to the server
        await consumer.subscribe(topic); //listens to the correct topic
        await consumer.run(config); //run the code whenever the message is received
        this.consumers.push(consumer);
    }
    async onApplicationShutdown() {
        for(const consumer of this.consumers){
            await consumer.disconnect();
        }
    }
}
