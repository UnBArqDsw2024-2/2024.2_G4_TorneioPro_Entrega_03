// components/ButtonFactory.tsx
import React from "react";

type ButtonProps = {
    type: "sidebar" | "navbar";
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
};

const ButtonFactory: React.FC<ButtonProps> = ({
                                                  type,
                                                  label,
                                                  icon,
                                                  onClick,
                                                  isActive = false,
                                                  isDisabled = false,
                                              }) => {
    const baseClass =
        type === "sidebar"
            ? "w-full h-[60px] text-lg flex items-center pl-3 rounded"
            : "px-4 py-2 text-md rounded";

    const activeClass =
        type === "sidebar"
            ? "bg-sidebar-active-btn-base text-primary-text-detail"
            : "bg-navbar-secondary-btn-base text-primary-text-detail";

    const inactiveClass =
        type === "sidebar"
            ? "bg-sidebar-base-btn-base text-primary-text-detail"
            : "bg-navbar-primary-btn-base text-primary-text-detail";

    return (
        <button
            onClick={onClick}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass
            } hover:opacity-80 disabled:opacity-50`}
            disabled={isDisabled}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    );
};

export default ButtonFactory;
