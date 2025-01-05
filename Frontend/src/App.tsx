import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactViteBase from "./components/ReactViteBase.tsx";
import NavBar from "./components/NavBar.tsx";
import Championship from './pages/Championship.tsx';
import Team from './pages/Team.tsx';
import Players from './pages/Players.tsx';
import Dashboard from "./pages/Dashboard.tsx";
import Home from './pages/Home.tsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<ReactViteBase />}/>
                    <Route path='/dashboard' element={<Championship />}/>
                    <Route path='/time' element={<Team />}/>
                    <Route path='/players' element={<Players />}/>
                    <Route path='/dashboard/championships' element={<Championship />}/>
                    <Route path='/dashboard/teams' element={<Team />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
