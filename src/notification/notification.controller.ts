import { Body, Controller, Post,Get, Param, Delete } from '@nestjs/common';
import { CreateNotificationDTO } from './dto/createnotification.dto';
import { NotificationService } from './notification.service';
import { Notification } from './schemas/notification.schema';

@Controller('notification')
export class NotificationController {

    constructor(private notificationService: NotificationService) {}

    @Post()
    async create(@Body() createNotificationDto:CreateNotificationDTO ):Promise<Notification> {
        return this.notificationService.create(createNotificationDto);
    }

    @Get()
    async findAll():Promise<Notification[]> {
        return this.notificationService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params):Promise<Notification> {
        return this.notificationService.findOne(params.id);
    }

    @Delete(':id')
    async remove(@Param() params):Promise<Notification> {
        return this.notificationService.remove(params.id);
    }

    @Post('remove-all')
    async removeAll() {
        return this.notificationService.removeAll();
    }

}
