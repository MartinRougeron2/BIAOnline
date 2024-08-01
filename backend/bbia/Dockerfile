# Stage 1: Build the application
FROM node:21 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create a clean image for deployment
FROM node:21 AS production

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# stage 3: Generate the final image, with prisma client, create a new stage to avoid copying unnecessary files
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=production /app/dist ./dist
COPY prisma ./prisma
COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/package*.json ./

# generate prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Set the environment variables
ENV NODE_ENV=production
ENV DATABASE_URL="postgres://default:AMw9DEf0Lmby@ep-aged-bread-a29sv0q8-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require"


# Start the application
CMD ["node", "dist/main.js"]
