import { useEffect, useRef, useState } from 'react';
import { isNull } from 'lodash';
import * as S from './style';
import Video from '../atoms/video';
import PokeballIcon from '../../assets/icons/pokeball_side_icon_1.png';
import CharmanderFlameThrower1 from '../../assets/videos/flamethrower_1.mov';
import CharmanderFlameThrower2 from '../../assets/videos/flamethrower_2.mov';
import CharmanderScratchAttack1 from '../../assets/videos/scratch_attack.mov';


const ATTACKS = [CharmanderFlameThrower1, CharmanderFlameThrower2, CharmanderScratchAttack1]

export default function BattleGround() {
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

                    </S.PokemonDetails>
                    <S.AttackPanel>
                      <li><S.TriggerAttack onClick={triggerAttack(0)}>Flame Thrower 1</S.TriggerAttack></li>
                      <li><S.TriggerAttack onClick={triggerAttack(1)}>Flame Thrower 2</S.TriggerAttack></li>
                      <li><S.TriggerAttack onClick={triggerAttack(2)}>Scratch Attack</S.TriggerAttack></li>
                    </S.AttackPanel>
                    <S.UserDetails>
                        <S.UserName>Rahul Radhakrishna</S.UserName>
                        <S.UserPokemons>
                            <S.UserPokemon>
                                <S.UserPokeball src={PokeballIcon} />
                                <S.UserPokemonName>Charmander</S.UserPokemonName>
                            </S.UserPokemon>
                        </S.UserPokemons>
                    </S.UserDetails>
                </S.UserSection>
                <S.AttackSection>
                   <Video
                    ref={videoRef}
                    src={!isNull(attackId) ? ATTACKS[attackId] : ""}
                    autoPlay={false}
                    hide={false}
                    onEnded={onAttackEnd}
                    />
                </S.AttackSection>
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