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

export const PokemonCardSubContentElemInteractive = styled(PokemonCardSubContentElem)<{ $elemTheme: { light: string, dark: string }, $isSelected: boolean}>`
  &:hover{
   cursor: pointer;
   background-color: ${p => p.$elemTheme.light};
  }
  background-color: ${p => p.$isSelected ? p.$elemTheme.light: 'transparent'}; 
`;

export const PokemonCardSubContentElemHeading = styled.h2`
  text-align: center;
`;

export const PokemonCardSubContentElemImg = styled.img`
  width: 200px;
`;

export const SubmitButton = styled.button`
  display: block;
  width: 200px;
  height: 48px;
  background-color: ${p => p.theme.BRICK_RED_LIGHT};
  margin: 42px auto 18px auto;
  border: none;
  color: ${p => p.theme.WHITE};
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
`;

export const ChooseButton = styled(SubmitButton)<{ $isPokemonSelected: boolean }>`
  visibility: ${p => p.$isPokemonSelected ? 'visible': 'hidden'}; 
`;


export const PokemonDetails = styled.div``;

export const PokemonDetailsHeading = styled.h4`
  margin: 16px 0 8px 0;
`;

export const PokemonType = styled.div<{ $colorTheme: { light: string, dark: string } | undefined }>`
  text-align: center;
  padding: 8px;
  border: 0.5px solid black;
  border-radius: 8px;
  color: ${p => p.theme.WHITE};
  background-color: ${p => p.$colorTheme?.dark || p.theme.BLACK};
  width: fit-content;
`;

export const AttackSection = styled.div`
  display: flex;
  gap: 12px;
`;

export const Attack = styled.div`
  padding: 8px;
  border: 0.5px solid black;
  border-radius: 8px;
  color: ${p => p.theme.WHITE};
  background-color: ${p => p.theme.BLACK};
`;

export const GoToBattle = styled(SubmitButton)`
`;