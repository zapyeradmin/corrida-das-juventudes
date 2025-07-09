import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState<any>(null);
  const [allInscricoes, setAllInscricoes] = useState<Inscricao[]>([]);
  const [filteredInscricoes, setFilteredInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
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
    checkAuth();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, allInscricoes]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin-login');
        return;
      }

      setUser(session.user);
      await loadInscricoes();
      setupRealTimeListener();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/admin-login');
    }
  };

  const loadInscricoes = async () => {
    try {
      const { data, error } = await supabase
        .from('inscricoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllInscricoes(data || []);
    } catch (error) {
      console.error('Error loading inscricoes:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeListener = () => {
    const channel = supabase
      .channel('inscricoes-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'inscricoes'
      }, () => {
        loadInscricoes();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

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

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('inscricoes')
        .update({ status_pagamento: 'pago' })
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error approving payment:', error);
      alert('Erro ao aprovar pagamento.');
    }
  };

  const handleEdit = (inscricao: Inscricao) => {
    setSelectedInscricao(inscricao);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInscricao) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const { error } = await supabase
        .from('inscricoes')
        .update({
          nome_completo: formData.get('nome_completo') as string,
          email: formData.get('email') as string,
          cpf: formData.get('cpf') as string,
          sexo: formData.get('sexo') as string,
          categoria: formData.get('categoria') as string,
        })
        .eq('id', selectedInscricao.id);

      if (error) throw error;
      setIsEditModalOpen(false);
      setSelectedInscricao(null);
    } catch (error) {
      console.error('Error updating inscription:', error);
      alert('Erro ao atualizar inscrição.');
    }
  };

  const handleDelete = (id: string) => {
    setRecordToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!recordToDeleteId) return;

    try {
      const { error } = await supabase
        .from('inscricoes')
        .delete()
        .eq('id', recordToDeleteId);

      if (error) throw error;
      setIsDeleteModalOpen(false);
      setRecordToDeleteId(null);
    } catch (error) {
      console.error('Error deleting inscription:', error);
      alert('Erro ao excluir inscrição.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const calculateStats = () => {
    const total = allInscricoes.length;
    const valorPix = 54.46;
    const valorCartao = 52.26;
    
    let valorConfirmado = 0;
    let valorPendente = 0;

    allInscricoes.forEach(insc => {
      const valor = insc.forma_pagamento === 'PIX' ? valorPix : valorCartao;
      if (insc.status_pagamento === 'pago') {
        valorConfirmado += valor;
      } else {
        valorPendente += valor;
      }
    });

    return { total, valorConfirmado, valorPendente };
  };

  const getPaginatedData = () => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredInscricoes.slice(start, start + ROWS_PER_PAGE);
  };

  const getTotalPages = () => Math.ceil(filteredInscricoes.length / ROWS_PER_PAGE);

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
  const totalPages = getTotalPages();

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

        {/* Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
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
                          onClick={() => handleApprove(inscricao.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Aprovar Pagamento"
                        >
                          <i className="fas fa-check-circle"></i>
                        </button>
                      )}
                      <button 
                        onClick={() => handleEdit(inscricao)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(inscricao.id)}
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
        </div>
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && selectedInscricao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 m-4 max-h-screen overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Editar Inscrição</h3>
            <form onSubmit={handleEditSubmit}>
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
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
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
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
            <h3 className="text-xl font-semibold mb-2">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">Tem certeza de que deseja excluir esta inscrição? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;