import { DefaultRepository } from "src/blueprints";
import { EntityRepository } from "typeorm";
import {Notification} from "../entities/notification.entity"
import { NotificationName } from "../notification.constants";

@EntityRepository(Notification)
export class NotificationRepository extends DefaultRepository<Notification>{
    public name  = NotificationName
}