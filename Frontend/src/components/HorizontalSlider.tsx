import React, {useState} from "react";
import ChampionshipSliderCard from "./ChampionshipSliderCard.tsx";

export enum SliderColors {
    light,
    dark,
}

interface Props {
    // children: React.ReactNode,
    color: SliderColors,
    title: string,
    championships: ({
        id: number;
        name: string;
        type: string;
        open: string;
        close: string;
        matches: ({
            id: number;
            team1: string;
            team2: string;
            point1: number;
            point2: number;
            img1: string;
            img2: string;
            open: string;
            close: string
        })[]
    })[]
}

const HorizontalSlider: React.FC<Props> = ({color, title, championships}) => {
    let sliderBackgroundColor = (color == 0) ? "bg-slider-active" : "bg-slider-future";
    let sliderSearchColor = (color == 0) ? "bg-slider-active-search" : "bg-slider-future-search";

    const [selected, setSelected] = useState("");

    // TODO filtrar os campeonatos de acordo com o SELECT.
    // const handleSearch = useCallback((e) => {
    //     const search = e.target.value;
    //     if(search === '') {
    //         setFilteredAtividades(atividades);
    //     } else {
    //         const filtered = atividades.filter(atividade => {
    //             return atividade.nome.toLowerCase().includes(search.toLowerCase())
    //                 || atividade.enunciado.toLowerCase().includes(search.toLowerCase())
    //                 || formatDateTime(atividade.data_abertura).includes(search)
    //                 || formatDateTime(atividade.data_encerramento).includes(search);
    //         });
    //         setFilteredAtividades(filtered);
    //     }
    // });

    const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);
    }

    const uniqueSports = Array.from(new Set(championships.map((item: any) => item.type)));

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
                {championships.map((championship: any) => {
                    return (
                        championship.matches.map((partida: any) => {
                            // TODO ver como tirar isso daqui e generalizar.
                            return (
                                <ChampionshipSliderCard 
                                    championship={championship.name}
                                    index={parseInt(`${championship.id}${partida.id}`)}
                                    openDate={partida.open} closeDate={partida.close}
                                    team1={partida.team1} team2={partida.team2}
                                    point1={partida.point1} point2={partida.point2}
                                    img1={partida.img1} img2={partida.img2}
                                    sport={championship.type}
                                />
                            )
                        })
                    )
                })}
            </ul>
        </div>
    )
}

export default HorizontalSlider