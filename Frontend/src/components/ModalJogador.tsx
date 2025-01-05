// ModalJogador.tsx (PlayerForm.tsx)

import React from 'react';

export type Sport = 'football' | 'basketball';
export type Championship = 'Brasileirão Série A' | 'Brasileirão Série B' | 'Copa do Brasil' | 'NBB' | 'Copa Super 8' | 'Liga Ouro';

export interface Player {
  name: string;
  email: string;
  sport: Sport | '';
  championship: Championship | '';
  trainer?: string;
  team?: string;
}

export class PlayerBuilder {
  private player: Player = {
    name: '',
    email: '',
    sport: '',
    championship: '',
  };

  setName(name: string): PlayerBuilder {
    this.player.name = name;
    return this;
  }

  setEmail(email: string): PlayerBuilder {
    this.player.email = email;
    return this;
  }

  setSport(sport: Sport | ''): PlayerBuilder {
    this.player.sport = sport;
    return this;
  }

  setChampionship(championship: Championship | ''): PlayerBuilder {
    this.player.championship = championship;
    return this;
  }

  setTrainer(trainer?: string): PlayerBuilder {
    this.player.trainer = trainer;
    return this;
  }

  setTeam(team?: string): PlayerBuilder {
    this.player.team = team;
    return this;
  }

  build(): Player {
    if (!this.player.name || !this.player.email || !this.player.sport || !this.player.championship) {
      throw new Error('Required fields are missing');
    }
    return { ...this.player };
  }
}

interface PlayerFormProps {
  onSubmit: (player: Player) => void;
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

  const [isVisible, setIsVisible] = React.useState(true);

  const championshipOptions = {
    football: ['Brasileirão Série A', 'Brasileirão Série B', 'Copa do Brasil'],
    basketball: ['NBB', 'Copa Super 8', 'Liga Ouro'],
    '': [],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const player = new PlayerBuilder()
        .setName(formData.name)
        .setEmail(formData.email)
        .setSport(formData.sport as Sport)
        .setChampionship(formData.championship as Championship)
        .setTrainer(formData.trainer)
        .setTeam(formData.team)
        .build();

      onSubmit(player);
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={() => setIsVisible(false)}></div>

      {/* Modal Container */}
      <div className="modal-container">
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

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 999;
        }

        .modal-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          background-color: #1e293b;
          padding: 20px;
          border-radius: 8px;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default PlayerForm;
