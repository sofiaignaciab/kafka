import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async notifyByEmail(solicitudId: number, estado: string) {
    const solicitud = await this.prisma.solicitud.findUnique({
      where: { id: solicitudId },
    });

    if (!solicitud) {
      throw new Error('Solicitud not found');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: solicitud.correo,
      subject: 'Request Status Update',
      text: `Your request with ID ${solicitud.id} has changed to: ${estado}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async getSolicitudStatus(solicitudId: number) {
    return this.prisma.solicitud.findUnique({
      where: { id: solicitudId },
    });
  }
}
