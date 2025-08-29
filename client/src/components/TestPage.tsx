import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">🧘‍♀️ Тест</h1>
        <p className="text-xl mb-8">Если вы видите эту страницу, роутинг работает!</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
          <h2 className="text-2xl font-bold mb-4">Статус системы</h2>
          <div className="space-y-2 text-left">
            <p>✅ React загружен</p>
            <p>✅ Роутинг работает</p>
            <p>✅ Стили применяются</p>
            <p>✅ Компоненты рендерятся</p>
          </div>
        </div>
        <div className="mt-8">
          <a 
            href="/" 
            className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30"
          >
            Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
