const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { Sequelize } = require('sequelize');

const USE_SQLITE = process.env.USE_SQLITE === '1';

// ---------- SQLite (optional for local dev) ----------
if (USE_SQLITE) {
  const filePath = process.env.SQLITE_PATH || path.join(__dirname, '..', 'dev.sqlite3');
  console.log('[db] Using SQLite at', filePath);
  module.exports = new Sequelize({ dialect: 'sqlite', storage: filePath, logging: false });
  return;
}

// ---------- Postgres (Aiven/default) ----------
const {
  PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD,
  PGSSLMODE = 'require',
  PGSSLROOTCERT
} = process.env;

const sslmode = (PGSSLMODE || 'require').toLowerCase();

let dialectOptions;

// If sslmode=require, try strict CA first; if missing, fall back to lax (dev-only) so we can still sync.
if (sslmode === 'require') {
  const caPath = PGSSLROOTCERT ? path.resolve(process.cwd(), PGSSLROOTCERT) : null;
  if (caPath && fs.existsSync(caPath)) {
    console.log('[db] Using Postgres with SSL (Aiven CA)');
    dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(caPath).toString(),
      },
    };
  } else {
    console.warn('[db] PGSSLMODE=require but PGSSLROOTCERT not found. Falling back to SSL with rejectUnauthorized:false (DEV ONLY).');
    dialectOptions = { ssl: { require: true, rejectUnauthorized: false } };
  }
} else if (sslmode === 'disable') {
  console.warn('[db] Using Postgres WITHOUT SSL (not recommended for Aiven).');
  dialectOptions = undefined;
} else {
  console.log(`[db] Using Postgres with sslmode=${sslmode} (no explicit SSL options)`);
  dialectOptions = undefined;
}

const sequelize = new Sequelize(
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  {
    host: PGHOST,
    port: Number(PGPORT || 5432),
    dialect: 'postgres',
    logging: false,
    dialectOptions,
    // Uncomment if you use a non-default schema:
    // schema: process.env.PGSCHEMA || 'public',
  }
);

module.exports = sequelize;
