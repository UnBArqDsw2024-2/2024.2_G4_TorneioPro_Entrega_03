import React, { useState } from "react";
import CardFactory from "../factories/HorizontalSliderCardFactory";

export enum SliderColors {
    light,
    dark,
}

export enum SliderStrategy {
    default,
    future,
    bracket,
}

interface Props {
    color: SliderColors,
    title: string,
    strategy: SliderStrategy,
    championships: ({
        id: number;
        name: string;
        description: string;
        championship_type: string;
        type: string;
        start_date: string;
        end_date: string;
        teams?: any[];
        players?: any[];
        matches: ({
            id: number;
            team1: string;
            team2: string;
            point1: number;
            point2: number;
            img1: string;
            img2: string;
            start_date: string;
            end_date: string;
        })[]
    })[]
}

const HorizontalSlider: React.FC<Props> = ({ color, title, championships, strategy }) => {
    let sliderBackgroundColor = (color == 0) ? "bg-slider-active" : "bg-slider-future";
    let sliderSearchColor = (color == 0) ? "bg-slider-active-search" : "bg-slider-future-search";

    const uniqueSports = Array.from(new Set(championships.map((item: any) => item.type)));

    const [selected, setSelected] = useState("");
    const [filteredChampionships, setFilteredChampionships] = useState(championships);

    const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);

        const search = (event.target.value).toLowerCase();
        if (search === "") {
            setFilteredChampionships(championships);
        } else {
            const filtered = championships.filter(championship => {
                return championship.type.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredChampionships(filtered);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div
                className={`flex flex-row justify-end items-center ${sliderBackgroundColor} lg:h-[50px] h-[45px] w-full relative`}>
                <p className="text-primary-text lg:text-2xl text-lg absolute lg:inset-0 left-0 lg:ml-auto ml-2 lg:flex lg:justify-center lg:items-center">{title}</p>
                <select value={selected} onChange={handleSelected}
                    className={`select lg:w-[14%] w-[38%] lg:h-[35px] h-[30px] lg:text-sm text-xs min-h-0 focus:outline-none border-0 ${sliderSearchColor} rounded absolute right-0 lg:pl-4 pl-2 lg:mr-2.5 mr-1.5`}>
                    <option value={""} className="text-formPlaceholderText">Todos Esportes</option>
                    {uniqueSports.length > 0 ? (
                        uniqueSports.map((item: any, index: number) => {
                            return (
                                <option key={index} value={item} className="text-primary-text-detail">{item}</option>
                            )
                        })) : (
                        <></>
                    )}
                </select>
            </div>
            <ul className="list-none w-[100vw] lg:px-3 lg:pt-3 lg:pb-1 p-1.5 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-thumb-navbar-secondary-btn-hover scrollbar-track-transparent scrollbar-thin snap-x snap-mandatory">
                {filteredChampionships.length != 0 ? filteredChampionships.map((championship: any) => {
                    return (
                        championship.matches.map((partida: any) => {
                            return (CardFactory.createCard(strategy, championship, partida))
                        })
                    )
                }) : (
                    <li key={0}
                        className="mt-1 flex flex-col justify-center items-center w-[95vw] justify-self-center bg-transparent rounded-[10px] border-2 border-primary-btn-base">
                        <div className="flex flex-col justify-center lg:h-[30vh] h-[25vh] text-primary-btn-hover lg:text-3xl text-xl">
                            <p>Nenhum campeonato no momento...</p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default HorizontalSlider