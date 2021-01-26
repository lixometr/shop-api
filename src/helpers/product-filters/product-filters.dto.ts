export class ProductFiltersDto {
    public price: [number, number]
    public attributes: {
        [key: string]: Array<string>
    }
}