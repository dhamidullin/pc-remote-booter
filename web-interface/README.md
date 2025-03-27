# NetControl Web Interface

The web interface component of NetControl, built with Next.js. This provides a user-friendly interface for remotely controlling your PC's power state.

## Features
- Simple and intuitive web interface for remote PC control
- Real-time status monitoring of the target PC
- Environment-based configuration for flexible setup

## Getting Started

### Prerequisites
- Node.js (for local development)
- Docker and Docker Compose (for containerized deployment)

### Local Development
For local development without Docker:
```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Docker Deployment
The web interface is deployed using Docker. The container exposes port 9064.

To build and start the service:
```sh
docker compose up -d --build
```

To stop the service:
```sh
docker compose down
```

### Service URLs
- **Frontend:** [http://localhost:9064](http://localhost:9064)

## Debugging
- Check container status: `docker compose ps`
- View logs: `docker compose logs -f frontend`
- Access container shell: `docker exec -it <container_id> sh`

## Environment Setup
The web interface uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:
- `JWT_SECRET`: Secret key for JWT token generation
- `ADMIN_PASSWORD`: Password for admin authentication
- `DOCKER_COMPOSE_NEXT_PUBLIC_BASE_URL`: Base URL for the frontend service
- `ESP32_BOOTER_BASE_URL`: URL for the ESP32 booter service
- `TARGET_PC_PING_URL`: URL for target PC ping service

## Technologies Used
- Next.js
- TypeScript
- JWT access token + refresh token authentication
- Environment-based Configuration 