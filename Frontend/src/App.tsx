import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactViteBase from "./components/ReactViteBase.tsx";
import './App.css'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ReactViteBase />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
