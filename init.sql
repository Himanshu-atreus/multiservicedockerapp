CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  username VARCHAR(100) REFERENCES users(username)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  description TEXT,
  username VARCHAR(100) REFERENCES users(username)
);
