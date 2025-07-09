import React from 'react';

interface AdminStatsCardsProps {
  stats: {
    total: number;
    valorConfirmado: number;
    valorPendente: number;
  };
}

export const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
        <div className="bg-blue-100 p-4 rounded-full mr-4">
          <i className="fas fa-users text-2xl text-blue-500"></i>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total de Inscritos</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <i className="fas fa-dollar-sign text-2xl text-green-500"></i>
        </div>
        <div>
          <p className="text-sm text-gray-500">Valor Total Confirmado</p>
          <p className="text-3xl font-bold">R$ {stats.valorConfirmado.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
        <div className="bg-orange-100 p-4 rounded-full mr-4">
          <i className="fas fa-hourglass-half text-2xl text-orange-500"></i>
        </div>
        <div>
          <p className="text-sm text-gray-500">Valor Pendente</p>
          <p className="text-3xl font-bold">R$ {stats.valorPendente.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
    </div>
  );
};