import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin-dashboard');
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/admin-dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const displayMessage = (message: string, type: 'error' | 'success') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        displayMessage('E-mail ou senha inválidos.', 'error');
      } else {
        // Will be handled by onAuthStateChange
      }
    } catch (err) {
      displayMessage('Erro interno. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex items-center justify-center h-screen w-full bg-slate-900 bg-opacity-50"
      style={{
        backgroundImage: "url('/lovable-uploads/0eafe6c1-a1b6-418a-9728-2e651d9c8367.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Acesso Administrativo</h1>
          <p className="text-gray-600 mt-2 font-poppins">Corrida das Juventudes</p>
        </div>

        <form onSubmit={handleSubmit}>
          {message && (
            <div className="mb-4 text-sm">
              <div 
                className={`${
                  messageType === 'error' 
                    ? 'bg-red-100 border-red-400 text-red-700' 
                    : 'bg-green-100 border-green-400 text-green-700'
                } border px-4 py-3 rounded-lg`} 
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700 font-poppins">
              E-mail
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow font-poppins"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700 font-poppins">
              Senha
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow font-poppins"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg font-poppins disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;