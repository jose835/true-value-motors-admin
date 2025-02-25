export interface CategoryProps {
    id: string;
    name: string;
    dateAt: Date;
}

export interface FuelProps {
    id: string;
    name: string;
    dateAt: Date;
}

export interface CarProps {
    id: string;
    name: string;
    price: number;
    category: string;
    seats: number;
    door: number;
    mileage: number;
    fuel: string;
    dateAt: Date;
}