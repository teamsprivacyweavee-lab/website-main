import 'dotenv/config'; // Load environment variables from .env file
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read SQL from the schema.sql file
const schemaPath = path.join(__dirname, 'schema.sql');
let schemaSQL = '';

try {
  schemaSQL = fs.readFileSync(schemaPath, 'utf8');
} catch (err) {
  console.error('Error reading schema.sql file:', err);
  process.exit(1);
}

// Append the new tables for the chatbot
const chatTablesSQL = `
-- Create chat conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_email TEXT,
  user_name TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_message_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  category TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  attachment_url TEXT,
  attachment_type TEXT,
  is_application_request BOOLEAN DEFAULT FALSE,
  metadata JSONB
);
`;

// Execute the SQL
async function applyMigrations() {
  console.log('Connecting to database...');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    console.log('Applying existing schema...');
    await pool.query(schemaSQL);
    
    console.log('Adding chatbot tables...');
    await pool.query(chatTablesSQL);
    
    console.log('Migrations applied successfully!');
  } catch (err) {
    console.error('Error applying migrations:', err);
  } finally {
    await pool.end();
  }
}

// Run the migrations
applyMigrations().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
