import { AppConfig } from "src/config";
import { FILTER_PARAM } from "src/constants";
import { AppRequest, PaginationDto, ProductFilters, ProductFiltersDto } from "src/internal";
import { Currency, Locale } from "src/internal";

export interface RequestPayloadProps {
    request: AppRequest,
    pagination?: PaginationDto,
}

export class RequestPayload {
    public request: AppRequest
    public pagination?: PaginationDto
    public filters?: any
    constructor(payload: RequestPayloadProps) {
        Object.assign(this, payload)
        this.init()
    }
    init() {

    }
    setFilters(filters: ProductFiltersDto) {
        this.filters = filters
    }
    getFilters(): ProductFilters {
        if (this.filters) return this.filters
        const query = this.getQuery()
        let filterObj: ProductFiltersDto = {
            price: null,
            attributes: {}
        }
        const queryFilters = query[FILTER_PARAM]
        if (queryFilters) {
            try {
                filterObj = JSON.parse(queryFilters)
            } catch (err) {
                console.log(err)
            }
        }

        return new ProductFilters(filterObj)
    }
    setPagination(pagination: PaginationDto) {
        this.pagination = pagination
    }
    getPagination(): PaginationDto {
        if (this.pagination) return this.pagination
        const query = this.getQuery()
        let page = parseInt(query.page) - 1
        if (isNaN(page) || page < 0) page = 0
        let perPage = parseInt(query.perPage)
        if (isNaN(perPage)) perPage = AppConfig.get<number>('perPage')
        return {
            perPage,
            page
        }
    }
    getQuery(): { [key: string]: any } {
        return this.request.query
    }
    getSettings() {
        return this.request.settings 
    }
    getLocale(): Locale {
        const { locale } = this.getSettings()
        return locale
    }
    getCurrency(): Currency {
        const { currency } = this.getSettings()
        return currency
    }

}