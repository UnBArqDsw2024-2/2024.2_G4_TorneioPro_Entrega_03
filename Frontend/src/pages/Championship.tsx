import React from 'react';
import DashboardChapionship from '../components/DashboardChapionship';

const Championship: React.FC = () => {
    // Exemplo de dados - você pode adaptar conforme necessário
    const mockItems = [
        { nome: 'Exemplo 1', email: 'exemplo1@email.com', matricula: '123456' },
        { nome: 'Exemplo 2', email: 'exemplo2@email.com', matricula: '789012' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <DashboardChapionship 
                    title="Campeonato"
                    items={mockItems}
                />
            </div>
        </div>
    );
};

export default Championship;
