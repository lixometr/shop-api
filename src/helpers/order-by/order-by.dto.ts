export class OrderByDto {
    // fields to orderBy
    orderBy: Array<string>
    // values of fields to order 
    order: Array<'ASC' | 'DESC'>
}