import { Address } from './address';
import { Skill } from './skill';

export interface User {
    firstName: string;

    address: Address;

    skills: Skill[];
}
