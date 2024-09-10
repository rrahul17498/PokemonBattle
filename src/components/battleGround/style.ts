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
  border: 1px solid ${p => p.theme.QUICK_SILVER};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const PokemonDetails = styled.div`
  border: 1px solid ${p => p.theme.QUICK_SILVER};
`;

export const AttackPanel = styled.ul`
  display: flex;
`;

export const TriggerAttack = styled.button`
  background-color: ${p => p.theme.BLACK};
  color: ${p => p.theme.WHITE};
`;



export const AttackSection = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 24px;
  border-radius: 4px;
`;

export const UserDetails = styled.div`
 border: 1px solid ${p => p.theme.QUICK_SILVER};
`;

export const UserName = styled.h1`
  text-align: center;
  margin: 12px 0;
`;

export const UserPokemons = styled.div`
  display: flex;
  padding: 12px;
`;

export const UserPokemon = styled.div`
`;

export const UserPokeball = styled.img`
  width: 42px;
  display: block;
  margin: auto;
`;

export const UserPokemonName = styled.h5`
  display: block;
  margin-top: 6px;
`;

export const OpponentSection = styled.div`
 border: 1px solid ${p => p.theme.QUICK_SILVER};
`;
