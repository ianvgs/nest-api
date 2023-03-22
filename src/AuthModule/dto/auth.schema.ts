import * as mongoose from 'mongoose';

//Schema/Model no mongoDB com a estrutura da collection que vai usar
export const AuthSchema = new mongoose.Schema({
  auth: { type: String },
  sessionKey: String,
  //Sessão que expira, mongo limpa depois de certo tempo
  createdAT: { type: Date, expires: 100, default: Date.now },
});
