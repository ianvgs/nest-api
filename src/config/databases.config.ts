import { registerAs } from '@nestjs/config';
import NewsDatabaseConfig from './databases/news.config'
import BancoIdeiasDatabaseConfig from './databases/bancoIdeias.config';
import CredentialsConfig from './databases/credentials.config'


export default registerAs('database', () => ({
  news: NewsDatabaseConfig(),
  banco_ideias: BancoIdeiasDatabaseConfig(),
  credentials: CredentialsConfig()
}));

