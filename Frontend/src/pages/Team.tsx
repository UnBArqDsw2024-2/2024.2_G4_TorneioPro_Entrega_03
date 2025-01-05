import React from 'react';
import DashboardTeam from '../components/DashboardTeam';

const Team: React.FC = () => {
    // Dados mockados para testar o componente
    const mockTeams = [
        {
            id: 1,
            name: "Flamengo",
            description: "Time de futebol profissional",
        },
        {
            id: 2,
            name: "Vasco",
            description: "Time tradicional do Rio de Janeiro",
        },
        {
            id: 3,
            name: "Botafogo",
            description: "Clube com grande história",
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <DashboardTeam
                    title="Time"
                    items={mockTeams}
                />
            </div>
        </div>
    );
};

export default Team;
