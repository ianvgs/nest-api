import { Document } from 'mongoose';

//MongoDb Pluraliza para colletion: "auths"
export class Auth extends Document {
  auth: string;
}
