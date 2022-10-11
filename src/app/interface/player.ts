import { IdentityCardType } from "../enum/identity-card-type.enun";
import { Address } from "./address";

export interface Player {
    id: number;
    memberNumber: number;
    name: string;
    dni: IdentityCardType;
    address: Address;
    created: Date;
    email: string;
}

