import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

let datasource: any;

export async function initializeDataSource() {
    if (!datasource) {
        datasource = new pg.Pool({
            host: process.env.DATABASE_HOST || "localhost",
            port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
            user: process.env.DATABASE_USERNAME || "default_username",
            password: process.env.DATABASE_PASSWORD || "default_password",
            database: process.env.DATABASE_KEY || "default_database",
        })
        await datasource.initialize();
    console.log("Database connected");
    }
    return datasource;
}