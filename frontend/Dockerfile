FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_API_BASE_URL
ARG VITE_SOCKET_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_SOCKET_BASE_URL=$VITE_SOCKET_BASE_URL
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3001"]