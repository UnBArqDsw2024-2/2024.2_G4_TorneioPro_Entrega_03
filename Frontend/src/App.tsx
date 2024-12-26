import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactViteBase from "./components/ReactViteBase.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<ReactViteBase />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
