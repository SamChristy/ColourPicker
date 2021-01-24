export default function Marker({ position: { x, y } }) {
    if (y === undefined) return null;

    const style = {
        ...(x !== 'undefined' ? { left: `${Math.round(x)}px` } : {}), top: `${Math.round(y)}px`
    };

    return (
        <div className={'marker'} style={style} />
    );
}