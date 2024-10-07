import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100%;
`;

export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const PokemonDetails = styled.div`
`;

export const PokemonImage = styled.img`
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
  display: block;
  -moz-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  transform: scale(-1, 1);
`;

export const PokemonName = styled.h3`
  margin: 12px 0 0 0;
  padding: 12px;
  font-variation-settings: 'wght' 600;
`;

export const AttackHeading = styled.h4`
  padding: 0 12px;
`;

export const AttackPanel = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 12px 24px 12px;

  li {
    list-style-type: none;
  }
`;

export const TriggerAttack = styled.button`
  background-color: ${p => p.theme.colors.BLACK};
  color: ${p => p.theme.colors.WHITE};
  padding: 6px;
  border-radius: 4px;
  border: none;
  &:hover {
    cursor: pointer;

  }
`;



export const BattleArena = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 24px;
  border-radius: 4px;
  border: 1px solid ${p => p.theme.colors.QUICK_SILVER};
  background-color: ${p => p.theme.colors.BLACK};
`;

export const UserDetails = styled.div`
  padding-bottom: 12px;
`;

export const UserName = styled(PokemonName)`
  font-variation-settings: 'wght' 400;
`;

export const UserPokemons = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 12px;
  li {
    list-style-type: none;
  }
`;

export const UserPokemon = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

export const UserPokeballIcon = styled.img<{ $isOpen: boolean }>`
  width: ${p => p.$isOpen ? '52px' : '42px'};
  height: 48px;
  display: block;
  margin: auto;
  object-fit: contain;
`;

export const UserPokemonName = styled.h5`
  display: block;
  margin-top: 6px;
  width: 90px;
  text-align: center;
`;

export const OpponentSection = styled.div`
 border: 1px solid ${p => p.theme.colors.QUICK_SILVER};
`;
