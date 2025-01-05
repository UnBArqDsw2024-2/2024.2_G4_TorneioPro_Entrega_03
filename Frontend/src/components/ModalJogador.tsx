import React from 'react';

interface PlayerFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    sport: string;
    championship: string;
    trainer?: string;
    team?: string;
  }) => void;
}

const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    sport: '',
    championship: '',
    trainer: '',
    team: '',
  });

  const championshipOptions = {
    football: ['Brasileirão Série A', 'Brasileirão Série B', 'Copa do Brasil'],
    basketball: ['NBB', 'Copa Super 8', 'Liga Ouro'],
    '': [],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-80 p-4 bg-slate-800 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-white mb-4">Digite os dados do jogador a ser criado:</h2>
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <select
          className="w-full p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setFormData({ ...formData, sport: e.target.value, championship: '' })}
        >
          <option value="">Esporte...</option>
          <option value="football">Futebol</option>
          <option value="basketball">Basquete</option>
        </select>
        <select
          className="w-full p-2 rounded bg-slate-700 text-white"
          disabled={!formData.sport}
          onChange={(e) => setFormData({ ...formData, championship: e.target.value })}
        >
          <option value="">Campeonato...</option>
          {championshipOptions[formData.sport as keyof typeof championshipOptions].map(
            (championship) => (
              <option key={championship} value={championship}>
                {championship}
              </option>
            )
          )}
        </select>
        <select
          className="w-full p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
        >
          <option value="">Treinador/Líder (opcional)...</option>
          <option value="trainer1">Treinador 1</option>
          <option value="trainer2">Treinador 2</option>
        </select>
        <select
          className="w-full p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
        >
          <option value="">Time (opcional)...</option>
          <option value="team1">Time 1</option>
          <option value="team2">Time 2</option>
        </select>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          CRIAR
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;