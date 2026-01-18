import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function testDatabase() {
    console.log('Testing database connection...');

    try {
        // Test connection
        const result = await sql`SELECT NOW() as current_time`;
        console.log('✅ Database connection successful!');
        console.log('Current database time:', result[0].current_time);

        // Test insert
        console.log('\nInserting test survey response...');
        await sql`
      INSERT INTO survey_responses (name, phone, answers, timestamp)
      VALUES (
        'Test User',
        '0123456789',
        ${{ gender: 'male', age: '18-24', shopping: 'online' }},
        NOW()
      )
    `;
        console.log('✅ Test data inserted successfully!');

        // Test query
        console.log('\nQuerying survey responses...');
        const responses = await sql`
      SELECT id, name, phone, timestamp, answers::text as answers
      FROM survey_responses
      ORDER BY timestamp DESC
      LIMIT 5
    `;
        console.log(`✅ Found ${responses.length} responses`);

        if (responses.length > 0) {
            console.log('\nMost recent response:');
            console.log(JSON.stringify(responses[0], null, 2));
        }

        console.log('\n✅ All database tests passed!');
    } catch (error) {
        console.error('❌ Database error:', error);
        process.exit(1);
    }
}

testDatabase();
