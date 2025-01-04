import ChampionshipBracketCard from "../horizontal-slider/ChampionshipBracketCard";
import ChampionshipFutureCard from "../horizontal-slider/ChampionshipFutureCard";
import ChampionshipSliderCard from "../horizontal-slider/ChampionshipSliderCard";
import { SliderStrategy } from "../horizontal-slider/HorizontalSlider";

class CardFactory {
    static createCard(strategy: SliderStrategy, championship: any, partida: any) {
        switch (strategy) {
            case SliderStrategy.default:
                return (
                    <ChampionshipSliderCard
                        championship={championship.name}
                        index={parseInt(`${championship.id}${partida.id}`)}
                        openDate={partida.start_date}
                        closeDate={partida.end_date}
                        team1={partida.team1}
                        team2={partida.team2}
                        point1={partida.point1}
                        point2={partida.point2}
                        img1={partida.img1}
                        img2={partida.img2}
                        sport={championship.type}
                    />
                );

            case SliderStrategy.future:
                return (
                    <ChampionshipFutureCard
                        championship={championship.name}
                        id={championship.id}
                        index={parseInt(`${championship.id}${partida.id}`)}
                        closeDate={partida.end_date}
                        sport={championship.type}
                        participants={championship.participants}
                        capacity={5}
                    />
                );

            case SliderStrategy.bracket:
                return (
                    <ChampionshipBracketCard
                        championship={championship.name}
                        id={championship.id}
                        index={parseInt(`${championship.id}${partida.id}`)}
                        openDate={partida.start_date}
                        closeDate={partida.end_date}
                        sport={championship.type}
                        participants={championship.participants}
                        capacity={5}
                    />
                );

            default:
                throw new Error('Estratégia desconhecida');
        }
    }
}

export default CardFactory;