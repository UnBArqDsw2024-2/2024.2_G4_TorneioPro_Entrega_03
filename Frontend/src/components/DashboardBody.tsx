import React from "react";


interface Props {
    title: string;
}
const DashboardBody: React.FC<Props> = ({title}) => {
    return (
        <div className="bg-dashboard-card-bg shadow-lg rounded-[10px] lg:mt-20 lg:mx-3.5 mx-2.5">
            <div className="bg-dashboard-card-title-bg rounded-t-[10px]">
                <div className="flex flex-col justify-center items-center">
                    <p className="lg:my-2.5 my-1.5 lg:text-4xl text-xl text-primary-text-detail">{title}</p>
                </div>
            </div>
            <div className="flex flex-col h-[82vh]">
                <div className="flex lg:flex-row flex-col justify-between lg:mt-3 mt-2 lg:px-4 px-3 w-full">
                    <div className="flex flex-col lg:w-1/3 w-full">
                        <label className="input input-bordered flex items-center gap-4 bg-dashboard-card-search border-none lg:h-[50px] h-[40px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" 
                                 className="lucide lucide-search w-5 h-5 text-primary-text-detail">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.3-4.3"/>
                            </svg>
                            <input type="text" className="grow text-formPlaceholderText lg:text-lg text-base" placeholder={`Buscar ${title.toLowerCase()}...`} />
                        </label>
                    </div>
                    <div className="flex flex-row lg:mt-0 mt-4 lg:gap-x-6 gap-x-2">
                        {/* TODO só para testar como vai ficar os botões */}
                        <button
                            className="bg-dashboard-card-btn-base hover:bg-dashboard-card-btn-hover lg:h-[50px] h-[40px] lg:w-[14vw] w-[40vw] rounded-[10px] flex flex-row justify-start items-center px-3 lg:text-xl text-base">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="lucide lucide-circle-plus w-6 h-6 text-primary-text-detail lg:mr-2 mr-4">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M8 12h8"/>
                                <path d="M12 8v8"/>
                            </svg>
                            Bla bla bla
                        </button>
                    </div>
                </div>
                <div
                    className="lg:mt-4 mt-2 lg:px-4 px-3 overflow-y-auto whitespace-nowrap scroll-smooth scrollbar-thumb-navbar-secondary-btn-hover scrollbar-track-transparent scrollbar-thin snap-y snap-mandatory">
                    {/* TODO só para testar como vai ficar os cards */}
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                    <div className="h-[88px] w-full bg-secondary-btn-base rounded my-4 snap-center"></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardBody