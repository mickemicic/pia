import { InventoryItem } from "src/app/facilities/facilities.component";

class Orderer{
    PIB: number;
    title: String;
    address: String;
    category: String;
    days: number;
    tax: number;
    logo: String;
    odgLice: String;
    phone: String;
}


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

    orderers: Array<Orderer>;

    inventory: Array<InventoryItem>

    tabs: Array<string>
}