export default function HueScale({ colour }) {
    return (
        <div className={'colourSwatch'}>
            <div style={{ background: colour }} />
            <input value={colour} readOnly disabled />
        </div>
    );
}