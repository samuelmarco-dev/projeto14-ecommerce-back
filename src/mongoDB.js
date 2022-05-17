import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let db = null;

const mongoClient = new MongoClient(process.env.URI);

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.BANCO);
    console.log(("MongoDB connected"));
} catch (error) {
    console.log(('Error connecting to MongoDB', error));
}

export default db;