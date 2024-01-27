import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
