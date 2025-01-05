import React from "react";
import {Pencil, Trash2} from "lucide-react";

interface TeamListItemProps {
    team: ({
        id: number;
        name: string;
        description: string;
    })
    editFn: () => void;
    delFn: () => void;
}

const TeamListItem: React.FC<TeamListItemProps> = ({team, delFn, editFn}) => {
    return (
        <div key={team.id} className="p-4 m-2 rounded-lg bg-list-item-bg">
            <div
                className="flex flex-row justify-between items-middle">
                <div className="flex flex-row w-[30vw] gap-x-3">
                    <div className="flex flex-col">
                        <p className="text-lg truncate">{team.name}</p>
                    </div>
                </div>
                <div className="flex flex-col w-[15vw] self-start">
                    <p className="truncate">{team.description}</p>
                </div>
                {/*<div className="flex flex-col w-[10vw] gap-y-3">*/}
                {/*    <div className="flex flex-row justify-between items-center">*/}
                {/*        <LockOpen color="#2C9F4C" size={23}/>*/}
                {/*        <p className="text-lg">{startDateConverted}</p>*/}
                {/*    </div>*/}
                {/*    <div className="flex flex-row justify-between items-center">*/}
                {/*        <Lock color="#CD3532" size={25}/>*/}
                {/*        <p className="text-lg">{endDateConverted}</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="flex gap-4 flex-row self-center">
                    <button className="btn w-14 h-14 bg-list-item-btn-base hover:bg-list-item-btn-hover rounded"
                            onClick={editFn}>
                        <Pencil color="#1D1D1D" size={30}/>
                    </button>
                    <button className="btn w-14 h-14 bg-list-item-btn-base hover:bg-list-item-btn-hover rounded"
                            onClick={delFn}>
                        <Trash2 color="#7B2536" size={30}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TeamListItem