import viteLogo from "../../public/vite.svg";
import reactLogo from "../assets/react.svg";
import {useState} from "react"; 

function ReactViteBase(){
    const [count, setCount] = useState(0)
    
    return(
        <div>
            <div className="flex flex-row justify-center items-center mb-6">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            
            <h1>Vite + React</h1>
            
            <div className="mt-8">
                <button className="w-2/3" onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p className="text-nav-primary-btn mt-8">
                    Edit <code>src/App.tsx</code> and save to test HRM
                </p>
            </div>
            
            <p className="read-the-docs mt-4">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default ReactViteBase