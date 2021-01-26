export interface IPagination<T> {
    items: Array<T>,
    info: {
        perPage: number;
        nowPage: number;
        totalItems: number;
        totalPages: number;
    }
}