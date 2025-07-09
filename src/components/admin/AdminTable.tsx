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
}

interface AdminTableProps {
  paginatedData: Inscricao[];
  filteredInscricoes: Inscricao[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onApprove: (id: string) => void;
  onEdit: (inscricao: Inscricao) => void;
  onDelete: (id: string) => void;
}

const ROWS_PER_PAGE = 50;

export const AdminTable: React.FC<AdminTableProps> = ({
  paginatedData,
  filteredInscricoes,
  currentPage,
  setCurrentPage,
  onApprove,
  onEdit,
  onDelete
}) => {
  const totalPages = Math.ceil(filteredInscricoes.length / ROWS_PER_PAGE);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nome Completo</th>
              <th className="px-6 py-3">CPF</th>
              <th className="px-6 py-3">Categoria</th>
              <th className="px-6 py-3">Pagamento</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((inscricao) => (
              <tr key={inscricao.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {inscricao.nome_completo}
                </td>
                <td className="px-6 py-4">{inscricao.cpf}</td>
                <td className="px-6 py-4">{inscricao.categoria}</td>
                <td className="px-6 py-4">{inscricao.forma_pagamento || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 font-semibold leading-tight text-xs rounded-full ${
                    inscricao.status_pagamento === 'pago' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {inscricao.status_pagamento === 'pago' ? 'Aprovado' : inscricao.status_pagamento}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  {inscricao.status_pagamento !== 'pago' && (
                    <button 
                      onClick={() => onApprove(inscricao.id)}
                      className="text-green-600 hover:text-green-900"
                      title="Aprovar Pagamento"
                    >
                      <i className="fas fa-check-circle"></i>
                    </button>
                  )}
                  <button 
                    onClick={() => onEdit(inscricao)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Editar"
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button 
                    onClick={() => onDelete(inscricao.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Excluir"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredInscricoes.length === 0 && (
        <p className="text-center p-8 text-gray-500">Nenhum resultado encontrado.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === page 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </>
  );
};