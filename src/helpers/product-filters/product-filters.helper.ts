import { Attribute } from "src/internal"
import { ProductAttribute } from "src/internal"
import { ProductFilters } from "./product-filters.entity"
import { Product } from "src/internal"

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

export function getFilters(items: Product[], availableFilters?: Attribute[]): { price: [number, number], attributes: ProductAttribute[] } {
    const attribibutesFilters = []
    items.map(item => {
        const attributes = item.attributes || []
        attributes.map(attribute => {
            if (availableFilters && availableFilters.findIndex(attr => attr.slug === attribute.attr.slug) < 0) return
            const idxInFilters = attribibutesFilters.findIndex(attrFilter => attrFilter.attr.slug === attribute.attr.slug)
            if (idxInFilters < 0) {
                attribibutesFilters.push({
                    attr: attribute.attr,
                    attrValues: attribute.attrValues || []
                })
            } else {
                const attributeInFilters = attribibutesFilters[idxInFilters]
                attribute.attrValues.map(attrValue => {
                    const inFilterValue = attributeInFilters.attrValues.findIndex(attrValueInFilter => attrValueInFilter.slug === attrValue.slug)
                    if (inFilterValue < 0) {
                        attribibutesFilters[idxInFilters].attrValues.push(attrValue)
                    }
                })
            }
        })

    })

    const prices = items.map(item => item.price).filter(price => price >= 0 && price)
    const price: [number, number] = [Math.min(...prices), Math.max(...prices)]
    return {
        price,
        attributes: attribibutesFilters
    }
}