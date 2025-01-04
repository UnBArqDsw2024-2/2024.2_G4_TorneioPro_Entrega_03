import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface FormData {
  name: string;
  sport: string;
  description: string;
  championship: string;
  capacity: string;
  allowRequests: boolean;
}

const SPORTS = ['Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Outros'];
const CHAMPIONSHIPS = ['Campeonato A', 'Campeonato B', 'Campeonato C', 'Torneio Regional'];

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; }) => {
  if (!isOpen) return null;
  return (
      <div className="modal">
          <div className="modal-content">
              <span onClick={onClose} className="close">&times;</span>
              <h2 className="text-gray-200 text-base mb-4">{title}</h2>
              {children}
          </div>
      </div>
  );
};

const TeamModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sport: '',
    description: '',
    championship: '',
    capacity: '',
    allowRequests: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do time:', formData);
    setFormData({
      name: '',
      sport: '',
      description: '',
      championship: '',
      capacity: '',
      allowRequests: false
    });
    setIsModalOpen(false);
  };

  const inputClassName = "w-full bg-[#2c3e50] text-white rounded-md px-3 py-2 mb-3 focus:outline-none placeholder:text-gray-400";
  const selectClassName = "w-full bg-[#2c3e50] text-white rounded-md px-3 py-2 mb-3 focus:outline-none appearance-none";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded transition-colors duration-200"
      >
        <PlusCircle size={20} />
        Criar Time
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Digite os dados do time a ser criado:">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Nome" 
            value={formData.name} 
            onChange={handleChange} 
            className={inputClassName}
          />
          
          <select 
            name="sport" 
            value={formData.sport} 
            onChange={handleChange} 
            className={selectClassName}
          >
            <option value="">Esporte...</option>
            {SPORTS.map(sport => <option key={sport} value={sport}>{sport}</option>)}
          </select>
          
          <textarea 
            name="description" 
            placeholder="Descrição..." 
            value={formData.description} 
            onChange={handleChange} 
            rows={4} 
            className={`${inputClassName} resize-none`}
          />
          
          <select 
            name="championship" 
            value={formData.championship} 
            onChange={handleChange} 
            className={selectClassName}
          >
            <option value="">Campeonato...</option>
            {CHAMPIONSHIPS.map(championship => <option key={championship} value={championship}>{championship}</option>)}
          </select>
          
          <input 
            type="number" 
            name="capacity" 
            placeholder="Capacidade" 
            value={formData.capacity} 
            onChange={handleChange} 
            className={inputClassName}
          />
          
          <label className="flex items-center gap-2 text-white mb-0">
              <input 
                  type="checkbox" 
                  name="allowRequests" 
                  checked={formData.allowRequests} 
                  onChange={handleChange} 
                  className="checkbox-small" // Adicione a classe aqui
              />
              Permitir que jogadores autônomos solicitem entrada no time
          </label>
          
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded transition-colors duration-200 mt-2"
          >
            CRIAR
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TeamModal;