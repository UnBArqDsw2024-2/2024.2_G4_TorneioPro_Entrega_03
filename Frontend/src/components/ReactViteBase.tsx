import viteLogo from "../../public/vite.svg";
import reactLogo from "../assets/react.svg";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom"; 

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
        const response = await login(user, password);
        
        if(!response.success) setMessage(response.message);
        else navigate("/dashboard");
    }
    
    return(
        <div className="mt-28 mb-28">
            <div className="flex flex-row justify-center items-center mb-6">
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
                   lang="pt-BR">Login Funcional utilizando AuthContext (salvando no LocalStorage), e utilizando o Backend.
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
                    Simular Login
                </button>

                <p className="text-lg text-secondary">{message}</p>

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