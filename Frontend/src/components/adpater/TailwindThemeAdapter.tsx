export class TailwindThemeAdapter {
    private static darkMode = {
        transparent: "transparent",
        current: "currentColor",

        bodyBackground: "bg-body-background",
        bodyBackgroundTo: "bg-body-background-to",

        text: {
            primary: "text-primary-text",
            secondary: "text-secondary-text",
            detail: "text-primary-text-detail",
            accent: "text-accent-text",
            placeholder: "text-formPlaceholderText",
        },

        navbar: {
            base: "bg-navbar",
            hover: "hover:bg-navbar-hover",
            primaryBtn: {
                base: "bg-navbar-primary-btn-base",
                hover: "hover:bg-navbar-primary-btn-hover",
            },
            secondaryBtn: {
                base: "bg-navbar-secondary-btn-base",
                hover: "hover:bg-navbar-secondary-btn-hover",
            },
        },

        slider: {
            active: "bg-slider-active",
            activeSearch: "bg-slider-active-search",
            liveBadge: "bg-slider-active-live-badge",
            future: "bg-slider-future",
            futureSearch: "bg-slider-future-search",
            occupation: "bg-slider-occupation",
        },

        card: {
            titleBg: "bg-card-title-bg",
            bg: "bg-card-bg",
        },

        modal: {
            entryTitleBg: "bg-modal-entry-title-bg",
            entryOccupation: "bg-modal-entry-occupation",
            entryViewBtn: {
                base: "bg-modal-entry-view-btn-base",
                hover: "hover:bg-modal-entry-view-btn-hover",
            },
            entryBg: "bg-modal-entry-bg",
            entryInput: "bg-modal-entry-input",
        },

        sidebar: {
            bodyBg: "bg-sidebar-body-bg",
            titleBg: "bg-sidebar-title-bg",
            bg: "bg-sidebar-bg",
            baseBtn: {
                base: "bg-sidebar-base-btn-base",
                hover: "hover:bg-sidebar-base-btn-hover",
            },
            activeBtn: {
                base: "bg-sidebar-active-btn-base",
                hover: "hover:bg-sidebar-active-btn-hover",
            },
        },

        dashboardCard: {
            titleBg: "bg-dashboard-card-title-bg",
            bg: "bg-dashboard-card-bg",
            search: "bg-dashboard-card-search",
            btn: {
                base: "bg-dashboard-card-btn-base",
                hover: "hover:bg-dashboard-card-btn-hover",
            },
        },

        listItem: {
            bg: "bg-list-item-bg",
            btn: {
                base: "bg-list-item-btn-base",
                hover: "hover:bg-list-item-btn-hover",
            },
            occupation: "bg-list-item-occupation",
            avatarBg: "bg-list-item-avatar-bg",
        },

        formModal: {
            bg: "bg-form-modal-bg",
            input: "bg-form-modal-input",
            checkInput: "bg-form-modal-check-input",
        },

        buttons: {
            primary: {
                base: "bg-primary-btn-base",
                hover: "hover:bg-primary-btn-hover",
            },
            secondary: {
                base: "bg-secondary-btn-base",
                hover: "hover:bg-secondary-btn-hover",
            },
            tertiary: {
                base: "bg-tertiary-btn-base",
                hover: "hover:bg-tertiary-btn-hover",
            },
        },
    };

    private static lightMode = {
        transparent: "transparent",
        current: "currentColor",

        bodyBackground: "bg-light-body-background",
        bodyBackgroundTo: "bg-light-body-background-to",

        text: {
            primary: "text-light-primary-text",
            secondary: "text-light-secondary-text",
            detail: "text-light-primary-text-detail",
            accent: "text-light-accent-text",
            placeholder: "placeholder-lightFormPlaceholderText",
        },

        navbar: {
            base: "bg-light-navbar",
            hover: "hover:bg-light-navbar-hover",
            primaryBtn: {
                base: "bg-light-navbar-primary-btn-base",
                hover: "hover:bg-light-navbar-primary-btn-hover",
            },
            secondaryBtn: {
                base: "bg-light-navbar-secondary-btn-base",
                hover: "hover:bg-light-navbar-secondary-btn-hover",
            },
        },

        slider: {
            active: "bg-light-slider-active",
            activeSearch: "bg-light-slider-active-search",
            liveBadge: "bg-light-slider-active-live-badge",
            future: "bg-light-slider-future",
            futureSearch: "bg-light-slider-future-search",
            occupation: "bg-light-slider-occupation",
        },

        card: {
            titleBg: "bg-light-card-title-bg",
            bg: "bg-light-card-bg",
        },

        modal: {
            entryTitleBg: "bg-light-modal-entry-title-bg",
            entryOccupation: "bg-light-modal-entry-occupation",
            entryViewBtn: {
                base: "bg-light-modal-entry-view-btn-base",
                hover: "hover:bg-light-modal-entry-view-btn-hover",
            },
            entryBg: "bg-light-modal-entry-bg",
            entryInput: "bg-light-modal-entry-input",
        },

        sidebar: {
            bodyBg: "bg-light-sidebar-body-bg",
            titleBg: "bg-light-sidebar-title-bg",
            bg: "bg-light-sidebar-bg",
            baseBtn: {
                base: "bg-light-sidebar-base-btn-base",
                hover: "hover:bg-light-sidebar-base-btn-hover",
            },
            activeBtn: {
                base: "bg-light-sidebar-active-btn-base",
                hover: "hover:bg-light-sidebar-active-btn-hover",
            },
        },

        dashboardCard: {
            titleBg: "bg-light-dashboard-card-title-bg",
            bg: "bg-light-dashboard-card-bg",
            search: "bg-light-dashboard-card-search",
            btn: {
                base: "bg-light-dashboard-card-btn-base",
                hover: "hover:bg-light-dashboard-card-btn-hover",
            },
        },

        listItem: {
            bg: "bg-light-list-item-bg",
            btn: {
                base: "bg-light-list-item-btn-base",
                hover: "hover:bg-light-list-item-btn-hover",
            },
            occupation: "bg-light-list-item-occupation",
            avatarBg: "bg-light-list-item-avatar-bg",
        },

        formModal: {
            bg: "bg-light-form-modal-bg",
            input: "bg-light-form-modal-input",
            checkInput: "bg-light-form-modal-check-input",
        },

        buttons: {
            primary: {
                base: "bg-light-primary-btn-base",
                hover: "hover:bg-light-primary-btn-hover",
            },
            secondary: {
                base: "bg-light-secondary-btn-base",
                hover: "hover:bg-light-secondary-btn-hover",
            },
            tertiary: {
                base: "bg-light-tertiary-btn-base",
                hover: "hover:bg-light-tertiary-btn-hover",
            },
        },
    };

    private static currentTheme = localStorage.getItem('theme') || 'dark';

    static setTheme(theme: "light" | "dark") {
        localStorage.setItem('theme', theme);
    }

    static getTheme() {
        return localStorage.getItem('theme') || 'dark';
    }

    static getColors() {
        return this.currentTheme === "dark" ? this.darkMode : this.lightMode;
    }
}
