export interface SWVStarShipObj {
    count: number;
    next: string;
    previous: string | null;
    results: SWVStarShip[];
}

export interface SWVStarShip {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string | number;
    length: string | number;
    max_atmosphering_speed: string | number;
    crew: string | number;
    passengers: string | number;
    cargo_capacity: string | number;
    consumables: string;
    hyperdrive_rating: string | number;
    MGLT: string | number;
    starship_class: string;
    pilots: string[];
    films: string[];
    created: Date;
    edited: Date;
    url: string;
}
