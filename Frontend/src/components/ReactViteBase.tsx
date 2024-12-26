import viteLogo from "../../public/vite.svg";
import reactLogo from "../assets/react.svg";
import {useState} from "react"; 

function ReactViteBase(){
    const [count, setCount] = useState(0)
    
    return(
        <div>
            <div className="flex flex-row justify-center items-center mb-6 mt-32">
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
                <button className="w-3/4 lg:w-1/6 btn bg-navbar hover:bg-navbar-secondary-btn-base" onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p className="text-nav-primary-btn mt-8">
                    Edit <code>src/App.tsx</code> and save to test HRM
                </p>
            </div>
            
            <p className="flex flex-row justify-center items-center read-the-docs mt-4">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default ReactViteBase