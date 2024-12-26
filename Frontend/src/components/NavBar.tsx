import {useAuth} from "../context/AuthContext.tsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";

const NavBar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [Aberto, setAberto] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const isActiveSidebarButton = (rota: string) => {
        return location.pathname === rota ? "w-full lg:h-[60px] h-[50px] lg:text-2xl text-lg bg-sidebar-active-btn-base hover:bg-sidebar-active-btn-hover text-primary-text-detail rounded flex flex-row justify-start lg:pl-5 pl-3 items-center" : "w-full lg:h-[60px] h-[50px] lg:text-2xl text-lg bg-sidebar-base-btn-base hover:bg-sidebar-base-btn-hover text-primary-text-detail rounded  flex flex-row justify-start lg:pl-5 pl-3 items-center";
    }
    
    const isDisabledSidebarButton = (rota: string) => {
        return location.pathname === rota;
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAberto(event.target.checked);
    };
    
    const handleSidebarButtonClick = (rota: string) => {
        setAberto(false);
        navigate(rota);
    }
    
    const handleLogout = () => {
        setAberto(false);
        logout();
    }
    
    return (
        <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" checked={Aberto} onChange={handleCheckboxChange} className="drawer-toggle"/>
            <div className="drawer-content">
                <nav className="navbar bg-navbar lg:h-[77px] h-[40px] p-0 min-h-0">
                    <div className="navbar-start">
                        <div className="lg:ml-6 ml-2">
                            {isAuthenticated ? (
                                <p className="link hover:bg-navbar-hover rounded-full lg:p-3 p-1 lg:h-[65px] h-[33px]" onClick={() => setAberto(!Aberto)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block lg:h-10 lg:w-10 h-6 w-6 stroke-current text-primary-text-detail">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </p>
                            ) : (
                                <></>
                            )}
                        </div>

                        <Link to="/" className="lg:ml-20 ml-4">
                            <svg className="lg:w-[202px] w-[106px] lg:h-[77px] h-[40px]" viewBox="0 0 202 77"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M32.3242 77H200.41L168.086 0H0L32.3242 77Z" fill="#AE4C1F"/>
                                <path d="M44.0171 77H187.09L155.082 0H11.8848L44.0171 77Z" fill="#D85F28"/>
                                <path d="M33.3242 0H201.41L169.086 77H1L33.3242 0Z" fill="#AE4C1F"/>
                                <path d="M45.0171 0H188.09L156.082 77H12.8848L45.0171 0Z" fill="#D85F28"/>
                                <path
                                    d="M40.8748 23.7V19.5H57.6598V23.7L53.7448 23.16V21.63H51.2248V30H47.3098V21.63H44.7898V23.16L40.8748 23.7ZM59.6055 30V19.5H75.1905V30H59.6055ZM63.5205 27.87H71.2755V21.63H63.5205V27.87ZM76.6943 27.66V25.335L78.9293 24.96V19.5H94.5143V24.66L89.9843 25.425L95.1293 30H89.7143L85.4393 26.19L82.8443 26.625V30H78.9293V27.285L76.6943 27.66ZM82.8443 24.27L90.5993 22.965V21.63H82.8443V24.27ZM97.2227 30V19.08L108.893 25.605V21.63H107.618V19.5H112.808V30H109.493L101.138 25.2V27.87H102.413V30H97.2227ZM114.312 21.63V19.5H132.147V23.37L128.232 22.83V21.63H120.477V23.685H126.852V25.815H120.477V27.87H128.232V26.67L132.147 26.13V30H116.562V21.63H114.312ZM133.34 21.63V19.5H139.49V30H135.575V21.63H133.34ZM142.486 30V19.5H158.071V30H142.486ZM146.401 27.87H154.156V21.63H146.401V27.87Z"
                                    fill="#DAE1E5"/>
                                <path
                                    d="M80.7188 52.688V48.92L84.2948 48.32V39.2H109.231V47.888L90.5588 51.032V56H84.2948V52.088L80.7188 52.688ZM90.5588 47.264L102.967 45.176V42.608H90.5588V47.264ZM110.672 46.4V43.28H117.968L119.192 44.48L120.392 43.28H132.512V48.56L126.512 47.96V46.4H119.672V56H113.672V46.4H110.672ZM135.402 56V43.28H157.122V56H135.402ZM141.402 52.88H151.122V46.4H141.402V52.88Z"
                                    fill="#DAE1E5"/>
                            </svg>
                        </Link>
                    </div>
                    <div className="navbar-center"></div>
                    <div className="navbar-end">
                        {isAuthenticated ? (
                            <div className="flex flex-row lg:mr-6 mr-2">
                                {/*TODO mudar rota.*/}
                                <Link to="/"
                                      className="bg-navbar-secondary-btn-base hover:bg-navbar-secondary-btn-hover text-primary-text-detail hover:text-primary-text lg:p-2 p-1.5 rounded">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        className="lg:h-9 lg:w-9 h-5 w-5 text-primary-text-detail"
                                    >
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                                        <path d="M16 7 A4 4 0 0 1 12 11 A4 4 0 0 1 8 7 A4 4 0 0 1 16 7 z"/>
                                    </svg>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-row lg:mr-6 mr-2">
                                {/*TODO mudar rota.*/}
                                <Link to="/"
                                      className="lg:mr-[20px] mr-[10px] lg:text-lg text-xs bg-navbar-primary-btn-base hover:bg-navbar-primary-btn-hover text-primary-text-detail hover:text-primary-text lg:px-3 lg:py-2 px-2 p-1 rounded-md">
                                    Criar Campeonato
                                </Link>

                                {/*TODO mudar rota.*/}
                                <Link to="/"
                                      className="lg:text-lg text-xs bg-navbar-secondary-btn-base hover:bg-navbar-secondary-btn-hover text-primary-text-detail hover:text-primary-text lg:px-3 lg:py-2 px-2 p-1 rounded-md">
                                    <div className="flex flex-row justify-between items-center">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            className="lg:h-5 lg:w-5 h-[10.5px] w-[10.5px] text-primary-text-detail lg:mr-3 mr-1"
                                        >
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                                            <path d="M16 7 A4 4 0 0 1 12 11 A4 4 0 0 1 8 7 A4 4 0 0 1 16 7 z"/>
                                        </svg>
                                        Entrar
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-sidebar-body-bg lg:mt-[77px] mt-[40px] h-fit lg:w-1/5 w-8/12 lg:p-3 p-1.5">
                    <div className="bg-sidebar-bg shadow-xl rounded-lg">
                        <div className="bg-sidebar-title-bg rounded-t-lg">
                            <div className="flex flex-col justify-center items-center">
                                <div className="avatar mt-3">
                                    <div className="ring-sidebar-body-bg lg:w-44 w-32 rounded-full ring">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                            alt="Imagem do Usuário"/>
                                    </div>
                                </div>
                                <p className="mt-5 lg:text-2xl text-lg text-primary-text-detail">{user?.name != null ? user.name : "Unknown"}</p>
                                <p className="mt-0.5 mb-3 lg:text-xl text-base text-accent-text">{user?.role == "organizer" ? "Organizador" : user?.role == "trainer" ? "Treinador" : user?.role == "player" ? "Jogador" : "Unknown"}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-y-2.5 p-2.5">
                            {/* TODO mudar rotas. */}
                            <button disabled={isDisabledSidebarButton("/")}
                                    onClick={() => handleSidebarButtonClick("/")}
                                    className={isActiveSidebarButton("/")}>
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    className="lg:h-7 lg:w-7 h-5 w-5 mr-5 text-primary-text-detail"
                                >
                                    <path
                                        d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"/>
                                </svg>
                                PÁGINA INICIAL
                            </button>
                            <button disabled={isDisabledSidebarButton("/dashboard")}
                                    onClick={() => handleSidebarButtonClick("/dashboard")}
                                    className={isActiveSidebarButton("/dashboard")}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="lg:h-7 lg:w-7 h-5 w-5 mr-5 text-primary-text-detail"
                                >
                                    <path d="M13 3v6h8V3m-8 18h8V11h-8M3 21h8v-6H3m0-2h8V3H3v10z"/>
                                </svg>
                                DASHBOARD
                            </button>
                            <button disabled={isDisabledSidebarButton("/dashboard/championships")}
                                    onClick={() => handleSidebarButtonClick("/dashboard/championships")}
                                    className={isActiveSidebarButton("/dashboard/championships")}>
                                <svg
                                    viewBox="0 0 900 1000"
                                    fill="currentColor"
                                    className="lg:h-7 lg:w-7 h-5 w-5 mr-5 text-primary-text-detail"
                                >
                                    <path
                                        d="M510 716v66c46.667 5.333 85.333 16 116 32s46 34.667 46 56c0 24-21.667 45-65 63s-95.667 27-157 27c-60 0-112-9-156-27s-66-39-66-63c0-21.333 15.333-40 46-56s70-26.667 118-32v-66c0-33.333-11-61.333-33-84s-59.667-52-113-88c-37.333-24-66.333-44.333-87-61s-45.667-40.667-75-72-50.667-67.333-64-108C6.667 262.333 0 216.667 0 166c0-9.333 3.667-17.333 11-24 7.333-6.667 15.667-10 25-10h172c32-61.333 112.667-92 242-92 130.667 0 212 30.667 244 92h170c9.333 0 17.667 3.333 25 10 7.333 6.667 11 14.667 11 24 0 50.667-6.667 96.333-20 137s-34.667 76.667-64 108-54.333 55.333-75 72-49.667 37-87 61c-52 34.667-89 63.667-111 87s-33 51.667-33 85m138-252c53.333-37.333 95.333-75.333 126-114s48.667-88 54-148H702c-4 105.333-22 192.667-54 262M450 100c-41.333 0-77.333 5-108 15s-52 20.667-64 32c-12 11.333-18 21-18 29 0 9.333 6 19.667 18 31 12 11.333 33.333 22 64 32s66.667 15 108 15 77.333-5 108-15 52-20.667 64-32c12-11.333 18-21.667 18-31 0-8-6-17.667-18-29-12-11.333-33.333-22-64-32s-66.667-15-108-15M72 202c5.333 60 23.333 109.333 54 148s72.667 76.667 126 114c-32-69.333-50-156.667-54-262H72"/>
                                </svg>
                                CAMPEONATOS
                            </button>
                            <button disabled={isDisabledSidebarButton("/dashboard/trainers")}
                                    onClick={() => handleSidebarButtonClick("/dashboard/trainers")}
                                    className={isActiveSidebarButton("/dashboard/trainers")}>
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    className="lg:h-7 lg:w-7 h-5 w-5 mr-5 text-primary-text-detail"
                                >
                                    <path
                                        d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"/>
                                </svg>
                                TREINADORES
                            </button>
                            <button disabled={isDisabledSidebarButton("/dashboard/players")}
                                    onClick={() => handleSidebarButtonClick("/dashboard/players")}
                                    className={isActiveSidebarButton("/dashboard/players")}>
                                <svg
                                    viewBox="0 0 448 512"
                                    fill="currentColor"
                                    className="lg:h-7 lg:w-7 h-5 w-5 mr-5 text-primary-text-detail"
                                >
                                    <path
                                        d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z"/>
                                </svg>
                                JOGADORES
                            </button>
                            <button disabled={isDisabledSidebarButton("/dashboard/teams")}
                                    onClick={() => handleSidebarButtonClick("/dashboard/teams")}
                                    className={isActiveSidebarButton("/dashboard/teams")}>
                                <svg
                                    viewBox="0 0 640 512"
                                    fill="currentColor"
                                    className="lg:h-7 lg:w-7 h-5 w-5 mr-5 text-primary-text-detail"
                                >
                                    <path
                                        d="M184 88c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56zM64 245.7c-10 11.2-16 26.1-16 42.3s6 31.1 16 42.3v-84.6zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32v-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416v-21.5c20-24.7 32-56.2 32-90.5 0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112 0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32zM568 88c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56zm8 157.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 160c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm-80 144c0 16.2 6 31 16 42.3v-84.6c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zm64 42.3c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-42.8c-37.8-18-64-56.5-64-101.2 0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z"/>
                                </svg>
                                TIMES
                            </button>
                            <button disabled={isDisabledSidebarButton("/dashboard/matchs")}
                                    onClick={() => handleSidebarButtonClick("/dashboard/matchs")}
                                    className={isActiveSidebarButton("/dashboard/matchs")}>
                                <svg
                                    data-name="Layer 1"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="lg:h-7 lg:w-7 h-5 w-5 mr-5 text-primary-text-detail"
                                >
                                    <path
                                        d="M21 18h-2v-3a1 1 0 00-1-1h-5v-2.71l1.13.59a1 1 0 001.45-1.05l-.4-2.37 1.72-1.69a1 1 0 00.26-1 1 1 0 00-.81-.68L14 4.72l-1.1-2.16a1 1 0 00-1.8 0L10 4.72l-2.39.35a1 1 0 00-.81.68 1 1 0 00.26 1l1.76 1.71-.4 2.37a1 1 0 001.45 1.05l1.13-.59V14H6a1 1 0 00-1 1v3H3a1 1 0 00-1 1v2a1 1 0 002 0v-1h4v1a1 1 0 002 0v-2a1 1 0 00-1-1H7v-2h10v2h-2a1 1 0 00-1 1v2a1 1 0 002 0v-1h4v1a1 1 0 002 0v-2a1 1 0 00-1-1zm-9-9.37a1 1 0 00-.47.12l-.8.42.15-.9a1 1 0 00-.29-.88l-.65-.64.9-.13a1 1 0 00.76-.54l.4-.82.4.82a1 1 0 00.76.54l.9.13-.65.64a1 1 0 00-.29.88l.15.9-.8-.42a1 1 0 00-.47-.12z"/>
                                </svg>
                                PARTIDAS
                            </button>
                            <div className="flex flex-row w-full gap-x-2.5">
                                {/* TODO aqui vai ser algum botão \o/ */}
                                <button disabled={true}
                                        onClick={() => handleSidebarButtonClick("/disabled")}
                                        className={isActiveSidebarButton("/disabled")}>
                                </button>
                                <button disabled={!isAuthenticated}
                                        onClick={() => handleLogout()}
                                        className={isActiveSidebarButton("/disabled")}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="lg:h-7 lg:w-7 h-5 w-5 mr-5 text-primary-text-detail"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path
                                            d="M4 18h2v2h12V4H6v2H4V3a1 1 0 011-1h14a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z"/>
                                    </svg>
                                    SAIR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar