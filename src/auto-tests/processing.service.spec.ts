import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingService } from '../processing/processing.service';
import { PrismaService } from '../prisma.service';
import { ConsumerService } from '../kafka/consumer.service';
import { ProducerService } from '../kafka/producer.service';

jest.mock('../prisma.service');
jest.mock('../kafka/consumer.service');
jest.mock('../kafka/producer.service');

describe('ProcessingService', () => {
  let service: ProcessingService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingService, PrismaService, ConsumerService, ProducerService],
    }).compile();

    service = module.get<ProcessingService>(ProcessingService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should process solicitud and update state', async () => {
    const solicitud = { id: 1, estado: 'received' };

    // Mock the update method of prismaService
    prismaService.solicitud.update = jest.fn().mockResolvedValue({
      ...solicitud,
      estado: 'preparing',
    });

    await service.processSolicitud(solicitud);

    expect(prismaService.solicitud.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { estado: 'preparing' },
    });
  });
});
