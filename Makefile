.PHONY: help install dev build start clean test lint

# Default target
help:
	@echo "Йога Студия - Веб-приложение"
	@echo "================================"
	@echo ""
	@echo "Доступные команды:"
	@echo "  install    - Установка всех зависимостей"
	@echo "  dev        - Запуск в режиме разработки"
	@echo "  build      - Сборка для продакшена"
	@echo "  start      - Запуск продакшен сервера"
	@echo "  clean      - Очистка временных файлов"
	@echo "  test       - Запуск тестов"
	@echo "  lint       - Проверка кода"
	@echo "  docker     - Сборка Docker образа"
	@echo "  deploy     - Развертывание на Heroku"
	@echo ""

# Установка зависимостей
install:
	@echo "📦 Установка зависимостей..."
	npm run install:all
	@echo "✅ Зависимости установлены!"

# Запуск в режиме разработки
dev:
	@echo "🚀 Запуск в режиме разработки..."
	npm run dev

# Сборка для продакшена
build:
	@echo "🔨 Сборка для продакшена..."
	npm run build
	@echo "✅ Сборка завершена!"

# Запуск продакшен сервера
start:
	@echo "🚀 Запуск продакшен сервера..."
	npm start

# Очистка временных файлов
clean:
	@echo "🧹 Очистка временных файлов..."
	rm -rf client/build
	rm -rf client/node_modules
	rm -rf node_modules
	rm -rf .next
	rm -rf dist
	@echo "✅ Очистка завершена!"

# Запуск тестов
test:
	@echo "🧪 Запуск тестов..."
	cd client && npm test
	@echo "✅ Тесты завершены!"

# Проверка кода
lint:
	@echo "🔍 Проверка кода..."
	cd client && npm run lint
	@echo "✅ Проверка кода завершена!"

# Docker
docker:
	@echo "🐳 Сборка Docker образа..."
	docker build -t yoga-studio-web .
	@echo "✅ Docker образ собран!"

# Запуск Docker контейнера
docker-run:
	@echo "🐳 Запуск Docker контейнера..."
	docker run -p 3001:3001 yoga-studio-web

# Развертывание на Heroku
deploy:
	@echo "🚀 Развертывание на Heroku..."
	git push heroku main
	@echo "✅ Развертывание завершено!"

# Создание .env файла
env:
	@echo "📝 Создание .env файла..."
	@if [ ! -f .env ]; then \
		echo "PORT=3001" > .env; \
		echo "NODE_ENV=development" >> .env; \
		echo "JWT_SECRET=your-secret-key-$(shell openssl rand -hex 32)" >> .env; \
		echo "✅ .env файл создан!"; \
	else \
		echo "⚠️  .env файл уже существует"; \
	fi

# Проверка здоровья приложения
health:
	@echo "🏥 Проверка здоровья приложения..."
	@curl -s http://localhost:3001/health | jq . || echo "❌ Сервер не запущен"

# Логи сервера
logs:
	@echo "📋 Логи сервера..."
	@tail -f logs/app.log 2>/dev/null || echo "⚠️  Файл логов не найден"

# Создание базы данных (для будущего использования)
db-setup:
	@echo "🗄️  Настройка базы данных..."
	@echo "⚠️  Функция в разработке"

# Миграции базы данных
db-migrate:
	@echo "🔄 Миграции базы данных..."
	@echo "⚠️  Функция в разработке"

# Сброс базы данных
db-reset:
	@echo "🔄 Сброс базы данных..."
	@echo "⚠️  Функция в разработке"

# Создание пользователя администратора
admin-create:
	@echo "👑 Создание пользователя администратора..."
	@echo "⚠️  Функция в разработке"

# Резервное копирование
backup:
	@echo "💾 Создание резервной копии..."
	@echo "⚠️  Функция в разработке"

# Восстановление из резервной копии
restore:
	@echo "📥 Восстановление из резервной копии..."
	@echo "⚠️  Функция в разработке"

# Мониторинг системы
monitor:
	@echo "📊 Мониторинг системы..."
	@echo "CPU: $(shell top -l 1 | grep "CPU usage" | awk '{print $3}')"
	@echo "Memory: $(shell top -l 1 | grep "PhysMem" | awk '{print $2}')"
	@echo "Disk: $(shell df -h / | awk 'NR==2{print $5}')"

# Обновление зависимостей
update:
	@echo "🔄 Обновление зависимостей..."
	npm update
	cd client && npm update
	@echo "✅ Зависимости обновлены!"

# Аудит безопасности
audit:
	@echo "🔒 Аудит безопасности..."
	npm audit
	cd client && npm audit
	@echo "✅ Аудит завершен!"

# Генерация документации
docs:
	@echo "📚 Генерация документации..."
	@echo "⚠️  Функция в разработке"

# Создание релиза
release:
	@echo "🏷️  Создание релиза..."
	@echo "Введите версию (например, 1.0.0):"
	@read version; \
	npm version $$version; \
	git add .; \
	git commit -m "Release $$version"; \
	git tag $$version; \
	git push origin main --tags; \
	echo "✅ Релиз $$version создан!"

# Помощь по командам
commands:
	@echo "📖 Список всех доступных команд:"
	@make help
