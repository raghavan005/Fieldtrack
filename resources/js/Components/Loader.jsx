import { helix } from 'ldrs';

if (typeof window !== 'undefined') {
    helix.register();
}

export default function Loader({ size = "45", speed = "2.5", color = "#FA4032" }) {
    return <l-helix size={size} speed={speed} color={color}></l-helix>;
}
