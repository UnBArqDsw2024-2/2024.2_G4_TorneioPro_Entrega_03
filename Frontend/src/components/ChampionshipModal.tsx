import React, { useState, ReactNode } from 'react';

interface FormData {
  name: string;
  sport: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
}

interface ChampionshipModalProps {
  children: ReactNode;
  onSubmit: (data: FormData) => void;
}

const SPORTS = ['Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Outros'];
const CATEGORIES = ['Amador', 'Profissional', 'Juvenil', 'Master'];

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 40
        }}
        onClick={onClose}
      />
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="bg-[#1a2634] p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-200 text-xl font-semibold">{title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 text-2xl font-bold focus:outline-none focus:ring-0 focus:border-none border-none p-0 bg-transparent"
            >
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

const ChampionshipModal: React.FC<ChampionshipModalProps> = ({ children, onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sport: '',
    description: '',
    startDate: '',
    endDate: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      sport: '',
      description: '',
      startDate: '',
      endDate: '',
      category: '',
    });
    setIsModalOpen(false);
  };

  const inputClassName = "w-full bg-[#2c3e50] text-white rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 transition-all duration-200";
  const selectClassName = "w-full bg-[#2c3e50] text-white rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200";

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>
        {children}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Novo Campeonato">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Nome do Campeonato" 
            value={formData.name} 
            onChange={handleChange} 
            className={inputClassName}
            required
          />
          
          <select 
            name="sport" 
            value={formData.sport} 
            onChange={handleChange} 
            className={selectClassName}
            required
          >
            <option value="">Selecione o Esporte...</option>
            {SPORTS.map(sport => <option key={sport} value={sport}>{sport}</option>)}
          </select>
          
          <textarea 
            name="description" 
            placeholder="Descrição do campeonato..." 
            value={formData.description} 
            onChange={handleChange} 
            rows={4} 
            className={`${inputClassName} resize-none`}
            required
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Data Início</label>
              <input 
                type="date" 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleChange} 
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Data Fim</label>
              <input 
                type="date" 
                name="endDate" 
                value={formData.endDate} 
                onChange={handleChange} 
                className={inputClassName}
                required
              />
            </div>
          </div>
          
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className={selectClassName}
            required
          >
            <option value="">Selecione a Categoria...</option>
            {CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
          
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            CRIAR
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ChampionshipModal;