import { Body, Controller, Post } from "@nestjs/common";
import { ProducerService } from "./kafka/producer.service";

@Controller('Solicitud')
export class SolicitudController{
    constructor(private readonly producerService: ProducerService){}

    @Post()
    async createSolicitud(@Body() solicitud: any){
        const message = {
            ...solicitud,
            estado: 'recibido', //en que momento modifica eso en el .csv?
        };
        await this.producerService.produce({
            topic: 'solicitudes',
            messages: [{ value: JSON.stringify(message)} ],
        });
        return message;
    }
}