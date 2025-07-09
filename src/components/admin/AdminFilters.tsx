import React from 'react';

interface AdminFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export const AdminFilters: React.FC<AdminFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      <h2 className="text-lg font-semibold">Lista de Atletas</h2>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todas as Categorias</option>
          <option value="Geral">Geral</option>
          <option value="Expressão Juvenil">Expressão Juvenil</option>
        </select>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome ou CPF..." 
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};