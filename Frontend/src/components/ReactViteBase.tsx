function ReactViteBase() {
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    const handleLogin = async () => {
        const response = await login(user, password, false);

        if (!response.success) setMessage(response.message);
        else navigate("/dashboard");
    }

    const handleLoginPeba = async () => {
        const response = await login(user, password, true);

        if (!response.success) setMessage(response.message);
        else navigate("/dashboard");
    }

    // TODO só para testar
    const championships = [
        {
            id: 1,
            name: "Campeonato Tal de Tal",
            description: "Bla bla bla",
            championship_type: "sla",
            teams: [],
            type: "Futebol",
            start_date: "Sat Dec 28 2023 15:00:00 GMT",
            end_date: "Sat Dec 28 2025 17:40:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Altano",
                    team2: "Time Beltrano",
                    point1: 0,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sat Dec 28 2023 15:00:00 GMT",
                    end_date: "Sat Dec 28 2025 16:10:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Ciclano",
                    team2: "Time Deltrano",
                    point1: 2,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sat Dec 28 2024 16:20:00 GMT",
                    end_date: "Sat Dec 28 2024 17:30:00 GMT",
                },
            ],
        },
        {
            id: 2,
            name: "Mundial de League of Legends",
            description: "Bla bla bla",
            championship_type: "sla",
            teams: [],
            type: "League of Legends",
            start_date: "Sun Dec 29 2024 13:00:00 GMT",
            end_date: "Sun Dec 29 2024 19:00:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Tal",
                    team2: "Time Tel",
                    point1: 5,
                    point2: 3,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 13:00:00 GMT",
                    end_date: "Sun Dec 29 2024 14:20:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Til",
                    team2: "Time Tol",
                    point1: 8,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 14:30:00 GMT",
                    end_date: "Sun Dec 29 2024 15:50:00 GMT",
                },
                {
                    id: 3,
                    team1: "Time Tul",
                    team2: "Time Tal Tel",
                    point1: 6,
                    point2: 11,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 16:00:00 GMT",
                    end_date: "Sun Dec 29 2024 17:20:00 GMT",
                },
                {
                    id: 4,
                    team1: "Time Tal til",
                    team2: "Time Tal Tol",
                    point1: 4,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 17:30:00 GMT",
                    end_date: "Sun Dec 29 2024 18:50:00 GMT",
                },
            ],
        },
        {
            id: 1,
            name: "Campeonato Tal de Basquete",
            description: "Bla bla bla",
            championship_type: "sla",
            teams: [],
            type: "Basquete",
            start_date: "Sat Dec 28 2023 15:00:00 GMT",
            end_date: "Sat Dec 28 2025 17:40:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Altano",
                    team2: "Time Beltrano",
                    point1: 0,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sat Dec 28 2023 15:00:00 GMT",
                    end_date: "Sat Dec 28 2025 16:10:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Ciclano",
                    team2: "Time Deltrano",
                    point1: 2,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sat Dec 28 2024 16:20:00 GMT",
                    end_date: "Sat Dec 28 2024 17:30:00 GMT",
                },
            ],
        },
        {
            id: 2,
            name: "Mundial de CS GO",
            description: "Bla bla bla",
            championship_type: "sla",
            teams: [],
            type: "Counter-Strike: Global Offensive",
            start_date: "Sun Dec 29 2024 13:00:00 GMT",
            end_date: "Sun Dec 29 2024 19:00:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Tal",
                    team2: "Time Tel",
                    point1: 5,
                    point2: 3,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 13:00:00 GMT",
                    end_date: "Sun Dec 29 2024 14:20:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Til",
                    team2: "Time Tol",
                    point1: 8,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 14:30:00 GMT",
                    end_date: "Sun Dec 29 2024 15:50:00 GMT",
                },
                {
                    id: 3,
                    team1: "Time Tul",
                    team2: "Time Tal Tel",
                    point1: 6,
                    point2: 11,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 16:00:00 GMT",
                    end_date: "Sun Dec 29 2024 17:20:00 GMT",
                },
                {
                    id: 4,
                    team1: "Time Tal til",
                    team2: "Time Tal Tol",
                    point1: 4,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 17:30:00 GMT",
                    end_date: "Sun Dec 29 2024 18:50:00 GMT",
                },
            ],
        },
    ];

    return (
        <div className="">
            <DashboardBody
                title={"CAMPEONATOS"}
                items={championships}
            />

            <Bracket
            />

            <HorizontalSlider
                title={"Campeonatos Individuais"}
                championships={championships}
                color={SliderColors.dark}
                strategy={SliderStrategy.future}
            />

            <HorizontalSlider
                title={"Campeonatos Individuais"}
                championships={championships}
                color={SliderColors.light}
                strategy={SliderStrategy.default}
            />

            <HorizontalSlider
                title={"Campeonatos Brackets"}
                championships={championships}
                color={SliderColors.light}
                strategy={SliderStrategy.bracket}
            />

            <div className="flex flex-col justify-center items-center mt-20 gap-y-8 mx-5">
                <p className="lg:text-3xl text-base text-primary-text-detail text-justify hyphens-auto"
                    lang="pt-BR">Login Funcional utilizando AuthContext (salvando no LocalStorage), e utilizando o
                    Backend.
                </p>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Usuário" value={user}
                        onChange={e => setUser(e.target.value)} />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder="Senha" value={password}
                        onChange={e => setPassword(e.target.value)} />
                </label>

                <button
                    onClick={() => handleLogin()}
                    className="lg:w-1/6 w-3/4 lg:h-[60px] h-[50px] lg:text-2xl text-lg bg-sidebar-active-btn-base hover:bg-sidebar-active-btn-hover text-primary-text-detail rounded">
                    Login
                </button>

                <p className="text-lg text-secondary">{message}</p>

                <button
                    onClick={() => handleLogout()}
                    className="lg:w-1/6 w-3/4 lg:h-[60px] h-[50px] lg:text-2xl text-lg bg-sidebar-base-btn-base hover:bg-sidebar-base-btn-hover text-primary-text-detail rounded ">
                    Logout
                </button>
            </div>

            <div className="flex flex-col justify-center items-center mt-20 gap-y-8 mx-5">
                <p className="lg:text-3xl text-base text-primary-text-detail text-justify hyphens-auto"
                    lang="pt-BR">Login Funcional utilizando AuthContext (salvando no LocalStorage), sem utilizar o
                    Backend.
                </p>

                <button
                    onClick={() => handleLoginPeba()}
                    className="lg:w-1/6 w-3/4 lg:h-[60px] h-[50px] lg:text-2xl text-lg bg-sidebar-active-btn-base hover:bg-sidebar-active-btn-hover text-primary-text-detail rounded">
                    Simular Login
                </button>

                <button
                    onClick={() => handleLogout()}
                    className="lg:w-1/6 w-3/4 lg:h-[60px] h-[50px] lg:text-2xl text-lg bg-sidebar-base-btn-base hover:bg-sidebar-base-btn-hover text-primary-text-detail rounded ">
                    Simular Logout
                </button>
            </div>
            <div className="flex flex-row gap-x-5"> 
            <CardComponent qtd={5} title={"Campeonatos"} image={trophyIcon} /> 
            <CardComponent qtd={4} title={"Jogadores"} image={PlayerIcon} /> 
            <CardComponent qtd={3} title={"Treinadores"} image={CoachIcon} /> 
            <CardComponent qtd={2} title={"Partidas"} image={MatchIcon} /> 
            <CardComponent qtd={1} title={"Times"} image={TeamIcon} /> 
            </div>  
            
        </div>
    )
}

export default ReactViteBase