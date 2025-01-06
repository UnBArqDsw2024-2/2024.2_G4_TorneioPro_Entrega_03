import HorizontalSlider, {SliderColors, SliderStrategy} from '../components/horizontal-slider/HorizontalSlider';
// import {useEffect, useState} from 'react';
// import axios from 'axios';
// import {API_BASE_URL} from '../util/Constants';
// import {useAuth} from '../context/AuthContext';

const Home = () => {
    // const {user} = useAuth()
    //
    // const [championshipsIndividual, setChampionshipsIndividual] = useState([])
    // const [championshipsFuture, setChampionshipsFuture] = useState([])

    // useEffect(() => {
    //     axios.get(`${API_BASE_URL}/championships/list/`, {
    //         headers: {
    //             Authorization: `Bearer ${user?.token}`
    //         }
    //     }).then((response): void => {
    //         console.log(response.data)
    //         setChampionships(response.data);
    //     });
    // }, [user?.token])
    //
    // useEffect(() => {
    //     axios.get(`${API_BASE_URL}/championships/list/`, {
    //         headers: {
    //             Authorization: `Bearer ${user?.token}`
    //         }
    //     }).then((response): void => {
    //         setChampionshipsIndividual(response.data);
    //     });
    // }, [user?.token])
    //
    // useEffect(() => {
    //     axios.get(`${API_BASE_URL}/championships/list/`, {
    //         headers: {
    //             Authorization: `Bearer ${user?.token}`
    //         }
    //     }).then((response): void => {
    //         setChampionshipsFuture(response.data);
    //     });
    // }, [user?.token])

    // TODO só para testar
    const mock_championships = [
        {
            id: 1,
            name: "Campeonato Tal de Tal",
            description: "Bla bla bla",
            championship_type: "sla",
            teams: [],
            type: "Futebol",
            start_date: "Sat Dec 28 2023 15:00:00 GMT",
            end_date: "Sat Dec 28 2025 17:40:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Altano",
                    team2: "Time Beltrano",
                    point1: 0,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sat Dec 28 2023 15:00:00 GMT",
                    end_date: "Sat Dec 28 2025 16:10:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Ciclano",
                    team2: "Time Deltrano",
                    point1: 2,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sat Dec 28 2024 16:20:00 GMT",
                    end_date: "Sat Dec 28 2024 17:30:00 GMT",
                },
            ],
        },
        {
            id: 2,
            name: "Mundial de League of Legends",
            description: "Bla bla bla",
            championship_type: "sla",
            teams: [],
            type: "League of Legends",
            start_date: "Sun Dec 29 2024 13:00:00 GMT",
            end_date: "Sun Dec 29 2024 19:00:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Tal",
                    team2: "Time Tel",
                    point1: 5,
                    point2: 3,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 13:00:00 GMT",
                    end_date: "Sun Dec 29 2024 14:20:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Til",
                    team2: "Time Tol",
                    point1: 8,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 14:30:00 GMT",
                    end_date: "Sun Dec 29 2024 15:50:00 GMT",
                },
                {
                    id: 3,
                    team1: "Time Tul",
                    team2: "Time Tal Tel",
                    point1: 6,
                    point2: 11,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 16:00:00 GMT",
                    end_date: "Sun Dec 29 2024 17:20:00 GMT",
                },
                {
                    id: 4,
                    team1: "Time Tal til",
                    team2: "Time Tal Tol",
                    point1: 4,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 17:30:00 GMT",
                    end_date: "Sun Dec 29 2024 18:50:00 GMT",
                },
            ],
        },
        {
            id: 1,
            name: "Campeonato Tal de Basquete",
            description: "Bla bla bla",
            championship_type: "sla",
            teams: [],
            type: "Basquete",
            start_date: "Sat Dec 28 2023 15:00:00 GMT",
            end_date: "Sat Dec 28 2025 17:40:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Altano",
                    team2: "Time Beltrano",
                    point1: 0,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sat Dec 28 2023 15:00:00 GMT",
                    end_date: "Sat Dec 28 2025 16:10:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Ciclano",
                    team2: "Time Deltrano",
                    point1: 2,
                    point2: 1,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sat Dec 28 2024 16:20:00 GMT",
                    end_date: "Sat Dec 28 2024 17:30:00 GMT",
                },
            ],
        },
        {
            id: 2,
            name: "Mundial de CS GO",
            description: "Bla bla bla",
            championship_type: "sla",
            teams: [],
            type: "Counter-Strike: Global Offensive",
            start_date: "Sun Dec 29 2024 13:00:00 GMT",
            end_date: "Sun Dec 29 2024 19:00:00 GMT",
            matches: [
                {
                    id: 1,
                    team1: "Time Tal",
                    team2: "Time Tel",
                    point1: 5,
                    point2: 3,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 13:00:00 GMT",
                    end_date: "Sun Dec 29 2024 14:20:00 GMT",
                },
                {
                    id: 2,
                    team1: "Time Til",
                    team2: "Time Tol",
                    point1: 8,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 14:30:00 GMT",
                    end_date: "Sun Dec 29 2024 15:50:00 GMT",
                },
                {
                    id: 3,
                    team1: "Time Tul",
                    team2: "Time Tal Tel",
                    point1: 6,
                    point2: 11,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 16:00:00 GMT",
                    end_date: "Sun Dec 29 2024 17:20:00 GMT",
                },
                {
                    id: 4,
                    team1: "Time Tal til",
                    team2: "Time Tal Tol",
                    point1: 4,
                    point2: 4,
                    img1: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    img2: "https://cdn-icons-png.flaticon.com/512/4793/4793141.png",
                    start_date: "Sun Dec 29 2024 17:30:00 GMT",
                    end_date: "Sun Dec 29 2024 18:50:00 GMT",
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 mt-32 mb-10 flex flex-col gap-y-10">
            <HorizontalSlider
                title={"Campeonatos em Equipe"}
                championships={mock_championships}
                color={SliderColors.light}
                strategy={SliderStrategy.default}
            />
            <HorizontalSlider
                title={"Campeonatos Individuais"}
                championships={mock_championships}
                color={SliderColors.light}
                strategy={SliderStrategy.bracket}
            />
            <HorizontalSlider
                title={"Campeonatos Futuros"}
                championships={mock_championships}
                color={SliderColors.dark}
                strategy={SliderStrategy.future}
            />
        </div>
    );
};

export default Home;
