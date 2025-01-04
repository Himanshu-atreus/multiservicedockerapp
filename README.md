Multi-Service Blog Platform
A multi-service blog platform built with Node.js, PostgreSQL, and Docker, designed for scalability and cloud deployment.

Table of Contents
Overview
Features
Folder Structure
Tech Stack
Getting Started
Prerequisites
Local Deployment
AWS Deployment
API Endpoints
Database Schema
Troubleshooting
License
Overview
This project is a modular and scalable blog platform comprising the following services:

User Service: User registration, authentication, and profile management with JWT-based authentication.
Blog Service: CRUD operations for blog posts with pagination support.
Comment Service: Manage comments associated with blog posts.
Each service is containerized with Docker, and services communicate over Docker networks.

Features
Authentication: Secure JWT-based authentication.
Modularity: Each service is independent and encapsulated.
Database: PostgreSQL with schema separation for data integrity.
Dockerized: Containerized services for easy deployment.
Scalability: Services are designed to scale horizontally.

Folder Structure
plaintext
Copy code
project/
├── docker-compose.yml       # Orchestrates all services
├── user-service/            # User Service codebase
│   ├── Dockerfile
│   ├── app.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
├── blog-service/            # Blog Service codebase
│   ├── Dockerfile
│   ├── app.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
├── comment-service/         # Comment Service codebase
│   ├── Dockerfile
│   ├── app.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
└── postgres/                # PostgreSQL database initialization
    ├── init.sql
    └── Dockerfile

Tech Stack
Backend: Node.js (Express)
Database: PostgreSQL
Containerization: Docker, Docker Compose
Deployment: AWS (EC2, RDS)
Getting Started
Prerequisites
Docker and Docker Compose installed.
PostgreSQL client (optional, for database verification).
Local Deployment
Clone the repository:

bash
Copy code
git clone <repository-url>
cd project
Set up environment variables: Add .env files in user-service, blog-service, and comment-service directories with the following:

env
Copy code
DATABASE_URL=postgres://postgres:postgres@postgres:5432/mydb
JWT_SECRET=your_jwt_secret
Start services: Run the following command to start all services:

bash
Copy code
docker-compose up --build
Access services:

User Service: http://localhost:3001
Blog Service: http://localhost:3002
Comment Service: http://localhost:3003
AWS Deployment
Launch an EC2 instance:

Use an Amazon Linux or Ubuntu AMI.
Install Docker and Docker Compose:
bash
sudo yum update -y
sudo yum install docker
sudo systemctl start docker
sudo systemctl enable docker
curl -L "https://github.com/docker/compose/releases/download/2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

Clone and set up the project:

bash
Copy code
git clone <repository-url>
cd project
Update environment variables: Replace DATABASE_URL in .env files with your AWS RDS PostgreSQL connection string.

Run services:

bash
Copy code
docker-compose up --build -d
Access the application: Open http://<EC2_PUBLIC_IP>:<PORT> in your browser.

API Endpoints
User Service
POST /register - Register a new user.
POST /login - Authenticate a user.
GET /users/:id - Get user details.


Blog Service
POST /blogs - Create a new blog post.
GET /blogs - List all blog posts.
GET /blogs/:id - Fetch a specific blog post.


Comment Service
POST /comments - Add a comment to a blog post.
GET /comments?post_id=<id> - List comments for a specific blog post.


Database Schema

Users
Field	Type	Constraints
id	SERIAL	Primary Key
name	VARCHAR(100)	Not Null
username	VARCHAR(100)	Unique, Not Null
password	VARCHAR(255)	Not Null

Blogs
Field	Type	Constraints
id	SERIAL	Primary Key
title	VARCHAR(255)	Not Null
description	TEXT	Not Null
username	VARCHAR(100)	Foreign Key


Comments
Field	Type	Constraints
id	SERIAL	Primary Key
description	TEXT	Not Null
username	VARCHAR(100)	Foreign Key


Troubleshooting
Docker issues:
Ensure Docker is running and you have sufficient permissions.
Database connection errors:
Check the DATABASE_URL in .env.

AWS issues:
Verify EC2 security groups allow traffic on required ports (3001-3003).
