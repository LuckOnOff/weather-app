type Address = {
    state: string;
    "ISO3166-2-lvl4": string;
    region: string;
    country: string;
    country_code: string;
    city?: string; // город может отсутствовать в некоторых случаях
};

type BoundingBox = [
    string, // южная широта
    string, // северная широта
    string, // западная долгота
    string  // восточная долгота
];

export type ResponsePlace = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: Address;
    boundingbox: BoundingBox;
};