import config from "./default"
import development from "./development"
import production from "./production"
import * as _ from "lodash"

class AppConfigClass {
    private config: object;
    constructor(config) {
        this.config = config
        this.init()
    }
    get<T>(path: string): T {
        const some = _.get(this.config, path)
        return some
    }
    init() {
        if (process.env.NODE_ENV === 'development') {
            this.config = _.merge(this.config, development)

        } else if (process.env.NODE_ENV === 'production') {
            this.config = _.merge(this.config, production)

        }
    }
}

export const AppConfig = new AppConfigClass(config) 