import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
    console.log('🔄 Running database migration...');

    try {
        // Check if columns already exist
        console.log('Checking existing schema...');
        const tableInfo = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'survey_responses'
    `;

        const columnNames = tableInfo.map(col => col.column_name);
        console.log('Existing columns:', columnNames);

        // Add name column if it doesn't exist
        if (!columnNames.includes('name')) {
            console.log('Adding "name" column...');
            await sql`ALTER TABLE survey_responses ADD COLUMN name VARCHAR(255)`;
            console.log('✅ "name" column added successfully');
        } else {
            console.log('ℹ️  "name" column already exists');
        }

        // Add phone column if it doesn't exist
        if (!columnNames.includes('phone')) {
            console.log('Adding "phone" column...');
            await sql`ALTER TABLE survey_responses ADD COLUMN phone VARCHAR(50)`;
            console.log('✅ "phone" column added successfully');
        } else {
            console.log('ℹ️  "phone" column already exists');
        }

        // Verify the changes
        console.log('\nVerifying migration...');
        const updatedTableInfo = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'survey_responses'
      ORDER BY ordinal_position
    `;

        console.log('\n📋 Updated table schema:');
        updatedTableInfo.forEach(col => {
            console.log(`  - ${col.column_name}: ${col.data_type}`);
        });

        console.log('\n✅ Migration completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
