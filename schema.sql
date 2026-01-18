-- Outfred Gen-Z Survey Database Schema
-- For Neon PostgreSQL

-- Table for admin users
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for survey responses
CREATE TABLE IF NOT EXISTS survey_responses (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answers JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_responses_timestamp ON survey_responses(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);

-- Insert default admin user (username: admin, password: admin123)
-- Password hash for 'admin123' using bcrypt
INSERT INTO admins (username, password_hash) 
VALUES ('admin', '$2a$10$xQnXg8Y8KzO6jKvZ0mH7Q.qRqP5Jx3FNvKZYzGZf5GZJ8p7Q8yZ8e')
ON CONFLICT (username) DO NOTHING;

-- Note: Change the default admin password after first login!
-- You can create new admin users using the createAdmin function in api/auth.ts
