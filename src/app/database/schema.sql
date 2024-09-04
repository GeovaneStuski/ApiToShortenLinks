CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
);

CREATE TABLE shortened_links(
  id VARCHAR(6) PRIMARY KEY,
  original_url VARCHAR NOT NULL,
  updated VARCHAR,
  deleted VARCHAR DEFAULT NULL,
  access INT DEFAULT 0,
  user_id UUID,
  FOREIGN KEY(user_id) REFERENCES users(id)
)