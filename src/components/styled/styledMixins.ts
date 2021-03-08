export const paddingMixin = ({p}: { p?: number | Array<number> | undefined }) =>
		p && (p instanceof Array ? `padding: ${p.map(num => `${num}px`).join(' ')};` : `padding: ${p}px;`)

export const marginMixin = ({m}: { m?: number | Array<number> | undefined }) =>
		m && (m instanceof Array ? `margin: ${m.map(num => `${num}px`).join(' ')};` : `margin: ${m}px;`)

export const MaxHeightMixin = ({maxHeight}: { maxHeight?: boolean }) => maxHeight && `height: 100%;`
