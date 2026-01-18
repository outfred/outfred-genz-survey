import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;
const sql = neon(process.env.DATABASE_URL);
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, 'dist')));
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// POST /api/responses - Save survey response
app.post('/api/responses', async (req, res) => {
    try {
        const { name, phone, answers } = req.body;

        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({ error: 'Invalid answers format' });
        }

        await sql`
      INSERT INTO survey_responses (name, phone, answers, timestamp)
      VALUES (${name || null}, ${phone || null}, ${JSON.stringify(answers)}, NOW())
    `;

        res.json({ success: true, message: 'Response saved successfully' });
    } catch (error) {
        console.error('Save response error:', error);
        res.status(500).json({ error: 'Failed to save response' });
    }
});

// GET /api/responses - Get all survey responses (requires admin auth)
app.get('/api/responses', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const responses = await sql`
      SELECT id, name, phone, timestamp, answers::text as answers
      FROM survey_responses
      ORDER BY timestamp DESC
    `;

        const formattedResponses = responses.map(r => ({
            ...r,
            answers: JSON.parse(r.answers)
        }));

        res.json(formattedResponses);
    } catch (error) {
        console.error('Get responses error:', error);
        res.status(500).json({ error: 'Failed to fetch responses' });
    }
});

// DELETE /api/responses - Delete all responses (requires admin auth)
app.delete('/api/responses', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        await sql`DELETE FROM survey_responses`;
        res.json({ success: true, message: 'All responses deleted' });
    } catch (error) {
        console.error('Delete responses error:', error);
        res.status(500).json({ error: 'Failed to delete responses' });
    }
});

// POST /api/login - Admin login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const admins = await sql`
      SELECT id, username, password_hash
      FROM admins
      WHERE username = ${username}
      LIMIT 1
    `;

        if (admins.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = admins[0];
        const isValidPassword = await bcrypt.compare(password, admin.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, username: admin.username });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/*`);
});

// Catch-all route - serve index.html for frontend routing (must be last)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, 'dist', 'index.html'));
    });
}
