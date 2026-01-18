import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sql from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_at: Date;
}

export async function loginAdmin(username: string, password: string): Promise<string | null> {
  try {
    const users = await sql`
      SELECT * FROM admins WHERE username = ${username} LIMIT 1
    `;

    if (users.length === 0) {
      return null;
    }

    const user = users[0] as AdminUser;
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return null;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return token;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function createAdmin(username: string, password: string): Promise<boolean> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await sql`
      INSERT INTO admins (username, password_hash)
      VALUES (${username}, ${hashedPassword})
    `;

    return true;
  } catch (error) {
    console.error('Create admin error:', error);
    return false;
  }
}
