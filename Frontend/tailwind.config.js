/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js,ts,jsx,tsx}"
    ],
    theme: {
        // CORES
        colors: {
            // ESPECIAIS
            transparent: "transparent",
            current: "currentColor",

            // FUNDO DO SITE
            "body-background": "#1E2734",
            "body-background-to": "#1E3234",

            // TEXTO
            "primary-text": "#FFFFFF",
            "secondary-text": "#000000",
            "primary-text-detail": "#DAE1E5",
            "accent-text": "#3483B0",
            formPlaceholderText: 'rgba(218, 225, 229, 0.65)',

            // NAVBAR
            "navbar": "#1D1D1D",
            "navbar-hover": "#2F2F2F",
            "navbar-primary-btn": {
                base: "#4E6278",
                hover: "#627B97",
            },
            "navbar-secondary-btn": {
                base: "#373737",
                hover: "#515151",
            },

            // SLIDER CAMPEONATOS ATIVOS E INDIVIDUAIS
            "slider-active": "#313F54",
            "slider-active-search": "#445774",
            "slider-active-live-badge": "#2C9F4C",

            // SLIDER CAMPEONATOS FUTUROS
            "slider-future": "#2B3545",
            "slider-future-search": "#3F4D64",
            "slider-occupation": "#1E2734",

            // CARD DE ESCOLHA DE PÁGINA
            "card-title-bg": "#2B3545",
            "card-bg": "#313F54",

            // MODAL SOLICITAÇÃO ENTRADA EM CAMPEONATO
            "modal-entry-title-bg": "#2B3545",
            "modal-entry-occupation": "#1E2734",
            "modal-entry-view-btn": {
                base: "#627B97",
                hover: "#8095AC",
            },
            "modal-entry-bg": "#313F54",
            "modal-entry-input": "#445774",

            // SIDEBAR
            "sidebar-body-bg": "#1E2734",
            "sidebar-title-bg": "#2B3545",
            "sidebar-bg": "#313F54",
            "sidebar-base-btn": {
                base: "#4E6278",
                hover: "#627B97",
            },
            "sidebar-active-btn": {
                base: "#3483B0",
                hover: "#4D9DCA",
            },

            // CARD - DASHBOARD
            "dashboard-card-title-bg": "#2B3545",
            "dashboard-card-bg": "#313F54",
            "dashboard-card-search": "#3F4D64",
            "dashboard-card-btn": {
                base: "#3483B0",
                hover: "#296689",
            },

            // ITEM DE LISTA - CAMPEONATO, TIME, JOGADOR, etc
            "list-item-bg": "#4E6278",
            "list-item-btn": {
                base: "#627B97",
                hover: "#8095AC",
            },
            "list-item-occupation": "#2B3545",
            "list-item-avatar-bg": "#3F4D64",

            // FORM-MODAIS
            "form-modal-bg": "#313F54",
            "form-modal-input": "#445774",
            "form-modal-check-input": "#627B97",

            // BOTÕES
            "primary-btn": {
                base: "#4E6278",
                hover: "#627B97",
            },
            "secondary-btn": {
                base: "#2C9F4C",
                hover: "#21783a",
            },
            "tertiary-btn": {
                base: "#CD3532",
                hover: "#D75D5B",
            },
            
            // A PARTIR DAQUI É LIGHT
            //
            //
            // FUNDO DO SITE
            "light-body-background": "#5d7aa2",
            "light-body-background-to": "#5d9ca2",

            // TEXTO
            "light-primary-text": "#000000",
            "light-secondary-text": "#FFFFFF",
            "light-primary-text-detail": "#20282d",
            "light-accent-text": "#9dc8e2",
            lightFormPlaceholderText: 'rgba(0, 0, 0, 0.65)',

            // NAVBAR
            "light-navbar": "#737373",
            "light-navbar-hover": "#808080",
            "light-navbar-primary-btn": {
                base: "#a2b2c3",
                hover: "#8498ae",
            },
            "light-navbar-secondary-btn": {
                base: "#8c8c8c",
                hover: "#737373",
            },

            // SLIDER CAMPEONATOS ATIVOS E INDIVIDUAIS
            "light-slider-active": "#7e94b4",
            "light-slider-active-search": "#9fafc6",
            "light-slider-active-live-badge": "#9be4b0",

            // SLIDER CAMPEONATOS FUTUROS
            "light-slider-future": "#7286a7",
            "light-slider-future-search": "#91a1ba",
            "light-slider-occupation": "#5d7aa2",

            // CARD DE ESCOLHA DE PÁGINA
            "light-card-title-bg": "#e0e4eb",
            "light-card-bg": "#7e94b4",

            // MODAL SOLICITAÇÃO ENTRADA EM CAMPEONATO
            "light-modal-entry-title-bg": "#7286a7",
            "light-modal-entry-occupation": "#5d7aa2",
            "light-modal-entry-view-btn": {
                base: "#c1cbd7",
                hover: "#a2b1c3",
            },
            "light-modal-entry-bg": "#7e94b4",
            "light-modal-entry-input": "#9fafc6",

            // SIDEBAR
            "light-sidebar-body-bg": "#5d7aa2",
            "light-sidebar-title-bg": "#7286a7",
            "light-sidebar-bg": "#7e94b4",
            "light-sidebar-base-btn": {
                base: "#a2b2c3",
                hover: "#8498ae",
            },
            "light-sidebar-active-btn": {
                base: "#b0d3e8",
                hover: "#89bedc",
            },

            // CARD - DASHBOARD
            "light-dashboard-card-title-bg": "#7286a7",
            "light-dashboard-card-bg": "#7e94b4",
            "light-dashboard-card-search": "#91a1ba",
            "light-dashboard-card-btn": {
                base: "#b0d3e8",
                hover: "#89bedc",
            },

            // ITEM DE LISTA - CAMPEONATO, TIME, JOGADOR, etc
            "light-list-item-bg": "#a2b2c3",
            "light-list-item-btn": {
                base: "#c1cbd7",
                hover: "#a2b1c3",
            },
            "light-list-item-occupation": "#7286a7",
            "light-list-item-avatar-bg": "#91a1ba",

            // FORM-MODAIS
            "light-form-modal-bg": "#7e94b4",
            "light-form-modal-input": "#9fafc6",
            "light-form-modal-check-input": "#c1cbd7",

            // BOTÕES
            "light-primary-btn": {
                base: "#a2b2c3",
                hover: "#8498ae",
            },
            "light-secondary-btn": {
                base: "#9be4b0",
                hover: "#73d990",
            },
            "light-tertiary-btn": {
                base: "#f0c2c1",
                hover: "#e69a98",
            },
        },
    },
    plugins: [
        require('daisyui'),
        require("tailwind-scrollbar"),
    ],
    daisyui: {
        themes: ["dim"],
    },
}