import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
        <h3 className="text-xl font-semibold mb-2">Confirmar Exclusão</h3>
        <p className="text-gray-600 mb-6">Tem certeza de que deseja excluir esta inscrição? Esta ação não pode ser desfeita.</p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};