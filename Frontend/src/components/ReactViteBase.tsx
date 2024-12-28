import viteLogo from "../../public/vite.svg";
import reactLogo from "../assets/react.svg";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import HorizontalSlider, {SliderColors} from "./HorizontalSlider.tsx";

function ReactViteBase(){
    const [count, setCount] = useState(0)
    const {login, logout} = useAuth();
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
        
        if(!response.success) setMessage(response.message);
        else navigate("/dashboard");
    }
    
    const handleLoginPeba = async () => {
        const response = await login(user, password, true);

        if(!response.success) setMessage(response.message);
        else navigate("/dashboard");
    }

    // TODO só para testar
    const championships = [
        {
            id: 1,
            name: "Campeonato Tal de Tal", 
            type: "Futebol",
            open: "Sat Dec 28 2023 15:00:00 GMT",
            close: "Sat Dec 28 2025 17:40:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Altano",
                    team2: "Time Beltrano",
                    point1: 0,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sat Dec 28 2023 15:00:00 GMT",
                    close: "Sat Dec 28 2025 16:10:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Ciclano",
                    team2: "Time Deltrano",
                    point1: 2,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sat Dec 28 2024 16:20:00 GMT",
                    close: "Sat Dec 28 2024 17:30:00 GMT",
                },
            ],
        },
        {
            id: 2,
            name: "Mundial de League of Legends",
            type: "League of Legends",
            open: "Sun Dec 29 2024 13:00:00 GMT",
            close: "Sun Dec 29 2024 19:00:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Tal",
                    team2: "Time Tel",
                    point1: 5,
                    point2: 3,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sun Dec 29 2024 13:00:00 GMT",
                    close: "Sun Dec 29 2024 14:20:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Til",
                    team2: "Time Tol",
                    point1: 8,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sun Dec 29 2024 14:30:00 GMT",
                    close: "Sun Dec 29 2024 15:50:00 GMT",
                },
                {
                    id: 3,
                    team1: "Time Tul",
                    team2: "Time Tal Tel",
                    point1: 6,
                    point2: 11,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sun Dec 29 2024 16:00:00 GMT",
                    close: "Sun Dec 29 2024 17:20:00 GMT",
                },
                {
                    id: 4,
                    team1: "Time Tal til",
                    team2: "Time Tal Tol",
                    point1: 4,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sun Dec 29 2024 17:30:00 GMT",
                    close: "Sun Dec 29 2024 18:50:00 GMT",
                },
            ],
        },
        {
            id: 1,
            name: "Campeonato Tal de Tal",
            type: "Futebol",
            open: "Sat Dec 28 2023 15:00:00 GMT",
            close: "Sat Dec 28 2025 17:40:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Altano",
                    team2: "Time Beltrano",
                    point1: 0,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sat Dec 28 2023 15:00:00 GMT",
                    close: "Sat Dec 28 2025 16:10:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Ciclano",
                    team2: "Time Deltrano",
                    point1: 2,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sat Dec 28 2024 16:20:00 GMT",
                    close: "Sat Dec 28 2024 17:30:00 GMT",
                },
            ],
        },
        {
            id: 2,
            name: "Mundial de League of Legends",
            type: "League of Legends",
            open: "Sun Dec 29 2024 13:00:00 GMT",
            close: "Sun Dec 29 2024 19:00:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Tal",
                    team2: "Time Tel",
                    point1: 5,
                    point2: 3,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sun Dec 29 2024 13:00:00 GMT",
                    close: "Sun Dec 29 2024 14:20:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Til",
                    team2: "Time Tol",
                    point1: 8,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sun Dec 29 2024 14:30:00 GMT",
                    close: "Sun Dec 29 2024 15:50:00 GMT",
                },
                {
                    id: 3,
                    team1: "Time Tul",
                    team2: "Time Tal Tel",
                    point1: 6,
                    point2: 11,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sun Dec 29 2024 16:00:00 GMT",
                    close: "Sun Dec 29 2024 17:20:00 GMT",
                },
                {
                    id: 4,
                    team1: "Time Tal til",
                    team2: "Time Tal Tol",
                    point1: 4,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    open: "Sun Dec 29 2024 17:30:00 GMT",
                    close: "Sun Dec 29 2024 18:50:00 GMT",
                },
            ],
        },
    ];
    
    return(
        <div className="mt-28 mb-28">
            <HorizontalSlider title={"Campeonatos Individuais"} championships={championships}
                              color={SliderColors.light}/>

            <div className="flex flex-row justify-center items-center mt-16 mb-6">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>

            <div className="flex flex-row justify-center items-center mb-6">
                <h1 className="text-4xl">Vite + React</h1>
            </div>

            <div className="mt-8 flex flex-col justify-center items-center">
                <button className="w-3/4 lg:w-1/6 btn bg-navbar hover:bg-navbar-secondary-btn-base"
                        onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p className="text-nav-primary-btn mt-8">
                    Edit <code>src/App.tsx</code> and save to test HRM
                </p>
            </div>

            <p className="flex flex-row justify-center items-center read-the-docs mt-4">
                Click on the Vite and React logos to learn more
            </p>

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
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                    </svg>
                    <input type="text" className="grow" placeholder="Usuário" value={user}
                           onChange={e => setUser(e.target.value)}/>
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
                            clipRule="evenodd"/>
                    </svg>
                    <input type="password" className="grow" placeholder="Senha" value={password}
                           onChange={e => setPassword(e.target.value)}/>
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
        </div>
    )
}

export default ReactViteBase