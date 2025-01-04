Multi-Service Blog Platform
Overview
This is a multi-service blog platform with three distinct microservices:

User Service: Handles user authentication and profile management.
Blog Service: Manages blog posts.
Comment Service: Handles comments for blog posts.
The application uses Node.js, PostgreSQL, Docker, and Docker Compose for containerization. AWS deployment options include EC2 instances with Docker for orchestration.

Features
User Service:
Register, login, and manage user profiles with JWT authentication.
Blog Service:
Create, read, update, and delete blog posts.
Comment Service:
Add, retrieve, and delete comments for blog posts.
PostgreSQL: Centralized database with schema separation for each service.
Prerequisites
Docker and Docker Compose installed on your system.
Node.js and npm (for local development).
AWS EC2 Instance (for AWS deployment).
Folder Structure
sql
Copy code
project/
├── docker-compose.yml
├── user-service/
├── blog-service/
├── comment-service/
└── postgres/
Local Deployment
Steps
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd project
Set Environment Variables: Create .env files in user-service, blog-service, and comment-service directories with the following:

env
Copy code
DATABASE_URL=postgres://postgres:postgres@postgres:5432/mydb
JWT_SECRET=your_jwt_secret
Run Docker Compose: Start all services and PostgreSQL with:

bash
Copy code
docker-compose up --build
Access Services:

User Service: http://localhost:3001
Blog Service: http://localhost:3002
Comment Service: http://localhost:3003
Verify Database: Use a PostgreSQL client to connect to the database:

bash
Copy code
Host: localhost
Port: 5432
User: postgres
Password: postgres
Database: mydb
AWS Deployment
Steps
Set Up EC2 Instance:

Launch an EC2 instance with the latest Amazon Linux or Ubuntu AMI.
Install Docker and Docker Compose:
bash
Copy code
sudo yum update -y
sudo yum install docker
sudo systemctl start docker
sudo systemctl enable docker
sudo curl -L "https://github.com/docker/compose/releases/download/2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd project
Set Environment Variables: Update .env files in each service directory with production values. Use your RDS PostgreSQL instance for DATABASE_URL.

Run Docker Compose: Start the application:

bash
Copy code
docker-compose up --build -d
Expose Services: Configure security groups in AWS to allow HTTP traffic for ports 3001-3003.

Access Services: Replace <EC2_PUBLIC_IP> with your EC2 instance's public IP:

User Service: http://<EC2_PUBLIC_IP>:3001
Blog Service: http://<EC2_PUBLIC_IP>:3002
Comment Service: http://<EC2_PUBLIC_IP>:3003
API Endpoints
User Service (/api/users)
POST /register: Register a new user.
POST /login: Authenticate a user.
Blog Service (/api/blogs)
POST /: Create a new blog post.
GET /: List all blog posts.
GET /:id: Fetch a specific blog post.
PUT /:id: Update a blog post.
DELETE /:id: Delete a blog post.
Comment Service (/api/comments)
POST /: Add a comment to a blog post.
GET /?post_id=<id>: List comments for a specific blog post.
DELETE /:id: Delete a comment.
Database Schema
User Table
Column	Type	Constraints
id	SERIAL	PRIMARY KEY
name	VARCHAR(100)	
username	VARCHAR(100)	UNIQUE, NOT NULL
password	VARCHAR(100)	NOT NULL
Blog Table
Column	Type	Constraints
id	SERIAL	PRIMARY KEY
title	VARCHAR(100)	
description	TEXT	
username	VARCHAR(100)	FOREIGN KEY (User)
Comment Table
Column	Type	Constraints
id	SERIAL	PRIMARY KEY
description	TEXT	
username	VARCHAR(100)	FOREIGN KEY (User)
Notes
For Local Development: Ensure Docker is running and .env files are configured correctly.
For AWS Deployment: Use HTTPS for secure access and configure a domain with SSL certificates if required.
Troubleshooting
Docker Compose Not Starting:

Ensure Docker and Docker Compose are installed properly.
Verify .env variables are correct.
Database Connection Issues:

Confirm PostgreSQL container is running.
Verify DATABASE_URL in .env points to the correct host and port.
AWS Deployment Issues:

Check EC2 security groups for open ports (3001-3003).
Validate that docker-compose up runs without errors.
