import { css } from 'styled-components';

export interface DeviceProps {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface HeightProps {
  header: { mobile: number; tablet: number; desktop: number };
}

const deviceSizes: DeviceProps = {
  mobile: 767,
  tablet: 991,
  desktop: 992,
};

const heightSizes: HeightProps = {
  header: { mobile: 56, tablet: 60, desktop: 60 },
};

const mediaQuery = {
  mobile: `@media only screen and (max-width: ${deviceSizes.mobile}px)`,
  tablet: `@media only screen and (max-width: ${deviceSizes.tablet}px) and (min-width: ${
    deviceSizes.mobile + 1
  }px)`,
  desktop: `@media only screen and (max-width: ${deviceSizes.desktop}px)`,
};

const color = {
  static: {
    dark: '#000000',
    light: '#FFFFFF',
  },
  primary: {
    normal: '#00A1FF',
    string: '#00A1FF',
    heavy: '#0080DB',
  },
  accent: {
    brilliantRose: '#FF4FAE',
    springGreen: '#18C96B',
  },
  label: {
    normal: '#171719',
    string: '#000000',
    alternative: '#37383C9C',
    assistive: '#37383C47',
    disable: '#37383C29',
  },
  background: {
    normal: '#FFFFFF',
    alternative: '#F6F7F8',
  },
  line: {
    normalOpacity: { normal: '#70737C38', neutral: '#70737C29', alternative: '#70737C14' },
    solid: {
      normal: '#E0E0E2',
      neutral: '#E8E8EA',
      alternative: '#F4F4F5',
    },
  },
  status: {
    positive: '#00BF40',
    cautionary: '#FFA826',
    destructive: '#F82828',
  },
  interaction: {
    inactive: '#989BA2',
    disable: '#F4F4F5',
  },
  palette: {
    coolNeutral99: '#F7F7F8',
    coolNeutral98: '#F4F4F5',
    coolNeutral97: '#EAEBEC',
    coolNeutral96: '#E1E2E4',
    coolNeutral95: '#DBDCDF',
    coolNeutral90: '#C2C4C8',
    coolNeutral80: '#AEB0B6',
    coolNeutral70: '#989BA2',
    coolNeutral60: '#878A93',
    coolNeutral50: '#70737C',
    coolNeutral40: '#5A5C63',
    coolNeutral30: '#46474C',
    coolNeutral25: '#37383C',
    coolNeutral23: '#333438',
    coolNeutral22: '#2E2F33',
    coolNeutral20: '#292A2D',
    coolNeutral17: '#212225',
    coolNeutral15: '#1B1C1E',
    coolNeutral10: '#171719',
    coolNeutral7: '#141415',
    coolNeutral5: '#0F0F10',
    deepSkyBlue99: '#DDF3FF',
    deepSkyBlue95: '#C4EAFF',
    deepSkyBlue90: '#A1DEFF',
    deepSkyBlue80: '#82D3FF',
    deepSkyBlue70: '#5EC7FF',
    deepSkyBlue60: '#3BB7FF',
    deepSkyBlue55: '#00A1FF',
    deepSkyBlue50: '#0090F0',
    deepSkyBlue45: '#0080DB',
    deepSkyBlue40: '#0071C2',
    deepSkyBlue30: '#005E99',
    deepSkyBlue20: '#004069',
    deepSkyBlue10: '#002235',
    springGreen99: '#D6FFE9',
    springGreen95: '#BDFFDC',
    springGreen90: '#99FFC9',
    springGreen80: '#61FFAB',
    springGreen70: '#2AF78A',
    springGreen60: '#1CED7E',
    springGreen55: '#1BE077',
    springGreen50: '#18C96B',
    springGreen45: '#16B25F',
    springGreen40: '#139C52',
    springGreen30: '#108546',
    springGreen20: '#0E703B',
    springGreen10: '#0B592F',
    brilliantRose99: '#FFDEF0',
    brilliantRose95: '#FFCCE8',
    brilliantRose90: '#FFBADF',
    brilliantRose80: '#FFA1D4',
    brilliantRose70: '#FF82C6',
    brilliantRose60: '#FF69B9',
    brilliantRose55: '#FF4FAE',
    brilliantRose50: '#EB3F9C',
    brilliantRose45: '#C93C89',
    brilliantRose40: '#A83573',
    brilliantRose30: '#942F65',
    brilliantRose20: '#7A2754',
    brilliantRose10: '#662045',
  },
  gradient: {
    normal:
      'linear-gradient(90deg, rgba(0,128,219,1) 0%, rgba(0,161,255,1) 32%, rgba(62,205,222,1) 100%);',
    normalReverse:
      'linear-gradient(270deg, rgba(0,128,219,1) 0%, rgba(0,161,255,1) 32%, rgba(62,205,222,1) 100%);',
    hover:
      'linear-gradient(90deg, rgba(0,128,219,1) 0%, rgba(0,161,255,1) 78%, rgba(35,185,253,1) 100%);',
  },
};

const font = {
  display1: css`
    font-size: 56px;
    line-height: 72px;
    letter-spacing: -0.025rem;
    font-weight: 700;
  `,
  display2: css`
    font-size: 48px;
    line-height: 72px;
    letter-spacing: -0.025rem;
    font-weight: 700;
  `,
  display3: css`
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -0.025rem;
    font-weight: 700;
  `,
  display4: css`
    font-size: 32px;
    line-height: 48px;
    letter-spacing: -0.025rem;
    font-weight: 700;
  `,
  title1: css`
    font-size: 36px;
    line-height: 42px;
    letter-spacing: -0.025rem;
    font-weight: 600;
  `,
  title2: css`
    font-size: 28px;
    line-height: 38px;
    letter-spacing: -0.025rem;
    font-weight: 600;
  `,
  heading1: css`
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.025rem;
    font-weight: 600;
  `,
  heading2: css`
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.025rem;
    font-weight: 600;
  `,
  body1: css`
    font-size: 16px;
    line-height: 26px;
    letter-spacing: -0.025rem;
    font-weight: 600;
  `,
  body2: css`
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.025rem;
    font-weight: 600;
  `,
  body3: css`
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.025rem;
    font-weight: 600;
  `,
  caption1: css`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.025rem;
    font-weight: 700;
  `,
  caption2: css`
    font-size: 10px;
    line-height: 14px;
    letter-spacing: -0.025rem;
    font-weight: 700;
  `,
};

const theme = { color, font, mediaQuery, heightSizes };

export default theme;

export type ThemeType = typeof theme;
