import { Expose } from "class-transformer";
import { EntityLocaleDefaultBlueprint, SerializeGroup } from "src/internal";
import { Entity, OneToMany } from "typeorm";
import { NotificationLocale } from "./notification.tr.entity";

@Entity()
export class Notification extends EntityLocaleDefaultBlueprint{
    
    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => NotificationLocale, notyLocale => notyLocale.item, { cascade: true, eager: true })
    locale: NotificationLocale[];

}
