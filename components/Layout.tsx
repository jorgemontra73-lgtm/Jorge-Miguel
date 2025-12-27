
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Explorar', icon: '🔍' },
    { path: '/requests', label: 'Pedidos', icon: '📝' },
    { path: '/voice', label: 'Assistente', icon: '🎙️' },
    { path: '/profile', label: 'Perfil', icon: '👤' },
    { path: '/admin', label: 'Admin', icon: '🛡️' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <header className="bg-white border-b sticky top-0 z-50 px-4 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-teal-600 font-bold text-xl flex items-center gap-2">
          <span className="bg-teal-600 text-white p-1 rounded">S+</span>
          Serviços Locais+
        </h1>
        <div className="flex items-center gap-3">
          <button className="bg-gray-100 p-2 rounded-full relative">
             🔔
             <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 md:hidden z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-teal-600 font-medium' : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>

      <footer className="hidden md:block bg-gray-900 text-white py-12 px-6 mt-12">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Serviços Locais+</h3>
            <p className="text-gray-400 text-sm">Conectando o talento angolano às necessidades do dia a dia.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Links Úteis</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Termos de Uso</li>
              <li>Política de Privacidade</li>
              <li>Ajuda</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contactos</h4>
            <p className="text-gray-400 text-sm">suporte@servicoslocaisplus.ao</p>
            <p className="text-gray-400 text-sm">+244 923 000 000</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
