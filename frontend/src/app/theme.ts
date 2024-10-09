import { css } from "styled-components";

// Name source: https://chir.ag/projects/name-that-color/
const colors = {
    BLACK: '#000000',
    LA_PALMA: '#119822',
    DODGER_BLUE: '#4D79FF',
    BRICK_RED_LIGHT: '#BE3144',
    PERI_WINKLE:'#bfcfff',
    BRICK_RED_EXTRA_LIGHT: '#EFC3C9',
    SUGARCANE: '#BAF7C2',
    SCORPION: '#606060',
    QUICK_SILVER: '#A6A6A6',
    WHITE: '#FFFFFF',
};

const commonStyles = {
  submitButton: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 48px;
    background-color: ${colors.BRICK_RED_LIGHT};
    margin: 42px auto 18px auto;
    border: none;
    color: ${colors.WHITE};
    font-size: 20px;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
  `,
};

const theme = {
  colors,
  commonStyles,
};

export default theme;