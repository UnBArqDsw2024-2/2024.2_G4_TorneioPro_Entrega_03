import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from "./components/NavBar.tsx";
import Championship from './pages/Championship.tsx';
import Team from './pages/Team.tsx';
import Players from './pages/Players.tsx';
import Dashboard from "./pages/Dashboard.tsx";
import Home from './pages/Home.tsx';
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Routes>    
                    <Route path='/' element={<Home/>}/>
                    <Route path='/dashboard/players' element={<Players />}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/dashboard/championships' element={<Championship/>}/>
                    <Route path='/dashboard/teams' element={<Team/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
