import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();
let db = null;

const mongoClient = new MongoClient(process.env.URI);

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.BANCO);
    console.log(chalk.green("MongoDB connected"));
} catch (error) {
    console.log(chalk.red('Error connecting to MongoDB', error));
}

export default db;