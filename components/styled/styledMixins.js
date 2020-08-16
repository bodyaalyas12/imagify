export const paddingMixin = ({p}) =>
    p && (p instanceof Array ? `padding: ${p.map(num => `${num}px`).join(' ')};` : `padding: ${p}px;`)

export const marginMixin = ({m}) =>
    m && (m instanceof Array ? `margin: ${m.map(num => `${num}px`).join(' ')};` : `margin: ${m}px;`)

export const MaxHeightMixin = ({maxHeight}) => maxHeight && `height: 100%;`

export const flexMixin = ({flexMixin}) => flexMixin && `flex: 1 1 auto;`

export const DisplayNoneMixin = ({dNone}) => dNone && `display: none;`
export const widthMixin = ({width}) =>
    width >= 0 &&
    width <= 100 &&
    `
width: ${width}%;
`
