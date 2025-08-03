# CRUD Backend with Node.js, TypeScript, Fastify, and PostgreSQL

This is a backend application built with Node.js, TypeScript, Fastify, and PostgreSQL, containerized with Docker.

## Features

- **Node.js** with **TypeScript** for type safety
- **Fastify** web framework for high performance
- **PostgreSQL** database with connection pooling
- **Docker** and **Docker Compose** for easy deployment
- Health check endpoints
- Database initialization with sample data
- Hot reload for development

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)

## Quick Start with Docker

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Start the application:**
   ```bash
   docker-compose up --build
   ```

4. **Test the application:**
   - Health check: http://localhost:3000/health
   - Database test: http://localhost:3000/db-test
   - Get users: http://localhost:3000/users

## API Endpoints

### Health & Database
- `GET /health` - Application health check
- `GET /db-test` - Database connection test

### Users CRUD
- `GET /users` - Get all users
- `POST /users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

## Development

### Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start PostgreSQL with Docker:**
   ```bash
   docker-compose up postgres
   ```

3. **Run in development mode:**
   ```bash
   npm run dev
   ```

### Development with Docker

To use hot reload with Docker:

1. **Uncomment the backend-dev service in docker-compose.yml**

2. **Start development services:**
   ```bash
   docker-compose up postgres backend-dev
   ```

## Production Deployment

1. **Build and start:**
   ```bash
   docker-compose up --build -d
   ```

2. **Check logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop services:**
   ```bash
   docker-compose down
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Application port | `3000` |
| `HOST` | Application host | `0.0.0.0` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/crud_db` |

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Docker Services

- **postgres**: PostgreSQL 15 database
- **backend**: Node.js application (production)
- **backend-dev**: Node.js application (development with hot reload)

## Volumes

- `postgres_data`: Persistent PostgreSQL data
- `./logs`: Application logs (mounted to host)

## Health Checks

Both services include health checks:
- **PostgreSQL**: `pg_isready` command
- **Backend**: HTTP request to `/health` endpoint

## Troubleshooting

1. **Port conflicts**: Change ports in docker-compose.yml
2. **Database connection issues**: Check DATABASE_URL and ensure PostgreSQL is running
3. **Permission issues**: Ensure Docker has proper permissions

## Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run clean` - Clean build directory

## Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f [service_name]

# Stop all services
docker-compose down

# Remove volumes (data will be lost)
docker-compose down -v

# Rebuild specific service
docker-compose build backend
```
