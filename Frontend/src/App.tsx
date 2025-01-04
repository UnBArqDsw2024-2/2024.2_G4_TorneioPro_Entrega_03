import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactViteBase from "./components/ReactViteBase.tsx";
import NavBar from "./components/NavBar.tsx";
import Championship from './pages/Championship.tsx';
import Team from './pages/Team.tsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<ReactViteBase />}/>
                    <Route path='/dashboard' element={<Championship />}/>
                    <Route path='/time' element={<Team />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
