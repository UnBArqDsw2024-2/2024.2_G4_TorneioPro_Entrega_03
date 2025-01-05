import React from 'react';
import DashboardTeam from '../components/DashboardTeam';

const Team: React.FC = () => {
    // Exemplo de dados - você pode adaptar conforme necessário
    const mockItems = [
        { nome: 'Exemplo 1', email: 'exemplo1@email.com', matricula: '123456' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <DashboardTeam 
                    title="Time"
                    items={mockItems}
                />
            </div>
        </div>
    );
};

export default Team;
