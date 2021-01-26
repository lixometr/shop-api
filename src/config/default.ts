import jwt from "./modules/jwt";
import user from "./modules/user";
import staticConf from "./modules/static";

require('dotenv').config()

export default {
    NODE_ENV: process.env.NODE_ENV,
    perPage: 10,
    static: staticConf,
    jwt,
    user
}
