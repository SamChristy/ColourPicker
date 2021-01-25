export default function Marker({ position: { x, y } }) {
    const style = {
        ...(x !== 'undefined' ? { left: `${Math.round(x)}px` } : {}), top: `${Math.round(y)}px`
    };

    return (
        <div className={'marker'} style={style} />
    );
}