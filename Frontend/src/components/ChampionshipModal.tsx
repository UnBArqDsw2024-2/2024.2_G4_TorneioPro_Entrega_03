import React, { useState, ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Strategy Interface
interface ChampionshipStrategy {
  validateForm: (data: FormData) => { isValid: boolean; errors?: string[] };
  prepareSubmission: (data: FormData, teams: Team[]) => any;
}

// Simple Strategy - Basic Validation
const SimpleChampionshipStrategy: ChampionshipStrategy = {
  validateForm: (data: FormData) => {
    const errors: string[] = [];
    
    if (!data.name || data.name.length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    }
    if (!data.sport) {
      errors.push('Selecione um esporte');
    }
    if (!data.start_date) {
      errors.push('Data de início é obrigatória');
    }
    if (!data.teams || data.teams.length === 0) {
      errors.push('Selecione pelo menos um time');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },
  prepareSubmission: (data: FormData, teams: Team[]) => {
    const selectedTeamIds = data.teams.map(teamName => {
      const team = teams.find(t => t.name === teamName);
      return team ? team.id : null;
    }).filter(id => id !== null);

    return {
      name: data.name,
      description: data.description || 'Campeonato',
      sport: parseInt(data.sport),
      start_date: data.start_date,
      end_date: data.end_date || data.start_date, // Use start_date as end_date if not provided
      teams: selectedTeamIds
    };
  }
};

// Advanced Strategy - Strict Validation
const AdvancedChampionshipStrategy: ChampionshipStrategy = {
  validateForm: (data: FormData) => {
    const errors: string[] = [];
    
    if (!data.name || data.name.length < 5) {
      errors.push('Nome deve ter pelo menos 5 caracteres');
    }
    if (!data.description || data.description.length < 10) {
      errors.push('Descrição deve ter pelo menos 10 caracteres');
    }
    if (!data.sport) {
      errors.push('Selecione um esporte');
    }
    if (!data.start_date || !data.end_date) {
      errors.push('Datas de início e fim são obrigatórias');
    }
    if (data.start_date && data.end_date && new Date(data.start_date) >= new Date(data.end_date)) {
      errors.push('Data de início deve ser anterior à data de fim');
    }
    if (!data.teams || data.teams.length < 2) {
      errors.push('Selecione pelo menos dois times');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },
  prepareSubmission: (data: FormData, teams: Team[]) => {
    const selectedTeamIds = data.teams.map(teamName => {
      const team = teams.find(t => t.name === teamName);
      return team ? team.id : null;
    }).filter(id => id !== null);

    return {
      name: data.name,
      description: `${data.description} (${SPORTS.find(s => s.id === parseInt(data.sport))?.name})`,
      sport: parseInt(data.sport),
      start_date: data.start_date,
      end_date: data.end_date,
      teams: selectedTeamIds
    };
  }
};

interface FormData {
  name: string;
  description: string;
  sport: string;
  start_date: string;
  end_date: string;
  teams: string[];
}

interface Team {
  id: number;
  name: string;
  description: string;
  trainer: number;
}

interface ChampionshipModalProps {
  onSubmit: (data: FormData) => void;
  children: ReactNode;
}

const SPORTS = [
  { id: 1, name: 'Futebol' },
  { id: 2, name: 'Basquete' },
  { id: 3, name: 'Vôlei' },
  { id: 4, name: 'Tênis' },
  { id: 5, name: 'Outros' }
];

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
        <div className="bg-[#1a2634] p-6 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#1a2634] z-10 py-2">
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

const ChampionshipModal: React.FC<ChampionshipModalProps> = ({ onSubmit, children }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    sport: '',
    start_date: '',
    end_date: '',
    teams: []
  });

  // Strategy selection based on form complexity
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const currentStrategy = isAdvancedMode ? AdvancedChampionshipStrategy : SimpleChampionshipStrategy;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:8000/teams/list/', {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Falha ao buscar times');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Erro ao buscar times:', error);
      }
    };

    if (isModalOpen && user?.token) {
      fetchTeams();
    }
  }, [isModalOpen, user?.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'teams') {
      const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions)
        .map(option => option.value);
      setFormData(prev => ({ ...prev, teams: selectedOptions }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Update strategy based on form complexity
    if (name === 'description' || name === 'end_date') {
      setIsAdvancedMode(!!value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form using current strategy
    const validation = currentStrategy.validateForm(formData);
    if (!validation.isValid) {
      alert(validation.errors?.join('\n'));
      return;
    }

    try {
      // Prepare submission data using current strategy
      const submissionData = currentStrategy.prepareSubmission(formData, teams);

      const response = await fetch('http://localhost:8000/championships/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Falha ao criar campeonato');
      }

      const data = await response.json();
      console.log('Campeonato criado com sucesso:', data);
      
      onSubmit(formData);
      
      setFormData({
        name: '',
        description: '',
        sport: '',
        start_date: '',
        end_date: '',
        teams: []
      });
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar campeonato:', error);
      alert('Erro ao criar campeonato. Por favor, tente novamente.');
    }
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
          
          <textarea 
            name="description" 
            placeholder="Descrição do campeonato..." 
            value={formData.description} 
            onChange={handleChange} 
            rows={1} 
            className={`${inputClassName} resize-none`}
            required={isAdvancedMode}
          />
          
          <select 
            name="sport" 
            value={formData.sport} 
            onChange={handleChange} 
            className={selectClassName}
            required
          >
            <option value="">Selecione o Esporte...</option>
            {SPORTS.map(sport => (
              <option key={sport.id} value={sport.id}>{sport.name}</option>
            ))}
          </select>

          <input 
            type="date" 
            name="start_date" 
            value={formData.start_date} 
            onChange={handleChange} 
            className={inputClassName}
            required
          />

          <input 
            type="date" 
            name="end_date" 
            value={formData.end_date} 
            onChange={handleChange} 
            className={inputClassName}
            required={isAdvancedMode}
          />
          
          <div className="relative">
            <select 
              name="teams" 
              value={formData.teams}
              onChange={handleChange} 
              className={`${selectClassName} h-24 overflow-y-auto`}
              multiple
              required
            >
              {teams.map(team => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            <small className="text-gray-400 block mt-1">
              {isAdvancedMode 
                ? 'Selecione pelo menos dois times'
                : 'Selecione pelo menos um time'}
            </small>
          </div>
          
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