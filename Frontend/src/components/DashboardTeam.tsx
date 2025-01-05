import React, {useCallback, useState} from "react";
import {TailwindThemeAdapter} from "./adpater/TailwindThemeAdapter.tsx";
import TeamModal from "./TeamModal.tsx";
import TeamListItem from "./TeamListItem.tsx";

interface Props {
    title: string;
    items: Array<any>;
}

const DashboardTeam: React.FC<Props> = ({title, items}) => {
    const [filteredItems, setFilteredItems] = useState(items);
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    // Define the initial theme
    TailwindThemeAdapter.setTheme(theme);
    const colors = TailwindThemeAdapter.getColors();

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const search = e.target.value.toLowerCase();
            if (search === "") {
                setFilteredItems(items);
            } else {
                const filtered = items.filter((item) => {
                    return (
                        item.name?.toLowerCase().includes(search) ||
                        item.description?.toLowerCase().includes(search)
                    );
                });
                setFilteredItems(filtered);
            }
        },
        [items]
    );

    const handleSubmit = (data) => {
        // Adicione aqui a lógica para lidar com o envio do formulário
        console.log('Form submitted:', data);
    };

    const handleEdit = (id: number) => {
        console.log('Editar time:', id);
    };

    const handleDelete = (id: number) => {
        console.log('Deletar time:', id);
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        TailwindThemeAdapter.setTheme(newTheme);
    };

    return (
        <div className={`${colors.dashboardCard.bg} shadow-lg rounded-[10px] lg:mt-20 lg:mx-3.5 mx-2.5`}>
            <div className={`${colors.dashboardCard.titleBg} rounded-t-[10px]`}>
                <div className="flex flex-col justify-center items-center lg:flex-row lg:px-4 px-2">
                    <p className={`lg:my-2.5 my-1.5 lg:text-4xl text-xl ${colors.text.detail}`}>{title}</p>
                </div>
            </div>
            <div className="flex flex-col h-[82vh]">
                <div className="flex lg:flex-row flex-col justify-between lg:mt-3 mt-2 lg:px-4 px-3 w-full">
                    <div className="flex flex-col lg:w-1/3 w-full">
                        <label
                            className={`input input-bordered flex items-center gap-4 ${colors.dashboardCard.search} border-none lg:h-[50px] h-[40px]`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-search w-5 h-5 text-primary-text-detail"
                            >
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.3-4.3"/>
                            </svg>
                            <input
                                onChange={handleSearch}
                                type="text"
                                className={`grow ${colors.text.placeholder} lg:text-lg text-base`}
                                placeholder={`Pesquisar ${title.toLowerCase()}...`}
                            />
                        </label>
                    </div>
                    <div className="flex flex-row lg:mt-0 mt-4 lg:gap-x-6 gap-x-2">
                        <TeamModal onSubmit={handleSubmit}>
                            <div
                                role="button"
                                tabIndex={0}
                                className={`${colors.dashboardCard.btn.base} hover:${colors.dashboardCard.btn.hover} lg:h-[50px] h-[40px] lg:w-[15vw] w-[40vw] rounded-[10px] flex flex-row justify-start items-center pl-3 mr-1 lg:text-lg text-sm cursor-pointer`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-circle-plus w-6 h-6 text-primary-text-detail lg:mr-3 mr-2"
                                >
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M8 12h8"/>
                                    <path d="M12 8v8"/>
                                </svg>
                                CADASTRAR {title}
                            </div>
                        </TeamModal>
                    </div>
                </div>
                <div
                    className="lg:mt-4 mt-2 lg:px-4 px-3 overflow-y-auto whitespace-nowrap scroll-smooth scrollbar-thumb-navbar-secondary-btn-hover scrollbar-track-transparent scrollbar-thin snap-y snap-mandatory">
                    {filteredItems.length !== 0 ? (
                        filteredItems.map((team) => (
                            <TeamListItem
                                key={team.id}
                                team={team}
                                editFn={() => handleEdit(team.id)}
                                delFn={() => handleDelete(team.id)}
                            />
                        ))
                    ) : (
                        <div
                            key={0}
                            className={`mt-1 flex flex-col justify-center items-center w-full justify-self-center bg-transparent rounded-[10px] border-2 ${colors.buttons.primary.base}`}
                        >
                            <div
                                className={`flex flex-col justify-center lg:h-[15vh] h-[15vh] ${colors.buttons.primary.hover} lg:text-3xl text-xl`}
                            >
                                <p>Sem {title.toLowerCase()} no momento...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardTeam;
