
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { SERVICES_CONFIG, MOCK_PROVIDERS } from './constants';
import { ServiceType, Provider } from './types';
import VoiceAssistant from './components/VoiceAssistant';
import MarketPriceAI from './components/MarketPriceAI';

// Home Screen Component
const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <section>
        <div className="relative overflow-hidden rounded-3xl bg-teal-600 text-white p-8">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">O que precisa hoje?</h2>
            <p className="text-teal-100 mb-6">Encontre os melhores profissionais de Angola.</p>
            <div className="flex bg-white rounded-xl p-1 shadow-lg">
              <input 
                type="text" 
                placeholder="Ex: Canalizador em Luanda"
                className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-l-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-teal-500 px-6 py-3 rounded-lg font-bold hover:bg-teal-400 transition">
                Pesquisar
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full -mr-20 -mt-20 opacity-50"></div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Categorias</h3>
          <button className="text-teal-600 text-sm font-semibold">Ver todas</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SERVICES_CONFIG.map((s) => (
            <button 
              key={s.type}
              onClick={() => navigate(`/explore?type=${s.type}`)}
              className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-md transition group"
            >
              <span className={`text-3xl mb-3 p-3 rounded-xl ${s.color} transition group-hover:scale-110`}>
                {s.icon}
              </span>
              <span className="text-sm font-medium text-center">{s.type}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Destaques Próximos</h3>
        </div>
        <div className="space-y-4">
          {MOCK_PROVIDERS.map((p) => (
            <div 
              key={p.id}
              onClick={() => navigate(`/provider/${p.id}`)}
              className="bg-white p-4 rounded-2xl border flex gap-4 cursor-pointer hover:shadow-md transition"
            >
              <img src={p.avatar} alt={p.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-gray-900">{p.name}</h4>
                  <span className="text-amber-500 font-bold">★ {p.rating}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{p.serviceTypes.join(' • ')}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                   📍 {p.location?.address}
                </div>
                {p.verified && (
                  <span className="mt-2 inline-block bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Verificado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Provider Detail Component
const ProviderDetail: React.FC<{ id: string }> = ({ id }) => {
  const provider = MOCK_PROVIDERS.find(p => p.id === id);
  if (!provider) return <div>Não encontrado</div>;

  return (
    <div className="space-y-6">
      <div className="relative h-48 rounded-3xl overflow-hidden">
        <img src={provider.portfolio[0]} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-end gap-4">
          <img src={provider.avatar} className="w-20 h-20 rounded-2xl border-4 border-white object-cover" alt="Avatar" />
          <div className="text-white pb-2">
            <h2 className="text-2xl font-bold">{provider.name}</h2>
            <p className="text-sm opacity-80">{provider.location?.address}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white p-3 rounded-2xl border">
          <p className="text-amber-500 font-bold text-lg">★ {provider.rating}</p>
          <p className="text-[10px] text-gray-500 uppercase">Avaliação</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border">
          <p className="text-teal-600 font-bold text-lg">{provider.reviewCount}</p>
          <p className="text-[10px] text-gray-500 uppercase">Trabalhos</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border">
          <p className="text-gray-900 font-bold text-lg">{provider.pricePerHour} Kz</p>
          <p className="text-[10px] text-gray-500 uppercase">Por Hora</p>
        </div>
      </div>

      <section>
        <h3 className="font-bold mb-2">Sobre</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{provider.bio}</p>
      </section>

      <MarketPriceAI service={provider.serviceTypes[0]} />

      <section>
        <h3 className="font-bold mb-3">Portfólio</h3>
        <div className="grid grid-cols-2 gap-2">
          {provider.portfolio.map((img, i) => (
            <img key={i} src={img} className="rounded-xl w-full h-32 object-cover border shadow-sm" alt={`Work ${i}`} />
          ))}
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 flex gap-3 max-w-4xl mx-auto z-50">
        <button className="flex-1 bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 transition">
          Pedir Orçamento
        </button>
        <button className="w-16 bg-white border border-teal-100 text-teal-600 rounded-2xl font-bold shadow-sm flex items-center justify-center text-2xl">
          💬
        </button>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/voice" element={<VoiceAssistant />} />
        <Route path="/provider/:id" element={<ProviderDetailWrapper />} />
        <Route path="/requests" element={<div className="p-8 text-center text-gray-400">Página de Pedidos em Construção</div>} />
        <Route path="/profile" element={<div className="p-8 text-center text-gray-400">Página de Perfil em Construção</div>} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Layout>
  );
};

const ProviderDetailWrapper = () => {
  const { id } = (window as any).location.hash.split('/').pop();
  const providerId = window.location.hash.split('/').pop() || '';
  return <ProviderDetail id={providerId} />;
};

const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Painel Administrativo</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-xs mb-1">Total de Prestadores</p>
          <p className="text-3xl font-bold text-teal-600">1,254</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-xs mb-1">Transações (Hoje)</p>
          <p className="text-3xl font-bold text-amber-600">450k Kz</p>
        </div>
      </div>
      
      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-bold">Solicitações Pendentes de Verificação</h3>
        </div>
        <div className="divide-y">
          {[1,2,3].map(i => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">Prestador #{i}23</p>
                  <p className="text-xs text-gray-500">Documento: Bilhete de Identidade</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">❌</button>
                <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg">✅</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-teal-900 text-white p-6 rounded-3xl">
        <h3 className="font-bold text-lg mb-2">Relatório de IA</h3>
        <p className="text-teal-200 text-sm mb-4">A demanda por encanadores no Cazenga aumentou 30% nesta semana.</p>
        <button className="w-full bg-teal-500 py-3 rounded-xl font-bold">Gerar Relatório Completo</button>
      </section>
    </div>
  );
}

export default App;
