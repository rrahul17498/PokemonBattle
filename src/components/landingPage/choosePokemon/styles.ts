import styled from "styled-components";

export const Container = styled.div`
`;

export const PokemonCardContentHeading = styled.h1`
  width: 100%;
  margin: 16px 0;
  text-align: center;
  font-variation-settings: 'wght' 600;
  font-size: 36px;
`;

export const PokemonCardSubContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 64px;
  margin-top: 48px;
`;

export const PokemonCardSubContentElem = styled.div`
  padding: 12px;
  border-radius: 8px;
`;

export const PokemonCardSubContentElemInteractive = styled(PokemonCardSubContentElem)<{ elemTheme: { light: string, dark: string }, isSelected: boolean, default: boolean}>`
  &:hover{
   cursor: pointer;
   background-color: ${p => p.elemTheme.light};
  }
  background-color: ${p => p.isSelected ? p.elemTheme.light: 'transparent'}; 
`;

export const PokemonCardSubContentElemHeading = styled.h2`
  text-align: center;
`;

export const PokemonCardSubContentElemImg = styled.img`
  width: 200px;
`;

export const ChooseButton = styled.button<{ isPokemonSelected: boolean }>`
  display: block;
  width: 200px;
  height: 48px;
  background-color: ${p => p.theme.BRICK_RED_LIGHT};
  margin: 42px auto 18px auto;
  border: none;
  color: ${p => p.theme.WHITE};
  font-size: 20px;
  border-radius: 8px;
  visibility: ${p => p.isPokemonSelected ? 'visible': 'hidden'}; 
  cursor: pointer;
`;


export const AttackSection = styled.div``;

export const Attack = styled.div``;