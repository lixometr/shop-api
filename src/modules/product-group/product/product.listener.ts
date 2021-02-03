import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class ProductListenerService {
    @OnEvent('product.preCreate')
    async preCreate({ data, payload }) {
        data.price = 200
        await new Promise(resolve => {
            setTimeout(resolve, 3000)
        })
    }
    @OnEvent('some')
    some(){ 
        console.log('some')
    }
}