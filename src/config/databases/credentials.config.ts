const DatabaseConfig = () => ({
  type: 'mysql',
  host: process.env.CREDENTIALS_HOST,
  username: process.env.CREDENTIALS_USERNAME,
  password: process.env.CREDENTIALS_PASSWORD,
  database: process.env.CREDENTIALS_DATABASE,
  port: parseInt(process.env.CREDENTIALS_PORT),
  //syncronize: create if notexists (cria todas as tabelas possiveis)
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true
})

export default DatabaseConfig






