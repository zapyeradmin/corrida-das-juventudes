import { useState, useEffect } from 'react';
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
  whatsapp: string;
  nome_expressao_juvenil?: string;
}

export const useAdminData = () => {
  const [user, setUser] = useState<any>(null);
  const [allInscricoes, setAllInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

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

  const handleEdit = async (updatedData: Partial<Inscricao>, id: string) => {
    try {
      const { error } = await supabase
        .from('inscricoes')
        .update(updatedData)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating inscription:', error);
      alert('Erro ao atualizar inscrição.');
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('inscricoes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting inscription:', error);
      alert('Erro ao excluir inscrição.');
      return false;
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

  return {
    user,
    allInscricoes,
    loading,
    handleApprove,
    handleEdit,
    handleDelete,
    handleLogout,
    calculateStats
  };
};