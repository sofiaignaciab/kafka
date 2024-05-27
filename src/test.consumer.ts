import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./kafka/consumer.service";

@Injectable()
export class TestConsumer implements OnModuleInit{
    constructor(private readonly consumerService: ConsumerService){}

    async onModuleInit() { 
        await this.consumerService.consume(
            // this is where we subscribe to the topic
            { topic: 'test' }, 
            // execute the code whenever the message is received
            {
            eachMessage: async({topic, partition, message}) => {
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString(),
                })
            }
        })
    }
}