# 1) Build 단계
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
ARG VITE_AI_API_URL
ENV VITE_AI_API_URL=${VITE_AI_API_URL}
ARG VITE_CLOUDFRONT_URL
ENV VITE_CLOUDFRONT_URL=${VITE_CLOUDFRONT_URL}
RUN npm run build

# 2) Runtime 단계 (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx/nginx-prod.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
