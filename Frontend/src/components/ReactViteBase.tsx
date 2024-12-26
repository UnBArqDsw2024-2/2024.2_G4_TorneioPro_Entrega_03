import viteLogo from "../../public/vite.svg";
import reactLogo from "../assets/react.svg";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.tsx"; 

function ReactViteBase(){
    const [count, setCount] = useState(0)
    const {login, logout} = useAuth();
    
    // SIMULANDO LOGIN E LOGOUT:
    const handleLogout = () => {
        logout();
    }
    const handleLogin = () => {
        login("admin", "123456");
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
                   lang="pt-BR">Login
                    Funcional utilizando AuthContext (e salvando no LocalStorage), porém, com dados estáticos, não
                    utilizando o Backend.
                </p>
                <button
                    onClick={() => handleLogin()}
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