import { Address } from "./address";
import { Service } from "./service";

export class User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    addr?: Address;
    active?: Boolean;
    postList?: [Service];
    role?: 'user' | 'editor' | 'admin';
    token?: string;
    address?: string;
    posts?: number;
}

export class Editable {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    addr?: Address;
    city?: string;
    street?: string;
    houseNumber?: string;
    active?: Boolean;
    postList?: [Service];
    role?: 'user' | 'editor' | 'admin';
    token?: string;
    address?: string;
    posts?: number;
}
