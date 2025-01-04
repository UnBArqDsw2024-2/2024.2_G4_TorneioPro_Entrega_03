import React, {useState} from "react";
import {DateConverter} from "../../util/date-util/DateConverter.tsx";

interface FutureCardProps {
    index: number;
    championship: string;
    id: number;
    closeDate: string;
    sport: string;
    capacity: number;
    participants?: any[];
}

const ChampionshipFutureCard: React.FC<FutureCardProps> = ({index, closeDate, championship, sport, capacity, participants}) => {
    const closeDateConverted = DateConverter(closeDate, true);
    
    const [occupation, setOccupation] = useState(0);

    if (participants && participants.length > 0) {
        setOccupation(participants.length);
    }

    return (
        <li key={index} className="inline-block lg:py-5 py-4 lg:w-[20vw] w-[70vw] bg-slider-future rounded-[10px] lg:mr-3 mr-1.5 lg:px-6 px-4 snap-center">
            <div className="flex flex-col justify-center text-start">
                <p className="text-primary-text lg:text-xl text-base overflow-clip text-ellipsis lg:mb-1.5 mb-0.5">{championship}</p>
                <p className="text-formPlaceholderText lg:text-lg text-sm lg:mb-1.5 mb-0.5">Inscrições até: {closeDateConverted}</p>
                <p className="text-formPlaceholderText lg:text-lg text-sm lg:mb-10 mb-6">{sport}</p>

                <div className="flex flex-col justify-center text-end w-full bg-slider-occupation rounded px-3 lg:pb-3 pb-2 lg:pt-2 pt-1.5">
                    <p className="text-primary-text lg:text-lg text-sm text-center lg:mb-3 mb-2">OCUPAÇÃO</p>
                    <div
                        className="flex flex-row justify-center items-center lg:gap-x-6 gap-x-3">
                        <p className="text-primary-text lg:text-4xl text-2xl">{occupation}</p>
                        <p className="text-primary-text lg:text-4xl text-2xl">|</p>
                        <p className="text-primary-text lg:text-4xl text-2xl">{capacity ?? 0}</p>
                    </div>
                </div>

                <div className="flex flex-col self-center justify-center items-center lg:mt-9 mt-7 lg:mb-4 mb-3">
                    <button
                        className="lg:px-4 px-3 py-1.5 bg-secondary-btn-base hover:bg-secondary-btn-hover text-center rounded-[1.3px] text-primary-text lg:text-base text-sm flex flex-col justify-center">
                        PEDIR PARA PARTICIPAR
                    </button>
                </div>
            </div>
        </li>
    )
}

export default ChampionshipFutureCard