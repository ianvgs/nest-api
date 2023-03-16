import { Document } from 'mongoose';

export class User extends Document {
    name: string;
    completed: boolean;
    year: number;
    color: string;
    pantone_value: string;
}
