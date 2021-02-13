import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateOrderDto, EventName, RequestPayload } from "src/internal";
import { OrderName } from "./order.constants";

@Injectable()
export class OrderListenersService {
    public name = OrderName

    @OnEvent(`${OrderName}.${EventName.beforeCreate}`)
    async beforeCreate({ data, payload }: { data: CreateOrderDto, payload: RequestPayload }) {
        
    }
}