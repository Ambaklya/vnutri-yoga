module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn', // Изменяем с 'error' на 'warn'
    'no-unused-vars': 'warn', // Изменяем с 'error' на 'warn'
    'prefer-const': 'warn',
    'no-console': 'warn'
  }
};
