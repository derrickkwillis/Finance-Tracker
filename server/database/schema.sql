CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE balance (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    month_year DATE UNIQUE NOT NULL,
    balance DECIMAL(10,2) NOT NULL DEFAULT 0
);

CREATE TABLE savings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    goal_name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(10,2),
    percentage DECIMAL(5,2) NOT NULL,
    interval VARCHAR(20) CHECK (interval IN ('weekly', 'monthly', 'yearly')),
    last_saved TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
