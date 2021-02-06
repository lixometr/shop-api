
export interface EntityBaseMetadata {
    groups: Array<string>
}
// export interface EntityBase {
//     serialize(metadata: EntityBaseMetadata, payload: RequestPayload): Promise<this>
// }
export class EntityBase {
    
    async serialize(metadata: EntityBaseMetadata, payload: any): Promise<this> {
        return this
    }

}

