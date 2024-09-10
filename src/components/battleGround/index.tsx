import { useEffect, useRef, useState } from 'react';
import { isNull } from 'lodash';
import * as S from './style';
import Video from '../atoms/video';
import PokeballIcon from '../../assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '../../assets/icons/pokeball_open_1.png';
import CharmanderImage from '../../assets/images/Charmander.png';
import CharmanderFlameThrower1 from '../../assets/videos/flamethrower_1.mov';
import CharmanderFlameThrower2 from '../../assets/videos/flamethrower_2.mov';
import CharmanderScratchAttack1 from '../../assets/videos/scratch_attack.mov';


const ATTACKS = [CharmanderFlameThrower1, CharmanderFlameThrower2, CharmanderScratchAttack1]

export default function BattleGround() {

    const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);

    const [attackId, setAttackId] = useState<number | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const triggerAttack = (id: number) => () => {
        setAttackId(id);
    };

    const onAttackEnd = () => {
        setAttackId(null);
    };

    useEffect(() => {
        console.log("attackID: ", attackId);
        if (!isNull(attackId) && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        } 
    },[attackId]);



    return (
        <S.Main>
            <S.Section>
                <S.UserSection>
                    <S.PokemonDetails>
                        <S.PokemonImage src={CharmanderImage} />
                        <S.PokemonName>Charmander</S.PokemonName>
                        <S.AttackHeading>Moves</S.AttackHeading>
                        <S.AttackPanel>
                        <li><S.TriggerAttack onClick={triggerAttack(0)}>Flame Thrower 1</S.TriggerAttack></li>
                        <li><S.TriggerAttack onClick={triggerAttack(1)}>Flame Thrower 2</S.TriggerAttack></li>
                        <li><S.TriggerAttack onClick={triggerAttack(2)}>Scratch Attack</S.TriggerAttack></li>
                        </S.AttackPanel>
                    </S.PokemonDetails>
                    <S.UserDetails>
                        <S.UserName>Rahul Radhakrishna</S.UserName>
                        <S.UserPokemons>
                            <S.UserPokemon>
                                <S.UserPokeballIcon $isOpen={true} src={PokeballOpenIcon} />
                                <S.UserPokemonName>Charmander</S.UserPokemonName>
                            </S.UserPokemon>
                            <S.UserPokemon>
                                <S.UserPokeballIcon $isOpen={false} src={PokeballIcon} />
                                <S.UserPokemonName>Bulbasaur</S.UserPokemonName>
                            </S.UserPokemon>
                        </S.UserPokemons>
                    </S.UserDetails>
                </S.UserSection>
                <S.BattleArena>
                   <Video
                    ref={videoRef}
                    src={!isNull(attackId) ? ATTACKS[attackId] : ""}
                    autoPlay={false}
                    hide={false}
                    onEnded={onAttackEnd}
                    />
                </S.BattleArena>
                <S.OpponentSection>
                    <S.PokemonDetails>

                    </S.PokemonDetails>
                    <S.AttackPanel>
                        
                    </S.AttackPanel>
                </S.OpponentSection>
            </S.Section>
        </S.Main>
    );
}