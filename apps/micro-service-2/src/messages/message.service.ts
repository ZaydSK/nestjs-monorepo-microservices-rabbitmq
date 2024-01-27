import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { MessageInterface } from '@app/rabbitmq';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(message: MessageInterface): Promise<Message> {
    const createdMessage = new this.messageModel(message);
    return await createdMessage.save();
  }

  async findLast10(): Promise<Message[]> {
    return this.messageModel.find().sort({ createdAt: -1 }).limit(10).exec();
  }
}
