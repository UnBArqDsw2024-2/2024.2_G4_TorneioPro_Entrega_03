// adapters/TailwindThemeAdapter.ts

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
            placeholder: "placeholder-formPlaceholderText",
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

        bodyBackground: "bg-white",
        bodyBackgroundTo: "bg-gray-100",

        text: {
            primary: "text-gray-900",
            secondary: "text-gray-700",
            detail: "text-gray-600",
            accent: "text-blue-600",
            placeholder: "placeholder-gray-400",
        },

        navbar: {
            base: "bg-gray-200",
            hover: "hover:bg-gray-300",
            primaryBtn: {
                base: "bg-blue-500",
                hover: "hover:bg-blue-600",
            },
            secondaryBtn: {
                base: "bg-gray-400",
                hover: "hover:bg-gray-500",
            },
        },

        slider: {
            active: "bg-gray-300",
            activeSearch: "bg-gray-400",
            liveBadge: "bg-green-500",
            future: "bg-gray-200",
            futureSearch: "bg-gray-300",
            occupation: "bg-gray-100",
        },

        card: {
            titleBg: "bg-gray-200",
            bg: "bg-white",
        },

        modal: {
            entryTitleBg: "bg-gray-200",
            entryOccupation: "bg-gray-100",
            entryViewBtn: {
                base: "bg-blue-500",
                hover: "hover:bg-blue-600",
            },
            entryBg: "bg-white",
            entryInput: "bg-gray-300",
        },

        sidebar: {
            bodyBg: "bg-gray-100",
            titleBg: "bg-gray-200",
            bg: "bg-white",
            baseBtn: {
                base: "bg-blue-500",
                hover: "hover:bg-blue-600",
            },
            activeBtn: {
                base: "bg-blue-400",
                hover: "hover:bg-blue-500",
            },
        },

        dashboardCard: {
            titleBg: "bg-gray-200",
            bg: "bg-white",
            search: "bg-gray-300",
            btn: {
                base: "bg-blue-500",
                hover: "hover:bg-blue-600",
            },
        },

        listItem: {
            bg: "bg-gray-300",
            btn: {
                base: "bg-blue-500",
                hover: "hover:bg-blue-600",
            },
            occupation: "bg-gray-200",
            avatarBg: "bg-gray-300",
        },

        formModal: {
            bg: "bg-white",
            input: "bg-gray-300",
            checkInput: "bg-blue-500",
        },

        buttons: {
            primary: {
                base: "bg-blue-500",
                hover: "hover:bg-blue-600",
            },
            secondary: {
                base: "bg-green-500",
                hover: "hover:bg-green-600",
            },
            tertiary: {
                base: "bg-red-500",
                hover: "hover:bg-red-600",
            },
        },
    };

    private static currentTheme = "dark";

    static setTheme(theme: "light" | "dark") {
        this.currentTheme = theme;
    }

    static getColors() {
        return this.currentTheme === "dark" ? this.darkMode : this.lightMode;
    }
}
