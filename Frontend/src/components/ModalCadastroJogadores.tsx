import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

// Sports data configuration
const sportsData = {
  futebol: {
    name: 'Futebol',
    championships: [
      { id: 'brasileirao', name: 'Brasileirão' },
      { id: 'libertadores', name: 'Libertadores' },
      { id: 'copa-brasil', name: 'Copa do Brasil' },
      { id: 'champions', name: 'Champions League' }
    ]
  },
  basquete: {
    name: 'Basquete',
    championships: [
      { id: 'nba', name: 'NBA' },
      { id: 'nbb', name: 'NBB' },
      { id: 'euroleague', name: 'EuroLeague' }
    ]
  },
  volei: {
    name: 'Vôlei',
    championships: [
      { id: 'superliga', name: 'Superliga' },
      { id: 'mundial-clubes', name: 'Mundial de Clubes' },
      { id: 'liga-nacoes', name: 'Liga das Nações' }
    ]
  }
} as const;

type Sport = keyof typeof sportsData;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sport, setSport] = useState<Sport | ''>('');
  const [championship, setChampionship] = useState('');
  const [coach, setCoach] = useState('');
  const [team, setTeam] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSport = e.target.value as Sport | '';
    setSport(newSport);
    setChampionship(''); // Reset championship when sport changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sport || !championship) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Dados enviados com sucesso!');
      onClose();
    } catch (error) {
      alert('Erro ao enviar dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#2A3441] rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-white text-lg mb-6">
          Preencha os campos e envie os dados:
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <select 
            className="w-full p-3 rounded bg-[#1E2530] text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
            value={sport}
            onChange={handleSportChange}
            required
          >
            <option value="">Esporte...</option>
            {Object.entries(sportsData).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>

          <select 
            className="w-full p-3 rounded bg-[#1E2530] text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
            value={championship}
            onChange={(e) => setChampionship(e.target.value)}
            required
            disabled={!sport}
          >
            <option value="">Campeonato...</option>
            {sport && sportsData[sport].championships.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          <select 
            className="w-full p-3 rounded bg-[#1E2530] text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
          >
            <option value="">Treinador/Líder (opcional)...</option>
            <option value="treinador1">Treinador 1</option>
            <option value="treinador2">Treinador 2</option>
          </select>

          <select 
            className="w-full p-3 rounded bg-[#1E2530] text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <option value="">Time (opcional)...</option>
            <option value="time1">Time 1</option>
            <option value="time2">Time 2</option>
          </select>

          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Selecione um arquivo (opcional):</p>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
                accept=".xlsx,.xls"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-between w-full p-3 rounded bg-[#1E2530] text-gray-300 border border-gray-600 cursor-pointer hover:bg-[#262f3d] transition-colors"
              >
                <span>{selectedFile?.name || "Nenhum arquivo escolhido"}</span>
                <Upload className="w-5 h-5" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-[#40B879] hover:bg-[#359c67] disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium rounded transition-colors"
          >
            {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
          </button>
        </form>
      </div>
    </div>
  );
}