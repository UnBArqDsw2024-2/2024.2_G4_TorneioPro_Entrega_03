import React from "react";
import {Pencil, Trash2} from "lucide-react";

interface PlayerListItemProps {
    player: ({
        id: number;
        name: string;
        email: string;
    })
    editFn: () => void;
    delFn: () => void;
}

const PlayerListItem: React.FC<PlayerListItemProps> = ({player, delFn, editFn}) => {
    return (
        <div key={player.id} className="p-4 m-2 rounded-lg bg-list-item-bg">
            <div
                className="flex flex-row md:justify-between justify-between items-middle">
                <div className="flex flex-row w-[30vw] gap-x-3">
                    <div className="avatar w-[4vw]">
                        <div className="ring-sidebar-body-bg w-14 rounded-full ring">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="Imagem do Usuário"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg truncate">{player.name}</p>
                        <p className="truncate opacity-70">{player.email}</p>
                    </div>
                </div>
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

export default PlayerListItem