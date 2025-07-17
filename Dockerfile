#BUILDER
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install
RUN npx prisma generate

# Copy source code
COPY . .

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_DISABLE_ESLINT=true


#RUNNER

# Build the application
RUN npm run build

FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Only include production env
ENV NODE_ENV=production

# Copy only the essential files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# If you're using .env.production, uncomment below:
# COPY --from=builder /app/.env.production .env

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]