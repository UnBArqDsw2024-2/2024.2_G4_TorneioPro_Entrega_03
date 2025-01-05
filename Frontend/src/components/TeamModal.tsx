import React, {useState, ReactNode, useEffect} from 'react';

interface FormData {
    name: string;
    sport: string;
    description: string;
    trainerId: string;
    allowRequests: boolean;
}

interface UserDetails {
    id: number;
    username: string;
    email: string;
    user_type: string;
    is_approved: boolean;
}

interface Trainer {
    id: number;
    user: number;
    user_details: UserDetails;
    experience_years: number;
    specialization: string;
    license_number: string;
    created_at: string;
    updated_at: string;
}

interface TeamModalProps {
    onSubmit: (data: FormData) => void;
    children: ReactNode;
}

const SPORTS = ['Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Outros'];

const Modal = ({isOpen, onClose, title, children}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) => {
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

const TeamModal: React.FC<TeamModalProps> = ({onSubmit, children}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        sport: '',
        description: '',
        trainerId: '',
        allowRequests: false
    });

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await fetch('http://localhost:8000/trainers/list/', {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MDUzMjY4LCJpYXQiOjE3MzYwNDk2NjgsImp0aSI6IjliM2Y3ODllMzQ0NDRjYjg4MDEyZTNmY2Q3NGJmNGRmIiwidXNlcl9pZCI6MX0.EqkPagY2jmxZyZTOPL7K2vJdiu0jHhzVRFdksidmd2k`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Falha ao buscar treinadores');
                }
                const data = await response.json();
                setTrainers(data);
            } catch (error) {
                console.error('Erro ao buscar treinadores:', error);
                // Dados mockados para teste em caso de falha na API
                setTrainers([
                    {
                        id: 1,
                        user: 1,
                        user_details: {
                            id: 1,
                            username: "Treinador 1",
                            email: "treinador1@exemplo.com",
                            user_type: "trainer",
                            is_approved: true
                        },
                        experience_years: 5,
                        specialization: "Futebol",
                        license_number: "TMP_1",
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }
                ]);
            }
        };

        if (isModalOpen) {
            fetchTrainers();
        }
    }, [isModalOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value, type} = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({...prev, [name]: newValue}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/teams/create/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MDUzMjY4LCJpYXQiOjE3MzYwNDk2NjgsImp0aSI6IjliM2Y3ODllMzQ0NDRjYjg4MDEyZTNmY2Q3NGJmNGRmIiwidXNlcl9pZCI6MX0.EqkPagY2jmxZyZTOPL7K2vJdiu0jHhzVRFdksidmd2k`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    trainer: parseInt(formData.trainerId)
                })
            });

            if (!response.ok) {
                throw new Error('Falha ao criar time');
            }

            const data = await response.json();
            console.log('Time criado com sucesso:', data);

            // Chama o onSubmit com os dados retornados da API
            onSubmit(formData);

            // Limpa o formulário
            setFormData({
                name: '',
                sport: '',
                description: '',
                trainerId: '',
                allowRequests: false
            });

            // Fecha o modal
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao criar time:', error);
            alert('Erro ao criar time. Por favor, tente novamente.');
        }
    };

    const inputClassName = "w-full bg-[#2c3e50] text-white rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 transition-all duration-200";
    const selectClassName = "w-full bg-[#2c3e50] text-white rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200";

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>
                {children}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Novo Time">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome do Time"
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
                        placeholder="Descrição do time..."
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`${inputClassName} resize-none`}
                        required
                    />

                    <select
                        name="trainerId"
                        value={formData.trainerId}
                        onChange={handleChange}
                        className={selectClassName}
                        required
                    >
                        <option value="">Selecione o Treinador...</option>
                        {trainers.map(trainer => (
                            <option key={trainer.id} value={trainer.user.toString()}>
                                {trainer.user_details.username}
                            </option>
                        ))}
                    </select>

                    <label
                        className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-gray-200 transition-colors duration-200">
                        <input
                            type="checkbox"
                            name="allowRequests"
                            checked={formData.allowRequests}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500 transition-colors duration-200"
                        />
                        <span className="text-sm">Permitir que jogadores solicitem entrada no time</span>
                    </label>

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

export default TeamModal;