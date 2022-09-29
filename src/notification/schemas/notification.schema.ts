import {SchemaFactory,Prop,Schema} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotifcationDocument = Notification & Document

@Schema()
export class Notification {
    @Prop({required:true})
    message: string;

    @Prop()
    user_id: number;

    @Prop()
    object_id: number;

    @Prop()
    service_id: number;
}

export const NotifcationSchema = SchemaFactory.createForClass(Notification);