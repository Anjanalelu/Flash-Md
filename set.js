const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEJtVElNUlF6ZmdZM3YybFAzT0c4MXdKNWE2d2pYWmo5a0YyOWpuUHBXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTY0LzNuakRnNXlPaFV6TzRGUlo1MDgzVmNoSUxXbUlGRmt4RTVFUnFDcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTjc4ZmNndTBZK012dDNZRHRzalloWVRXTFhnTjY3alRnNmQ5aVlMK1hRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHR3U5Y2QycCszOHMvVml6UnRMU3ptYVBTbnYrSHZ0UENuL0dyUjdLRWlBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFCZnlaMW1aUHRDTzZOdXFmSE1GODBBMU9HL1FtOEVHVkcwWU1OSmRXMlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpKWTA4Rkd4TkVLcEoyZjZhcU1hcVErdlhJYVpXbTFhdFljeVkwMStyQlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFAxSnFBSFNyaVVqUzlaNk53VEc5eEtWWjk3ZnVHcWV2MlFnc0xQTWpXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzNibnlDNFBtcUtjaFlyVWxpaEs4OFNMWTlURUk2UTByVWw1N0NHTDUyTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklFY1YvV3FHbEVTU0VQLzIyTEQ0WDFTSHNtdkxzNmRCOGd6dXBNTkptTHZmcWxkVkpKZ09SQ0tIdVlJbk1iVDFsbFcvdFBQWHg1L0NTbnlkaUJFWGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDYsImFkdlNlY3JldEtleSI6IkVhWGJQNXFRS0R4UUVURkhOeGNIUGlDaEdrd25tVnIvWW9DSHhHM09SK2c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InhIRlUyUGtqUXd5MjRHNW9KSkd0Y0EiLCJwaG9uZUlkIjoiNjhmMDY4MzYtODhlMS00MjE0LTliYzUtMGFkNGMwN2ZlMDIzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhnMkVjUVNaa0RPdWR3K1d0eUhDTU5wM1VnWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDLzFqcjBWMkh5c0RYRlUwRTRsSkJOcGZsUlk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTURNMTJEQlIiLCJtZSI6eyJpZCI6Ijk0NzYwMTA1MjU2OjIyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdl57wnZec8J2XofCdl5ot8J2XlPCdl6HwnZed8J2XlPCdl6HwnZeUIDrwnZeV8J2XlfCdl5vXgCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0NlM1pvREVQekZvTFFHR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTG4xcmo5blRIeGI5aTU0M2NBeThmZkhVS0xUdzJ2NVB4NnBNWjJxd3hRND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVU5FL1Vjd2xyTnhwYmFJM3ZGeEhjbkVqejdPcDJFaE1qeXpCQmFJcG1mS1BZRmdzMUtkS0Zud0QzckdNNTZIVTRUNE91TFRLYkhDdk9XeU1WOTRQREE9PSIsImRldmljZVNpZ25hdHVyZSI6InI1OFljWEVjbG1wTGNFQlZjT2MwUGlFd2RNSXV4czZHQXF3WGQydzJuM1hPaEtJaHIweExnTFJyVjVGVXl6N2NzWDl5ZFlWUjkxNHg3aEtMMTVjRmdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NjAxMDUyNTY6MjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUzU5YTQvWjB4OFcvWXVlTjNBTXZIM3gxQ2kwOE5yK1Q4ZXFUR2Rxc01VTyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDE5Nzg5NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBUkkifQ==;;;=>',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "𝑲𝑰𝑵𝑮 𝑨𝑵𝑱𝑨𝑵𝑨 𝑴𝑫 ",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "94760105256", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'no',
    BOT : process.env.BOT_NAME || '🍂🖤𝗞𝗜𝗡𝗚 𝗔𝗡𝗝𝗔𝗡𝗔 𝗕𝗕𝗛 💦🥵🍂',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/58a3d3b5b94f42bb357d3.jpg',
    MODE: process.env.BOT_MODE || "publice",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,anjanalelum 
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,HRKU-d24ea4fd-1814-4133-b6e4-de028983cbf6
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
