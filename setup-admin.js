import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function setupAdmin() {
    console.log('🔄 Setting up admin user...');

    try {
        const username = 'admin';
        const password = 'outfred2024';

        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Check if admin exists
        const existing = await sql`
      SELECT id FROM admins WHERE username = ${username}
    `;

        if (existing.length > 0) {
            // Update existing admin
            console.log('Updating existing admin user...');
            await sql`
        UPDATE admins 
        SET password_hash = ${password_hash}
        WHERE username = ${username}
      `;
            console.log('✅ Admin user updated successfully!');
        } else {
            // Create new admin
            console.log('Creating new admin user...');
            await sql`
        INSERT INTO admins (username, password_hash)
        VALUES (${username}, ${password_hash})
      `;
            console.log('✅ Admin user created successfully!');
        }

        console.log(`\n✅ Admin credentials:`);
        console.log(`   Username: ${username}`);
        console.log(`   Password: ${password}`);

    } catch (error) {
        console.error('❌ Setup failed:', error);
        process.exit(1);
    }
}

setupAdmin();
