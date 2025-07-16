import React from 'react';

interface Inscricao {
  id: string;
  nome_completo: string;
  email: string;
  cpf: string;
  sexo: string;
  categoria: string;
  status_pagamento: string;
  forma_pagamento: string;
  data_nascimento: string;
  created_at: string;
  whatsapp: string;
  nome_expressao_juvenil?: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInscricao: Inscricao | null;
  onSubmit: (e: React.FormEvent) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  selectedInscricao,
  onSubmit
}) => {
  if (!isOpen || !selectedInscricao) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 m-4 max-h-screen overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Editar Inscrição</h3>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input 
                type="text" 
                name="nome_completo"
                defaultValue={selectedInscricao.nome_completo}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input 
                type="email" 
                name="email"
                defaultValue={selectedInscricao.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CPF</label>
              <input 
                type="text" 
                name="cpf"
                defaultValue={selectedInscricao.cpf}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
              <input 
                type="text" 
                name="whatsapp"
                defaultValue={selectedInscricao.whatsapp}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sexo</label>
              <select 
                name="sexo"
                defaultValue={selectedInscricao.sexo}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Categoria</label>
              <select 
                name="categoria"
                defaultValue={selectedInscricao.categoria}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                required
              >
                <option value="Geral Masculino">Geral Masculino</option>
                <option value="Geral Feminino">Geral Feminino</option>
                <option value="Expressão Juvenil Masculino">Expressão Juvenil Masculino</option>
                <option value="Expressão Juvenil Feminino">Expressão Juvenil Feminino</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Nome da Expressão Juvenil</label>
              <input 
                type="text" 
                name="nome_expressao_juvenil"
                defaultValue={selectedInscricao.nome_expressao_juvenil || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                placeholder="Somente para categorias de Expressão Juvenil"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};