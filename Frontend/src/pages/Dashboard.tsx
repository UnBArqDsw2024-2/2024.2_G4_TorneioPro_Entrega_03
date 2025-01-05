import DashboardCard from "../components/DashboardCard.tsx";
import trophyIcon from "../assets/trophyImage.jpg";
import PlayerIcon from "../assets/player.png";
import CoachIcon from "../assets/coach.png";
import TeamIcon from "../assets/team.png";
import MatchIcon from "../assets/match.png";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../util/Constants.tsx";
import {useAuth} from "../context/AuthContext.tsx";

const Dashboard = () => {
    const {user} = useAuth();
    
    const [championshipsQntd, setChampionshipsQntd] = useState(0);
    const [trainersQntd, setTrainersQntd] = useState(0);
    const [matchQntd, setMatchQntd] = useState(0);
    const [teamQntd, setTeamQntd] = useState(0);
    const [playerQntd, setPlayerQntd] = useState(0);
    
    useEffect(() => {
        // Quantidade de Campeonatos
        axios.get(`${API_BASE_URL}/championships/list/`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            }
        }).then((response) => {
            setChampionshipsQntd(response.data.length)
        })

        // Quantidade de Treinadores
        axios.get(`${API_BASE_URL}/trainers/list/`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            }
        }).then((response) => {
            setTrainersQntd(response.data.length)
        })

        // Quantidade de Partidas
        axios.get(`${API_BASE_URL}/matches/list/`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            }
        }).then((response) => {
            setMatchQntd(response.data.length)
        })

        // Quantidade de Times
        axios.get(`${API_BASE_URL}/teams/list/`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            }
        }).then((response) => {
            setTeamQntd(response.data.length)
        })

        // Quantidade de Jogadores
        axios.get(`${API_BASE_URL}/players/list/`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            }
        }).then((response) => {
            setPlayerQntd(response.data.length)
        })
    }, [user?.token])
    
    return (
        <div className="grid grid-cols-4 gap-x-12 gap-y-14 mx-32">
            <Link to='/dashboard/championships'>
                <DashboardCard title="Campeonatos" qtd={championshipsQntd} image={trophyIcon}/>
            </Link>

            <Link to='/dashboard/trainers'>
                <DashboardCard title="Treinadores" qtd={trainersQntd} image={CoachIcon}/>
            </Link>

            <Link to='/dashboard/matchs'>
                <DashboardCard title="Partidas" qtd={matchQntd} image={MatchIcon}/>
            </Link>

            <Link to='/dashboard/teams'>
                <DashboardCard title="Times" qtd={teamQntd} image={TeamIcon}/>
            </Link>

            <Link to='/dashboard/players'>
                <DashboardCard title="Jogadores" qtd={playerQntd} image={PlayerIcon}/>
            </Link>
        </div>
    )
}

export default Dashboard