# NetControl Ping Service

A lightweight Node.js service that runs on the target PC to provide its online status to the NetControl system.

## Deployment
```sh
docker compose up -d --build
```

## Local Development
```sh
npm install
node index.js
```

The service runs on port 7199 and responds to GET requests at `/ping`.
