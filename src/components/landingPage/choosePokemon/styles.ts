import styled from "styled-components";
import { isNull } from 'lodash';
import { PokemonInterface } from './index';

export const Container = styled.div`
`;

export const PokemonFormCardContentHeading = styled.h1`
  width: 100%;
  margin: 16px 0;
  text-align: center;
  font-variation-settings: 'wght' 600;
  font-size: 36px;
`;

export const PokemonFormCardSubContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 64px;
  margin-top: 48px;
`;


export const PokemonFormCardSubContentElem = styled.div<{ elemTheme: { light: string, dark: string }, isSelected: boolean }>`
  padding: 12px;
  border-radius: 8px;
  &:hover{
   cursor: pointer;
   background-color: ${p => p.elemTheme.light};
  }
  background-color: ${p => p.isSelected ? p.elemTheme.light: 'transparent'}; 
`;

export const PokemonFormCardSubContentElemHeading = styled.h2`
  text-align: center;
`;

export const PokemonFormCardSubContentElemImg = styled.img`
  width: 200px;
`;

export const ChooseButton = styled.button<{ selectedPokemon: PokemonInterface | null }>`
  display: block;
  width: 200px;
  height: 48px;
  background-color: ${p => p.selectedPokemon?.pokemonTheme.dark};
  margin: 42px auto 18px auto;
  border: none;
  color: ${p => p.theme.WHITE};
  font-size: 20px;
  border-radius: 8px;
  visibility: ${p => !isNull(p.selectedPokemon) ? 'visible': 'hidden'}; 
  cursor: pointer;
`;