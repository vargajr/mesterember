import { Contactinfo } from "./contactinfo";
import { User } from "./user";

export class Service {
    _id?: string;
    name?: string;
    type?: string;
    description?: string;
    contacts?: Contactinfo;
    active?: boolean;
    uploader?: User;
    contactinfo?: string;
}

export class Editable {
    _id?: string;
    name?: string;
    type?: string;
    description?: string;
    contacts?: Contactinfo;
    active?: boolean;
    uploader?: User;
    contactinfo?: string;
    contactPerson?: String;
    available?: String;
    phone?: String;
    email?: String;
    webpageUrl?: String;
    city?: string;
    street?: string;
    houseNumber?: string;
    recommender?: string;
}

export class ServiceUpload {
    _id?: string;
    name?: string;
    type?: string;
    description?: string;
    contacts?: Contactinfo;
    active?: boolean;
    uploader?: string;
}
