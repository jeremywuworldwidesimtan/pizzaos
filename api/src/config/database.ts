import { DataSource } from "typeorm";
import { Customer } from "../entities/Customer";
import { Order } from "../entities/Order";
import * as dotenv from "dotenv";

dotenv.config({path: "../.env"});

// configure postgres connection with type orm
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Customer, Order],
  migrations: [],
  subscribers: [],
});