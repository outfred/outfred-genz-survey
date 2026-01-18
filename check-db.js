import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function checkDatabase() {
    console.log('🔍 Checking database...\n');

    try {
        // Check connection
        console.log('Testing connection...');
        const time = await sql`SELECT NOW()`;
        console.log('✅ Connection successful!');
        console.log('Server time:', time[0].now);

        // Check if survey_responses table exists
        console.log('\n📋 Checking survey_responses table...');
        const tableCheck = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'survey_responses'
      ORDER BY ordinal_position
    `;

        if (tableCheck.length === 0) {
            console.log('❌ Table survey_responses does not exist!');
            return;
        }

        console.log('✅ Table exists with columns:');
        tableCheck.forEach(col => {
            console.log(`  - ${col.column_name}: ${col.data_type}`);
        });

        // Count responses
        console.log('\n📊 Counting responses...');
        const count = await sql`SELECT COUNT(*) as count FROM survey_responses`;
        console.log(`Total responses: ${count[0].count}`);

        // Get sample responses
        if (count[0].count > 0) {
            console.log('\n📝 Sample responses:');
            const samples = await sql`
        SELECT id, name, phone, timestamp 
        FROM survey_responses 
        ORDER BY timestamp DESC 
        LIMIT 5
      `;
            samples.forEach(s => {
                console.log(`  - ID: ${s.id}, Name: ${s.name || 'NULL'}, Phone: ${s.phone || 'NULL'}, Time: ${s.timestamp}`);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

checkDatabase();
