import { Exclude } from 'class-transformer';
import * as _ from 'lodash';
import { EntityDefaultBlueprint, RequestPayload } from 'src/internal';



export class EntityBase {
  @Exclude()
  public _isSerialized?: boolean = false
  async serialize(payload: RequestPayload): Promise<this> {
    const resolvers = Object.keys(this).map(async (key) => {
      const item = this[key];
      if (_.isArray(item)) {
        item.map(async (itm) => {
          if (itm instanceof EntityBase) {
            await itm.serialize( payload);
          }
        });
        if (item[0] instanceof EntityDefaultBlueprint) {
          item.sort((a, b) => b.sortOrder - a.sortOrder)
        }
      }
      if (item instanceof EntityBase) {
        await item.serialize( payload);
      }
    });
    await Promise.all(resolvers);
    this._isSerialized = true
    return this;
  }
}
