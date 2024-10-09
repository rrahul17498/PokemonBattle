import { Fragment, useEffect, useRef, useState } from 'react';
import { isNull } from 'lodash';
import * as S from './style';
import Video from '../atoms/video';
import PokeballIcon from '../../assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '../../assets/icons/pokeball_open_1.png';
import STARTOFF_POKEMONS from '../landingPage/choosePokemon/startoffPokemons.json';
import { PokemonInterface } from '../landingPage/choosePokemon';

export const BattleGround = () => {

    const [selectedPokemon, setSelectedPokemon] = useState<PokemonInterface | null>(null);

    const [attackSrc, setAttackSrc] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const onChoose = (pokemonDetails: PokemonInterface) => () => {
        setSelectedPokemon(pokemonDetails.id == selectedPokemon?.id ? null : pokemonDetails);
    };

    const onTrigger = (attack_src: string) => () => {
        setAttackSrc(attack_src);
    };

    const onAttackEnd = () => {
        setAttackSrc(null);
    };

    useEffect(() => {
        console.log("attackID: ", attackSrc);
        if (!isNull(attackSrc) && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        } 
    },[attackSrc]);


    console.log("selectedPokemon: ", selectedPokemon?.id)
    return (
        <S.Main>
            <S.Section>
                <S.UserSection>
                    <S.PokemonDetails>
                        {selectedPokemon
                         ? <Fragment>
                            {isNull(attackSrc) ? <S.PokemonImage src={selectedPokemon?.image} /> : null}
                            <S.PokemonName>{selectedPokemon?.name || "Select your Pokemon"}</S.PokemonName>
                            <S.AttackHeading>Moves</S.AttackHeading>
                            <S.AttackPanel>
                                {selectedPokemon?.attacks.map((attack) => (
                                <li><S.TriggerAttack onClick={onTrigger(attack.src)}>{attack.name}</S.TriggerAttack></li>
                                ))}
                            </S.AttackPanel>
                           </Fragment>
                          : null}
                    </S.PokemonDetails>
                    <S.UserDetails>
                        <S.UserName>Rahul Radhakrishna</S.UserName>
                        <S.UserPokemons>
                            {
                                STARTOFF_POKEMONS.data.map((pokemon, i) => {
                                    const isPokemonSelected = pokemon.id == selectedPokemon?.id;
                                    return (
                                    <li key={`user_pokemon_${i}`}>
                                        <S.UserPokemon onClick={onChoose(pokemon)}>
                                            <S.UserPokeballIcon
                                            $isOpen={isPokemonSelected}
                                            src={isPokemonSelected ? PokeballOpenIcon : PokeballIcon}
                                            />
                                            <S.UserPokemonName>{pokemon.name}</S.UserPokemonName>
                                        </S.UserPokemon>
                                </li>
                                )})
                            }
                        </S.UserPokemons>
                    </S.UserDetails>
                </S.UserSection>
                <S.BattleArena>
                   <Video
                    ref={videoRef}
                    src={!isNull(attackSrc) ? attackSrc : ""}
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