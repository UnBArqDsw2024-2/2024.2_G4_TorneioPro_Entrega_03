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
            "dashboard-card-search-btn": {
                base: "#3483B0",
                hover: "#4D9DCA",
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
                hover: "#37C75F",
            },
            "tertiary-btn": {
                base: "#CD3532",
                hover: "#D75D5B",
            },
        },
    },
    plugins: [
      require('daisyui'),
    ],
    daisyui: {
        themes: ["dim"],
    },
}