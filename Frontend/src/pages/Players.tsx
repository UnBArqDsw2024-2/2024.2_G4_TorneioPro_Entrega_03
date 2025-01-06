import React from 'react';
import DashboardChapionship from '../components/DashboardPlayer';
import ChampionshipListItem from '../components/PlayerListItem';

const Players: React.FC = () => {
    // Dados mockados para testar o componente
    const mockChampionships = [
        {
            id: 1,
            name: "Campeonato de Futebol 2024",
            description: "Campeonato anual de futebol com times da região",
            type: "Eliminatórias",
            championship_type: "Profissional",
            start_date: "2024-03-01",
            end_date: "2024-11-30"
        },
        {
            id: 2,
            name: "Copa Vôlei Master",
            description: "Torneio de vôlei para atletas master",
            type: "Pontos Corridos",
            championship_type: "Master",
            start_date: "2024-04-15",
            end_date: "2024-08-20"
        },
        {
            id: 3,
            name: "Torneio de Basquete Juvenil",
            description: "Competição para jovens talentos do basquete",
            type: "Mata-mata",
            championship_type: "Juvenil",
            start_date: "2024-05-10",
            end_date: "2024-07-15"
        }
    ];

    const handleEdit = (id: number) => {
        console.log('Editar campeonato:', id);
    };

    const handleDelete = (id: number) => {
        console.log('Deletar campeonato:', id);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <DashboardChapionship 
                    title="Jogador"
                    items={mockChampionships}
                >
                    <div className="space-y-4 mt-4">
                        {mockChampionships.map((championship) => (
                            <ChampionshipListItem
                                key={championship.id}
                                championship={championship}
                                editFn={() => handleEdit(championship.id)}
                                delFn={() => handleDelete(championship.id)}
                            />
                        ))}
                    </div>
                </DashboardChapionship>
            </div>
        </div>
    );
};

export default Players;
