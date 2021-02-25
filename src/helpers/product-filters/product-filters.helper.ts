import { Attribute, AttributeFilters } from "src/internal"
import { ProductAttribute } from "src/internal"
import { ProductFilters } from "./product-filters.entity"
import { Product } from "src/internal"
import { AttributeValue } from "src/modules"
import { AttributeFiltersValue, IAvailableFilters } from "./product-filters.types"

export function filterItems(items: Product[], filters: ProductFilters) {
    const filterAttributes = filters.getAttributes()
    const filterPrice = filters.getPrice()
    let filtered = items.filter(item => {
        const attributes = item.attributes || []
        const filtersResult = Object.keys(filterAttributes).map(filterAttrSlug => {
            const filterAttrValues = filterAttributes[filterAttrSlug] || []
            const attributeInItem = attributes.find(attribute => attribute.attr.slug === filterAttrSlug)
            if (!attributeInItem) return false
            const hasAttrValues = filterAttrValues.map(filterValueSlug => {
                const hasAttrValue = attributeInItem.attrValues.findIndex(attrValue => attrValue.slug === filterValueSlug) > -1
                if (!hasAttrValue) return false
                return true
            })
            return hasAttrValues.includes(true)
        })
        return !filtersResult.includes(false)


    })
    if (filterPrice && filterPrice.length > 1) {
        const min = filterPrice[0]
        const max = filterPrice[1]
        filtered = filtered.filter(item => {
            if (item.price < min || item.price > max) return false
            return true
        })
    }


    return filtered
}


export function getFilters(items: Product[], availableFilters?: IAvailableFilters): { price: [number, number], attributes: AttributeFilters[] } {
    const attribibutesFilters: AttributeFilters[] = []
    items.map(item => {
        const attributes = item.attributes 
        attributes.map(attribute => {
            if (availableFilters && availableFilters.attributes && availableFilters.attributes.findIndex(attr => attr.slug === attribute.attr.slug) < 0) return
            const idxInFilters = attribibutesFilters.findIndex(attrFilter => attrFilter.attr.slug === attribute.attr.slug)
            if (idxInFilters < 0) {
                const attrValues = attribute.attrValues || []
                const attributeFiltersValues = attrValues.map(attrValue => {
                    const attFilterValue: AttributeFiltersValue = Object.assign( attrValue, {cnt: 1})
                    return attFilterValue
                })
                attribibutesFilters.push({
                    attr: attribute.attr,
                    attrValues: attributeFiltersValues
                })
            } else {
                const attributeInFilters = attribibutesFilters[idxInFilters]
                attribute.attrValues.map(attrValue => {
                    const inFilterValueIdx = attributeInFilters.attrValues.findIndex(attrValueInFilter => attrValueInFilter.slug === attrValue.slug)
                    if (inFilterValueIdx < 0) {
                        const attrFilterValue: AttributeFiltersValue = Object.assign(attrValue, {cnt: 1})
                        attribibutesFilters[idxInFilters].attrValues.push(attrFilterValue)
                    } else {
                        attribibutesFilters[idxInFilters].attrValues[inFilterValueIdx].cnt += 1
                    }
                })
            }
        })

    })

    const prices = items.map(item => item.price).filter(price => price >= 0 && price)
    let price: [number, number] = [Math.min(...prices), Math.max(...prices)]
    if(availableFilters && !availableFilters.price) price = [null, null]
    return {
        price,
        attributes: attribibutesFilters
    }
}