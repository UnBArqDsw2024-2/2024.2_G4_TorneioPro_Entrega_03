import React, { useEffect, useState } from 'react';
import HorizontalSlider, { SliderColors, SliderStrategy } from '../components/horizontal-slider/HorizontalSlider';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../util/Constants';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const {user}=useAuth()
    const [championships, setChampionships] = useState([])
    const [championshipsIndividual, setChampionshipsIndividual] = useState([])
    const [championshipsFuture, setChampionshipsFuture] = useState([])
    useEffect (() =>{           
            axios.get(`${API_BASE_URL}/championships/list/`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            }).then((response):void => {
                console.log(response.data)
                setChampionships(response.data);
            });
    }, [user?.token])

    useEffect (() =>{
        axios.get(`${API_BASE_URL}/championships/list/`, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        }).then((response):void => {
            setChampionshipsIndividual(response.data);
        });
}, [user?.token])

useEffect (() =>{
    axios.get(`${API_BASE_URL}/championships/list/`, {
        headers: {
            Authorization: `Bearer ${user?.token}`
        }
    }).then((response):void => {
        setChampionshipsFuture(response.data);
    });
}, [user?.token])

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <HorizontalSlider
                title={"Campeonatos em Equipe"}
                championships={championships}
                color={SliderColors.light}
                strategy={SliderStrategy.default}
            />
            <HorizontalSlider
                title={"Campeonatos Individuais"}
                championships={[]}
                color={SliderColors.light}
                strategy={SliderStrategy.bracket}
            />
            <HorizontalSlider
                title={"Campeonatos Futuros"}
                championships={[]}
                color={SliderColors.dark}
                strategy={SliderStrategy.future}
            />
        </div>
    );
};

export default Home;
