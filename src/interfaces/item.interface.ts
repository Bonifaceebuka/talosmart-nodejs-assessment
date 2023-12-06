export interface IcreateItem {
    id?: number;
    title: string;
    logo: string;
    description: string;
    slogan: string;
    online_status: string;
    price_start: number;
    price_end: number;
    delivery_type: string;
    terms_and_condition: string;
    how_to_redeem: string;
    network_fees: string;
}

export interface IviewItem {
    id: number;
    logo: string;
    title: string;
    description: string;
    slogan: string;
    online_status: string;
    price_start: number;
    price_end: number;
    delivery_type: number;
    how_to_redeem: string;
    terms_and_condition: string;
    network_fees: string;
    updatedAt?: string;
    createdAt?: string;
}
