// Setup Database Script
// Run: node setup-db.js

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL not found in .env.local');
  console.error('Please add your Neon database URL to .env.local');
  process.exit(1);
}

console.log('🚀 Starting database setup...\n');

const sql = neon(DATABASE_URL);

async function setupDatabase() {
  try {
    console.log('📝 Reading schema.sql...');
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    
    console.log('🗄️  Executing schema...');
    
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`   ⏳ Executing: ${statement.substring(0, 50)}...`);
        await sql(statement);
      }
    }

    console.log('\n✅ Database setup completed successfully!\n');
    console.log('📊 Created tables:');
    console.log('   - admins (for authentication)');
    console.log('   - survey_responses (for storing survey data)');
    console.log('\n🔐 Default admin credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the default password after first login!');
    console.log('\n🎉 You can now run: npm run dev');

  } catch (error) {
    console.error('\n❌ Error setting up database:');
    console.error(error);
    console.error('\nTroubleshooting:');
    console.error('1. Check your DATABASE_URL in .env.local');
    console.error('2. Make sure your Neon project is active');
    console.error('3. Verify network connection');
    process.exit(1);
  }
}

setupDatabase();
