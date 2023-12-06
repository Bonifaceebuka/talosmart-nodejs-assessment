export interface IcreateItem {
    id?: number;
    status?: number;
    sender_id: number;
    receiver_id: number;
    group_id: number;
}

export interface IviewItem {
    id: number;
    sender_id: number;
    receiver_id: number;
    group_id: number;
    status: number;
    updatedAt?: string;
    createdAt?: string;
}
