
require('dotenv').config();

module.exports ={

  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT,
    "JWT_SECRET": process.env.JWT_SECRET,
    "JWT_EXPIRES": process.env.JWT_EXPIRES,
    "JWT_COOKIE_EXPIRES_IN": process.env.JWT_COOKIE_EXPIRES_IN,
    "BCRYPT_STRING": process.env.BCRYPT_STRING,
    "REDIS_URL": process.env.REDIS_URL,
    "AI_KEY": process.env.AI_KEY,
    "AI_ORG": process.env.AI_ORG,
    "AI_UUID": process.env.AI_UUID,
    "app_port": process.env.PORT
      },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306,
    "JWT_SECRET": "test",
    "JWT_EXPIRES": "10m",
    "JWT_COOKIE_EXPIRES_IN": "10m",
    "BCRYPT_STRING": "test",
    "REDIS_URL": "redis://127.0.0.1:6379",
    "AI_KEY": process.env.AI_KEY,
    "AI_ORG": process.env.AI_ORG,
    "AI_UUID": process.env.AI_UUID,
    "app_port": 3000
      },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": process.env.PORT,
    "JWT_SECRET": process.env.JWT_SECRET,
    "JWT_EXPIRES": process.env.JWT_EXPIRES,
    "JWT_COOKIE_EXPIRES_IN": process.env.JWT_COOKIE_EXPIRES_IN,
    "BCRYPT_STRING": process.env.BCRYPT_STRING,
    "REDIS_URL": process.env.REDIS_URL,
    "AI_KEY": process.env.AI_KEY,
    "AI_ORG": process.env.AI_ORG,
    "AI_UUID": process.env.AI_UUID,
    "app_port": process.env.PORT
  },
}

