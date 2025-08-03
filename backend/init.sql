-- Initialize the database
-- This file will be executed when the database container starts

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active'
);

-- Basic connection test
SELECT 'Database initialized successfully' as status;
