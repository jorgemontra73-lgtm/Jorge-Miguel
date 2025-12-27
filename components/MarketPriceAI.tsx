
import React, { useState } from 'react';
import { ServiceType, MarketAnalysis } from '../types';
import { estimateMarketPrice } from '../services/geminiService';

const MarketPriceAI: React.FC<{ service: ServiceType }> = ({ service }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MarketAnalysis | null>(null);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await estimateMarketPrice(service);
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-amber-900">Estimativa Inteligente</h3>
          <p className="text-xs text-amber-700">Preços e demanda atualizados por IA</p>
        </div>
        <button 
          onClick={analyze}
          disabled={loading}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition disabled:opacity-50"
        >
          {loading ? 'Analisando...' : 'Ver Estimativa'}
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-amber-200">
            <p className="text-xs text-gray-500">Média de Preço</p>
            <p className="text-lg font-bold text-teal-700">{data.avgPrice.toLocaleString('pt-AO')} Kz</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-amber-200">
            <p className="text-xs text-gray-500">Demanda Local</p>
            <p className={`text-lg font-bold ${data.demandLevel === 'Alta' ? 'text-red-500' : 'text-green-500'}`}>
              {data.demandLevel}
            </p>
          </div>
          <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm border border-amber-200">
            <p className="text-xs text-gray-500">Zonas com maior procura</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.topAreas.map(area => (
                <span key={area} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">{area}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPriceAI;
