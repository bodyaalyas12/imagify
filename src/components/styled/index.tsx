import styled from "styled-components";
import { marginMixin, MaxHeightMixin, paddingMixin } from "./styledMixins";

export const FlexBlock = styled.div<{
  column?: boolean;
  alignCenter?: boolean;
  alignStart?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  justifyEnd?: boolean;
  justifyEvenly?: boolean;
  grow?: boolean;
  justifyStart?: boolean;
  basis?: boolean;
  noWrap?: boolean;
  height?: number;
  maxHeight?: boolean;
  width?: number;
  wAbs?: number;
  rowReverse?: boolean;
  background?: string;
  position?: string;
  p?: number | Array<number>;
  m?: number | Array<number>;
}>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${({ alignCenter }) => alignCenter && `align-items: center;`}
  ${({ alignStart }) => alignStart && `align-items: start;`}
  ${({ justifyCenter }) => justifyCenter && `justify-content: center;`}
  ${({ justifyBetween }) => justifyBetween && `justify-content: space-between;`}
  ${({ justifyEvenly }) => justifyEvenly && `justify-content: space-evenly;`}
  ${({ justifyEnd }) => justifyEnd && `justify-content: flex-end;`}
  ${({ grow }) => grow && `flex-grow:1;`}
  ${({ basis }) => basis && `flex-basis:${basis};`}
  ${({ justifyStart }) => justifyStart && `justify-content: flex-start;`}
  ${({ rowReverse }) => rowReverse && `flex-direction: row-reverse;`}
  ${({ noWrap }) => noWrap && `flex-wrap: nowrap;`}
  ${({ column }) => column && `flex-direction: column;`}
  ${({ height }) =>
    height &&
    height >= 0 &&
    height <= 100 &&
    `
            height: ${height}%;
        `}
  ${({ width }) =>
    width &&
    width >= 0 &&
    width <= 100 &&
    `
         width: ${width}%;
        `}
  ${({ wAbs }) => wAbs && `width:${wAbs}px;`}

  ${({ background }) => background && `background:${background};`}
  ${({ position }) => position && `position:${position};`}
  ${paddingMixin}
  ${marginMixin}
  ${MaxHeightMixin}
`;
export const Title = styled.h1`
  margin-bottom: 20px;
`;
export const StyledLink = styled(FlexBlock)`
  a {
    color: blue;
  }
`;
