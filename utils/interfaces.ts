export interface User {
    id?: string;
    role: string;
}

export interface Offer {
    id?: string;
    title: string;
    description: string;
    price: number;
    seller: User;
}

export interface Timestamp {
    seconds: number;
    nanoseconds: number;
}
