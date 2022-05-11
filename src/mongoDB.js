import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();
const db = null;

const mongoClient = new MongoClient();

try {
    await mongoClient.connect();
    db = mongoClient.db();
    console.log(chalk.green("MongoDB connected"));
} catch (error) {
    console.log(chalk.red('Error connecting to MongoDB', error));
}

export default db;