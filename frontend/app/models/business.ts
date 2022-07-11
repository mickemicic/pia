export class Business{
    username: string;
    password: string;
    type: number;
    odgLice: string;
    phone: string;
    email: string;
    title: string;
    address: string;
    pib: number;
    matBr: number;

    pdv: boolean;
    activities: Array<String>;
    category: String;

    accNum: number;

    logo: String;

    restaurant: number; //0 ako nije, 1 ako jeste

    skladista:{
        id: Array<String>,
        naziv: Array<String>
    };

    kase:{
        lokacija: Array<String>,
        tip: Array<String>
    };

    orderers: Array<number>;
}