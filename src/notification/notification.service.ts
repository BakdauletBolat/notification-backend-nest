
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {Notification,NotifcationDocument} from './schemas/notification.schema';
import { CreateNotificationDTO } from './dto/createnotification.dto';


@Injectable()
export class NotificationService {

    constructor(@InjectModel(Notification.name) private notificationModel: Model<NotifcationDocument>) {}

    async create(createNotificationDto: CreateNotificationDTO): Promise<Notification> {
        const notification = new this.notificationModel(createNotificationDto);
        return notification.save();
    }

    async findAll(): Promise<Notification[]> {
        return this.notificationModel.find().sort({'_id': -1}).exec();
    }

    async findOne(id:number): Promise<Notification> {
        const notification = this.notificationModel.findById(id);
        return notification;
    }

    async remove(id:number): Promise<Notification> {
        const notification = this.notificationModel.findByIdAndDelete(id);
        return notification;
    }

    async removeAll() {
        await this.notificationModel.deleteMany();
    }

}


