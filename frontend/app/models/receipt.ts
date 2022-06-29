export class Item{
    title: string;
    quantity: number;
}

export class Receipt{
    business: string;
    value: number;
    tax: number;
    items: Array<Item>;
    date: Date
}