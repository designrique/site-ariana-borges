import React from 'react';

const DNABasicoSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-900 mb-6">
          DNA Básico - Versão Simplificada
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Esta é uma versão simplificada para testar se o componente carrega.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Teste de Carregamento
          </h2>
          <p className="text-gray-600">
            Se esta página carregar, significa que o problema está no componente original.
          </p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800">
              ✅ Componente React funcionando corretamente!
            </p>
          </div>
        </div>
        <div className="mt-8">
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Voltar para Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default DNABasicoSimple;