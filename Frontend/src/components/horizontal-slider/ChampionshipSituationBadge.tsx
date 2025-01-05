import React from "react";
import {IsLive} from "../../util/date-util/IsLive.tsx";
import {DateConverter} from "../../util/date-util/DateConverter.tsx";

interface Props {
    openDate: string;
    closeDate: string;
}

const ChampionshipSituationBadge: React.FC<Props> = ({openDate, closeDate}) => {
    const isLive = IsLive(openDate, closeDate);

    const openDateConverted = DateConverter(openDate, true);

    return (
        <div>
            {isLive ? (
                <div
                    className="lg:h-[4vh] h-[43h] lg:w-[7vw] w-[26vw] bg-secondary-btn-base text-center rounded text-primary-text lg:text-2xl text-lg flex flex-col justify-center">Ocorrendo</div>
            ) : (
                <div
                    className="lg:h-[4vh] h-[43h] text-center text-primary-text lg:text-2xl text-lg flex flex-col justify-center">{openDateConverted}</div>
            )}
        </div>
    )
}

export default ChampionshipSituationBadge