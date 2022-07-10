export class Business{
    username: string;
    password: string;
    type: number;
    odgLice: string;
    phone: number;
    email: string;
    title: string;
    address: string;
    pib: number;
    matBr: number;

    pdv: boolean;
    activities: Array<String>;
    category: String;

    logo: String;

    restaurant: number; //0 ako nije, 1 ako jeste
}