// SQL Connection Configuration
/*import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host:'localhost', 
  user:'root', 
  password:'password', 
  database:'eco_env',
  waitForConnections:true, 
  connectionLimit:10,
  namedPlaceholders:true
});

try {
  const conn = await pool.getConnection();
  console.log("✅ database connect successfully！");
  conn.release();
} catch (err) {
  console.error("❌ database connect failed：", err.message);
}*/
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Use /data/eco_env.sqlite on Fly (from env), else local file for dev
const defaultLocal = path.resolve(__dirname, "../db/eco_env.sqlite");
const dbPath = process.env.DB_PATH || defaultLocal;

console.log("🔗 SQLite path:", dbPath);

export const db = await open({ filename: dbPath, driver: sqlite3.Database });

// Reasonable server PRAGMAs
await db.exec("PRAGMA journal_mode = WAL;");
await db.exec("PRAGMA synchronous = NORMAL;");

// Optional: log current modes
const jm  = await db.get("PRAGMA journal_mode;");
const syn = await db.get("PRAGMA synchronous;");
console.log(`Journal mode: ${jm.journal_mode}, Synchronous: ${syn.synchronous}`);
