export default interface LocationData {
    name: string;
    coords: {
        lat: string | null;
        lon: string | null;
    };
};