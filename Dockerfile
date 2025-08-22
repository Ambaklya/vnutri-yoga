# Multi-stage build для оптимизации размера образа
FROM node:18-alpine AS base

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package*.json ./
COPY client/package*.json ./client/

# Установка зависимостей
RUN npm ci --only=production && npm cache clean --force
RUN cd client && npm ci --only=production && npm cache clean --force

# Этап сборки клиента
FROM node:18-alpine AS client-builder

WORKDIR /app

# Копирование файлов клиента
COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# Финальный этап
FROM node:18-alpine AS production

# Создание пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Копирование зависимостей
COPY --from=base --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=base --chown=nextjs:nodejs /app/package*.json ./

# Копирование собранного клиента
COPY --from=client-builder --chown=nextjs:nodejs /app/build ./client/build

# Копирование серверного кода
COPY --chown=nextjs:nodejs server/ ./server/

# Создание директории для логов
RUN mkdir -p logs && chown nextjs:nodejs logs

# Переключение на пользователя nextjs
USER nextjs

# Открытие порта
EXPOSE 3001

# Проверка здоровья
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Запуск приложения
CMD ["node", "server/index.js"]
