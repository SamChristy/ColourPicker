export default function HueScale({ colour }) {
    return (
        <div>
            <div style={{ display: 'inline-block', background: colour, width: '20px', height: '20px' }}></div>
            <input value={colour} readOnly disabled />
        </div>
    );
}