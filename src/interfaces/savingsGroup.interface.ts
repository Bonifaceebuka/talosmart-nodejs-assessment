export interface IcreateSavingsGroup {
    id?: number;
    group_name: string;
    group_description: string;
    group_creator: number;
}

export interface IviewSavingsGroup {
    id: number;
    group_name: string;
    group_description: string;
    group_creator: number;
    updatedAt?: string;
    createdAt?: string;
}
