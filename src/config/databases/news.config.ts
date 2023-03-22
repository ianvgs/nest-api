const DatabaseConfig = () => ({
  type: 'mysql',
  host: process.env.NEWS_HOST,
  username: process.env.NEWS_USERNAME,
  password: process.env.NEWS_PASSWORD,
  database: process.env.NEWS_DATABASE,
  port: parseInt(process.env.NEWS_PORT),
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  /*   autoLoadEntities: true */
})

export default DatabaseConfig

