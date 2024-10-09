import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LandingFormCard = styled.div`
  border: 1px solid ${p => p.theme.colors.QUICK_SILVER};
  width: 1000px;
  padding: 24px;
  border-radius: 4px;
`;

export const LandingFormCardContent = styled.div`
 width: 100%;
`;