export interface SWVehicleObj {
    count: number;
    next: string;
    previous: string | null;
    results: SWVehicle[];
}

export interface SWVehicle {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string | number;
    length: string | number;
    max_atmosphering_speed: string;
    crew: string | number;
    passengers: string | number;
    cargo_capacity: string | number;
    consumables: string;
    vehicle_class: string;
    pilots: string[],
    films: string[],
    created: string;
    edited: Date;
    url: string;
}
