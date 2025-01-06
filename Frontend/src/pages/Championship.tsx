import React, { useState, useEffect } from 'react';
import DashboardChapionship from '../components/DashboardChapionship';
import ChampionshipListItem from '../components/ChampionshipListItem';
import { useAuth } from '../context/AuthContext';

interface APIChampionship {
    id: number;
    name: string;
    description: string;
    sport: number;
    start_date: string;
    end_date: string;
    teams: number[];
}

interface UIChampionship {
    id: number;
    name: string;
    description: string;
    type: string;
    championship_type: string;
    start_date: string;
    end_date: string;
}

const Championship: React.FC = () => {
    const { user } = useAuth();
    const [championships, setChampionships] = useState<UIChampionship[]>([]);

    const fetchChampionships = async () => {
        try {
            const response = await fetch('http://localhost:8000/championships/list/', {
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Falha ao buscar campeonatos');
            }
            const data: APIChampionship[] = await response.json();
            
            // Mapeia os dados da API para o formato esperado pela UI
            const uiData: UIChampionship[] = data.map(championship => ({
                id: championship.id,
                name: championship.name,
                description: championship.description,
                type: 'Eliminatórias', // Valor padrão, ajuste conforme necessário
                championship_type: 'Profissional', // Valor padrão, ajuste conforme necessário
                start_date: championship.start_date,
                end_date: championship.end_date
            }));
            
            setChampionships(uiData);
        } catch (error) {
            console.error('Erro ao buscar campeonatos:', error);
            setChampionships([]);
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchChampionships();
        }
    }, [user?.token]);

    const handleEdit = async (id: number) => {
        // Por enquanto apenas log, a edição será implementada no modal
        console.log('Editar campeonato:', id);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja deletar este campeonato?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/championships/delete/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao deletar campeonato');
            }

            // Atualiza a lista após deletar
            await fetchChampionships();
        } catch (error) {
            console.error('Erro ao deletar campeonato:', error);
            alert('Erro ao deletar campeonato. Por favor, tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <DashboardChapionship 
                    title="Campeonato"
                    items={championships}
                >
                    <div className="space-y-4 mt-4">
                        {championships.map((championship) => (
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

export default Championship;
