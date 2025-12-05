# Docker Deployment Guide

This guide explains how to build and run your Next.js application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, but recommended).

## Configuration

1. **Environment Variables**:
   Ensure you have a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL="postgresql://..."
   AUTH_SECRET="your-auth-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   NEXTAUTH_URL="http://localhost:3000" # Or your production URL
   ```

2. **Standalone Output**:
   We have already enabled `output: 'standalone'` in `next.config.ts`. This is required for the Docker image to work correctly.

## Option 1: Using Docker Compose (Recommended)

This is the easiest way to run the application locally or on a server.

1. **Build and Run**:

   ```bash
   docker-compose up --build -d
   ```

   The `-d` flag runs the container in detached mode (in the background).

2. **View Logs**:

   ```bash
   docker-compose logs -f
   ```

3. **Stop the Application**:
   ```bash
   docker-compose down
   ```

## Option 2: Building Manually

If you prefer to build the image manually without Docker Compose:

1. **Build the Image**:

   ```bash
   docker build -t ecommerce-app .
   ```

2. **Run the Container**:
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your-database-url" \
     -e AUTH_SECRET="your-auth-secret" \
     ecommerce-app
   ```
   _Note: You need to pass all required environment variables using the `-e` flag._

## Deploying to Production

To deploy to a cloud provider (like AWS, DigitalOcean, or Azure):

1. **Push to Docker Hub (or any registry)**:

   ```bash
   # Login to Docker Hub
   docker login

   # Tag your image
   docker tag ecommerce-app your-username/ecommerce-app:latest

   # Push the image
   docker push your-username/ecommerce-app:latest
   ```

2. **Pull and Run on Server**:
   SSH into your server and run:
   ```bash
   docker pull your-username/ecommerce-app:latest
   docker run -d -p 80:3000 --env-file .env your-username/ecommerce-app:latest
   ```

## Troubleshooting

- **Database Connection**: If running the database in another container, ensure they are on the same network. If using a hosted database (like Supabase/Neon), ensure the `DATABASE_URL` is correct and accessible from the container.
- **Prisma Client**: The `Dockerfile` includes a build step that runs `prisma generate`. This ensures the Prisma client is compatible with the container's OS (Alpine Linux).
