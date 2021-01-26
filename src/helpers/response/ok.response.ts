import { EntityBase } from "src/internal"

export class ResOk extends EntityBase{
    public ok: boolean
    constructor() {
        super()
        this.ok = true
    }
}