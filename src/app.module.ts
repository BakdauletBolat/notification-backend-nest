import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot(
    {
      load: [configuration]
    }
  ),
            MongooseModule.forRoot('mongodb+srv://bakdaulet:baguvix123F@cluster0.3ljul.mongodb.net/?retryWrites=true&w=majority'),
            NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
