import { Redis } from "ioredis";
require("dotenv").config();

/**
 * Creates and returns a Redis client connection URL
 * @returns {string|Error} The Redis connection URL if REDIS_URL environment variable is set, otherwise throws an Error
 * @throws {Error} If REDIS_URL environment variable is not set
 */
const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log("Redis connected");
        return process.env.REDIS_URL;
    }
    throw new Error(" Redis not connected");
}
export const redis = new Redis(redisClient());