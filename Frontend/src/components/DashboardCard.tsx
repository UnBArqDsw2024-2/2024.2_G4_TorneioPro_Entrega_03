interface CardComponentProps {
    title: string;
    qtd: number;
    image: string;
}

const CardComponent: React.FC<CardComponentProps> = ({title, qtd, image}) => {
    return (
        <div className="bg-sidebar-bg shadow-lg rounded-lg w-[364px] h-[311px] flex flex-col">
            {/* Título */}
            <div className="bg-sidebar-title-bg rounded-t-lg py-4 px-6 text-center">
                <p className="text-2xl lg:text-4xl font-semibold text-primary-text">
                    {title}
                </p>
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col items-center justify-center flex-grow gap-6 p-4">
                {/* Imagem */}
                <img
                    className="w-28 h-28 object-contain rounded-full shadow-md"
                    src={image}
                    alt="Ícone"
                />
                {/* Quantidade */}
                <p className="text-5xl lg:text-6xl font-bold text-primary-text">{qtd}</p>
            </div>
        </div>
    );
};

export default CardComponent;
