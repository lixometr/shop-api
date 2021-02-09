import { Exclude } from 'class-transformer';
import * as _ from 'lodash';

export interface EntityBaseMetadata {
  groups: Array<string>;
}

export class EntityBase {
  @Exclude()
  public _isSerialized? = false
  async serialize(metadata: EntityBaseMetadata, payload: any): Promise<this> {
    const resolvers = Object.keys(this).map(async (key) => {
      const item = this[key];
      if (_.isArray(item)) {
        item.map(async (itm) => {
          if (itm instanceof EntityBase) {
            await itm.serialize(metadata, payload);
          }
        });
      }
      if (item instanceof EntityBase) {
        await item.serialize(metadata, payload);
      }
    });
    await Promise.all(resolvers);
    this._isSerialized = true
    return this;
  }
}
