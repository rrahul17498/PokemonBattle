
import styled from "styled-components";

export const BaseVideo = styled.video<{ $hide: boolean }>`
  width: 600px;
  height: 600px;
  visibility: ${p => p.$hide ? 'hidden' : 'visible'}
   transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg); /* Safari and Chrome */
    -moz-transform:rotateY(180deg);
`;


