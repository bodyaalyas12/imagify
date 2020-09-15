import styled from 'styled-components'
import {marginMixin, MaxHeightMixin, paddingMixin} from './styledMixins'

export const FlexBlock = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    ${({alignCenter}) => alignCenter && `align-items: center;`}
    ${({noWrap}) => noWrap && `flex-wrap: nowrap;`}
    ${({alignStart}) => alignStart && `align-items: start;`}
    ${({justifyCenter}) => justifyCenter && `justify-content: center;`}
    ${({justifyBetween}) => justifyBetween && `justify-content: space-between;`}
    ${({justifyEvenly}) => justifyEvenly && `justify-content: space-evenly;`}
    ${({justifyEnd}) => justifyEnd && `justify-content: flex-end;`}
    ${({grow}) => grow && `flex-grow:1;`}
    ${({basis}) => basis && `flex-basis:${basis};`}
    ${({justifyStart}) => justifyStart && `justify-content: flex-start;`}
    ${({rowReverse}) => rowReverse && `flex-direction: row-reverse;`}
    ${({noWrap}) => noWrap && `flex-wrap: nowrap;`}
    ${({column}) => column && `flex-direction: column;`}
    ${({height}) =>
    height >= 0 &&
    height <= 100 &&
    `
            height: ${height}%;
        `}
    ${({width}) =>
    width >= 0 &&
    width <= 100 &&
    `
         width: ${width}%;
        `}
    ${({wAbs}) => wAbs && `width:${wAbs}px;`}

    ${({background}) => background && `background:${background};`}
    ${({position}) => position && `position:${position};`}
    ${paddingMixin}
    ${marginMixin}
    ${MaxHeightMixin}
`
export const Container = styled.div`
	width: 100%;
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
	@media (max-width: 575.98px) {
		width: 100%;
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		max-width: 540px;
	}

	@media (min-width: 768px) and (max-width: 991.98px) {
		max-width: 720px;
	}
	@media (min-width: 992px) and (max-width: 1199.98px) {
		max-width: 960px;
	}

	@media (min-width: 1200px) {
		max-width: 1140px;
	}
`
export const Title = styled.h1`
    margin-bottom:20px;
`
export const StyledLink = styled(FlexBlock)`
    a{
    color:blue;
    }
`
