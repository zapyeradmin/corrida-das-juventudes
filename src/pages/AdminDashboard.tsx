import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '@/hooks/useAdminData';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { AdminFilters } from '@/components/admin/AdminFilters';
import { AdminTable } from '@/components/admin/AdminTable';
import { EditModal } from '@/components/admin/EditModal';
import { DeleteModal } from '@/components/admin/DeleteModal';

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

const AdminDashboard = () => {
  const {
    user,
    allInscricoes,
    loading,
    handleApprove,
    handleEdit,
    handleDelete,
    handleLogout,
    calculateStats
  } = useAdminData();

  const [filteredInscricoes, setFilteredInscricoes] = useState<Inscricao[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInscricao, setSelectedInscricao] = useState<Inscricao | null>(null);
  const [recordToDeleteId, setRecordToDeleteId] = useState<string | null>(null);
  
  const ROWS_PER_PAGE = 50;
  const navigate = useNavigate();

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, allInscricoes]);

  const applyFilters = () => {
    let filtered = allInscricoes;

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(item => item.categoria.includes(selectedCategory));
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cpf.includes(searchTerm)
      );
    }

    setFilteredInscricoes(filtered);
    setCurrentPage(1);
  };

  const handleEditClick = (inscricao: Inscricao) => {
    setSelectedInscricao(inscricao);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInscricao) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedData = {
      nome_completo: formData.get('nome_completo') as string,
      email: formData.get('email') as string,
      cpf: formData.get('cpf') as string,
      sexo: formData.get('sexo') as string,
      categoria: formData.get('categoria') as string,
    };

    const success = await handleEdit(updatedData, selectedInscricao.id);
    if (success) {
      setIsEditModalOpen(false);
      setSelectedInscricao(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setRecordToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!recordToDeleteId) return;

    const success = await handleDelete(recordToDeleteId);
    if (success) {
      setIsDeleteModalOpen(false);
      setRecordToDeleteId(null);
    }
  };

  const getPaginatedData = () => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredInscricoes.slice(start, start + ROWS_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-poppins">Carregando...</p>
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const paginatedData = getPaginatedData();

  return (
    <div className="min-h-screen bg-gray-100 font-poppins">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-blue-600"
                title="Voltar para a Página Inicial"
              >
                <i className="fas fa-arrow-left text-xl"></i>
              </button>
              <h1 className="text-xl font-bold text-gray-800">Inscrições Corrida das Juventudes</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Stats Cards */}
        <AdminStatsCards stats={stats} />

        {/* Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <AdminFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          
          <AdminTable
            paginatedData={paginatedData}
            filteredInscricoes={filteredInscricoes}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onApprove={handleApprove}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </main>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        selectedInscricao={selectedInscricao}
        onSubmit={handleEditSubmit}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AdminDashboard;