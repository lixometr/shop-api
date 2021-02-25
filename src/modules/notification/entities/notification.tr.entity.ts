import { LOCALE_REL_OPTIONS } from "src/constants";
import { EntityTranslationBlueprint } from "src/internal";
import { Column, Entity, ManyToOne } from "typeorm";
import { Notification } from "./notification.entity"

@Entity()
export class NotificationLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Notification, noty => noty.locale, LOCALE_REL_OPTIONS)
    item: Notification;

    @Column({nullable: true})
    name: string;

    @Column()
    text: string

    @Column({nullable: true})
    link: string

    @Column('date', {nullable: true})
    date: Date
}