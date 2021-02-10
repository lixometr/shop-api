import * as _ from "lodash"
import { Column } from "typeorm"

export function transformCurrency(target, currencyId: number, PRICE_PROP: string) {
  if (typeof currencyId !== 'number' || !currencyId) {
    return
  }
  const _init = (arr: Array<any>): any => {
    let currencyItemIdx = arr.findIndex(item => item.currencyId === currencyId)

    if (currencyItemIdx < 0) {
      return {}
    }
    return arr[currencyItemIdx]
  }

  const _merge = (target: object, field: object): void => {
    target = _.merge(target, field)
    // delete target[PRICE_PROP]
  }

  const recursiveInit = function t(target) {
    const props = Object.keys(target)
    props.map(prop => {
      if (prop === PRICE_PROP) {
        const value = {..._init(target[prop] || [])}
        delete value.currencyId
        delete value.id
        _merge(target, value)
        return
      }

    })
  }
  recursiveInit(target)
}

export class ProductDeliveryFields {
  @Column()
  weight: number
  
  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  length: number;
}