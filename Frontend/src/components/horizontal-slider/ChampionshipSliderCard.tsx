import ChampionshipSituationBadge from "./ChampionshipSituationBadge.tsx";
import React from "react";

interface SliderCardProps {
    index: number;
    openDate: string;
    closeDate: string;
    team1: string;
    team2: string;
    point1: number;
    point2: number;
    img1: string;
    img2: string;
    championship: string;
    sport: string;
}

const ChampionshipSliderCard: React.FC<SliderCardProps> = ({index, openDate, closeDate, team1, team2, point1, point2, img1, img2, championship, sport}) => {
    return (
        <li key={index} className="inline-block p-4 lg:w-[18vw] w-[66vw] bg-slider-active rounded-[10px] lg:mr-3 mr-1.5 snap-center">
            <div className="flex flex-col justify-center items-center">
                <ChampionshipSituationBadge openDate={openDate}
                                            closeDate={closeDate}/>
                <div
                    className="flex flex-row justify-between items-center lg:mt-10 mt-8 lg:gap-x-6 gap-x-3 lg:w-[15vw] w-[54vw]">
                    <div
                        className="text-center text-primary-text lg:text-xl text-base flex flex-row justify-start items-center">
                        <img src={img1}
                             className="lg:w-10 w-8 lg:mr-2.5 mr-1.5"
                             alt={team1}/>
                        {team1}
                    </div>
                    <div
                        className="text-center text-primary-text lg:text-3xl text-2xl flex flex-col justify-start items-center mr-2">{point1}
                    </div>
                </div>
                <div
                    className="flex flex-row justify-between items-center lg:mt-5 mt-4 lg:gap-x-6 gap-x-3 lg:w-[15vw] w-[54vw]">
                    <div
                        className="text-center text-primary-text lg:text-xl text-base flex flex-row justify-start items-center">
                        <img src={img2}
                             className="lg:w-10 w-8 lg:mr-2.5 mr-1.5"
                             alt={team2}/>
                        {team2}
                    </div>
                    <div
                        className="text-center text-primary-text lg:text-3xl text-2xl flex flex-col justify-start items-center mr-2">{point2}
                    </div>
                </div>
                <div
                    className="flex flex-col justify-center items-center mt-8 mb-1 lg:w-[15vw] w-[54vw] text-wrap">
                    <div
                        className="text-center text-primary-text-detail lg:text-base text-sm flex flex-row justify-start items-center">{championship}
                    </div>
                    <div
                        className="text-center text-formPlaceholderText lg:text-base text-sm flex flex-row justify-start items-center">{sport}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ChampionshipSliderCard