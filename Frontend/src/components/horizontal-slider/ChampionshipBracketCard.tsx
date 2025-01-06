import React from "react";
import ChampionshipSituationBadge from "./ChampionshipSituationBadge.tsx";

interface BracketCardProps {
    index: number;
    championship: string;
    id: number;
    openDate: string;
    closeDate: string;
    sport: string;
    capacity: number;
    participants?: any[];
}

const ChampionshipBracketCard: React.FC<BracketCardProps> = ({index, openDate, closeDate, championship, sport}) => {
    return (
        <li
            key={index}
            className="inline-block p-5 lg:h-fit h-fit overflow-y-auto lg:w-[1500px] w-[250px] bg-slider-active rounded-[10px] lg:mr-3 mr-1.5 snap-center"
        >
            <div className="flex flex-col justify-center items-center mb-4">
                <ChampionshipSituationBadge openDate={openDate}
                                            closeDate={closeDate}/>

                <div className="flex flex-row justify-center items-center mt-8">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-2 bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-2 bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="31" height="35" viewBox="0 0 31 35" fill="none"
                                 className="absolute right-[-30px]"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-2.15675e-05 1.36116L16.3944 1.36062L16.3944 18.4353L16.3944 33.9353L-4.008e-07 33.9355"
                                    stroke="white" strokeWidth={1.5}/>
                                <line x1="31" y1="17.5" x2="17" y2="17.5" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-2 bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-2 bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="31" height="35" viewBox="0 0 31 35" fill="none"
                                 className="absolute right-[-30px]"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-2.15675e-05 1.36116L16.3944 1.36062L16.3944 18.4353L16.3944 33.9353L-4.008e-07 33.9355"
                                    stroke="white" strokeWidth={1.5}/>
                                <line x1="31" y1="17.5" x2="17" y2="17.5" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-2 bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-2 bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="31" height="35" viewBox="0 0 31 35" fill="none"
                                 className="absolute right-[-30px]"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-2.15675e-05 1.36116L16.3944 1.36062L16.3944 18.4353L16.3944 33.9353L-4.008e-07 33.9355"
                                    stroke="white" strokeWidth={1.5}/>
                                <line x1="31" y1="17.5" x2="17" y2="17.5" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-2 bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-2 bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="31" height="35" viewBox="0 0 31 35" fill="none"
                                 className="absolute right-[-30px]"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-2.15675e-05 1.36116L16.3944 1.36062L16.3944 18.4353L16.3944 33.9353L-4.008e-07 33.9355"
                                    stroke="white" strokeWidth={1.5}/>
                                <line x1="31" y1="17.5" x2="17" y2="17.5" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-[31px] ml-[30px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-[31px] ml-[30px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="30" height="105" viewBox="0 0 30 76" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[-29px]">
                                <path
                                    d="M0.499989 1.21281L14.9149 1.21287L14.9143 37.6488L14.9143 75.2129L0.5 75.2129"
                                    stroke="white" strokeWidth={1.5}/>
                                <path d="M29.5 37.1489H15.4207" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-[31px] ml-[30px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-[31px] ml-[30px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="30" height="105" viewBox="0 0 30 76" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[-29px]">
                                <path
                                    d="M0.499989 1.21281L14.9149 1.21287L14.9143 37.6488L14.9143 75.2129L0.5 75.2129"
                                    stroke="white" strokeWidth={1.5}/>
                                <path d="M29.5 37.1489H15.4207" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center relative">
                            <div
                                className="flex flex-row justify-between my-[80px] ml-[23px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-[80px] ml-[23px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="40" height="258" viewBox="0 0 31 148" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[-39px]">
                                <path
                                    d="M0.467216 1.1865L15.6028 1.18661L15.6022 72.8901L15.6022 146.814L0.467226 146.814"
                                    stroke="white" strokeWidth={1.5}/>
                                <path d="M31 72H16" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center relative">
                            <div
                                className="flex flex-row justify-between my-[80px] ml-[38px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="55" height="2" viewBox="0 0 55 2" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[-54px]">
                                <path d="M55 1L1.36234e-06 1" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center relative">
                            <div
                                className="flex flex-row justify-between my-[80px] ml-[38px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center relative">
                            <div
                                className="flex flex-row justify-between my-[80px] ml-[38px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-[80px] ml-[38px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="40" height="258" viewBox="0 0 31 148" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[113px]">
                                <path
                                    d="M30.5328 1.1865L15.3972 1.18661L15.3978 72.8901L15.3978 146.814L30.5328 146.814"
                                    stroke="white" strokeWidth={1.5}/>
                                <path d="M0 72H15" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-[31px] ml-[28px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-[31px] ml-[28px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="30" height="105" viewBox="0 0 30 76" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[113px]">
                                <path
                                    d="M29.5791 1.21281L15.1642 1.21287L15.1648 37.6488L15.1648 75.2129L29.5791 75.2129"
                                    stroke="white" strokeWidth={1.5}/>
                                <path d="M0.579102 37.1489H14.6584" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-[31px] ml-[28px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-[31px] ml-[28px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="30" height="105" viewBox="0 0 30 76" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[113px]">
                                <path
                                    d="M29.5791 1.21281L15.1642 1.21287L15.1648 37.6488L15.1648 75.2129L29.5791 75.2129"
                                    stroke="white" strokeWidth={1.5}/>
                                <path d="M0.579102 37.1489H14.6584" stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-2 ml-[29px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-2 ml-[29px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="31" height="35" viewBox="0 0 32 34" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[113px]">
                                <path d="M31.1922 0.925223L15.1924 0.925269L15.1924 18L15.1924 33.5L31.1922 33.5"
                                      stroke="white" strokeWidth={1.5}/>
                                <line y1="-0.5" x2="14" y2="-0.5" transform="matrix(1 0 0 -1 0.686523 17)"
                                      stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-2 ml-[29px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-2 ml-[29px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="31" height="35" viewBox="0 0 32 34" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[113px]">
                                <path d="M31.1922 0.925223L15.1924 0.925269L15.1924 18L15.1924 33.5L31.1922 33.5"
                                      stroke="white" strokeWidth={1.5}/>
                                <line y1="-0.5" x2="14" y2="-0.5" transform="matrix(1 0 0 -1 0.686523 17)"
                                      stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-2 ml-[29px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-2 ml-[29px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="31" height="35" viewBox="0 0 32 34" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[113px]">
                                <path d="M31.1922 0.925223L15.1924 0.925269L15.1924 18L15.1924 33.5L31.1922 33.5"
                                      stroke="white" strokeWidth={1.5}/>
                                <line y1="-0.5" x2="14" y2="-0.5" transform="matrix(1 0 0 -1 0.686523 17)"
                                      stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center relative mb-3">
                            <div
                                className="flex flex-row justify-between my-2 ml-[29px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <div
                                className="flex flex-row justify-between my-2 ml-[29px] bg-navbar-primary-btn-hover w-[114px] h-[23px] text-[13px] px-1 border">
                                <p className="">Time tal</p>
                                <p className="">0</p>
                            </div>
                            <svg width="31" height="35" viewBox="0 0 32 34" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="absolute right-[113px]">
                                <path d="M31.1922 0.925223L15.1924 0.925269L15.1924 18L15.1924 33.5L31.1922 33.5"
                                      stroke="white" strokeWidth={1.5}/>
                                <line y1="-0.5" x2="14" y2="-0.5" transform="matrix(1 0 0 -1 0.686523 17)"
                                      stroke="white" strokeWidth={1.5}/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col justify-center items-center mt-6 mb-1 lg:w-[15vw] w-[54vw] text-wrap">
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

export default ChampionshipBracketCard