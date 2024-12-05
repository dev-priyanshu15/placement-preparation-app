import {Redis} from 'ioredis';
require('dotenv').config();

/**
 * Creates and returns a Redis client connection URL
 * @returns {string|never} The Redis connection URL if successful, or throws an error if connection fails
 * @throws {Error} If Redis connection fails due to missing REDIS_URL environment variable
 */
const redisClient = () => {
    if(process.env.REDIS_URL){
        console.log(`Redis connected`);
        return process.env.REDIS_URL;
    }
    throw new Error('Redis connection failed');
};

export const redis = new Redis(redisClient());
