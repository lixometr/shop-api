require('dotenv').config()

import jwt from "./modules/jwt";
import user from "./modules/user";
import staticConf from "./modules/static";
import db from "./modules/db"
import domain from "./modules/domain"
import upload from "./modules/upload"
import order from "./modules/order"

export default {
    NODE_ENV: process.env.NODE_ENV,
    perPage: 10,
    static: staticConf,
    jwt,
    user,
    db,
    domain,
    upload,
    order
}
