import { ConnectedSocket, MessageBody,OnGatewayConnection,OnGatewayInit,SubscribeMessage,WebSocketGateway, WebSocketServer, } from "@nestjs/websockets";

import {  Request } from "@nestjs/common";
import { CreateNotificationDTO } from "./dto/createnotification.dto";
import { NotificationService } from "./notification.service";
import { Socket,Server } from "socket.io";
import jwt_decode from "jwt-decode";

interface NotificationProps {
    data: CreateNotificationDTO,
    room_name: string
}

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayInit,OnGatewayConnection {

    @WebSocketServer()
    server: Server;


    afterInit(server: any) {
        // console.log(server);
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('connected',client.id);
    }

    @SubscribeMessage('notification')
    async handleNotification(@MessageBody() {data,room_name}:any, @ConnectedSocket() socket:Socket ) {           
        this.server.to(room_name).emit('notification',data);   
        console.log(socket.rooms)
        return data;
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@ConnectedSocket() socket:Socket,@MessageBody() {room_name},@Request() request ) {
        const token:string = request.handshake.auth.Authorization.split(' ')[1]
        const decoded:any = jwt_decode(token);
        if (decoded?.role == 10) {
            if (room_name == 'delivery') {
                socket.join(room_name);
                console.log('joined')
            }
            else{
                return {
                    'status': 403,
                    'message': 'Permission Denied'
                }
            }
            
        }
        else{
            return {
                'status': 403,
                'message': 'Permission Denied'
            }
        }
        

        return {
            'status': 200,
            'message': "All ok"
        }


        
    }

}