import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import {Notification, NotifcationSchema} from './schemas/notification.schema';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService,NotificationGateway],
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,schema: NotifcationSchema
      }
    ])
  ]
})
export class NotificationModule {}
