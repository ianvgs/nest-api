const DatabaseConfig = () => ({
  type: 'mysql',
  host: process.env.BANCO_IDEIAS_HOST,
  username: process.env.BANCO_IDEIAS_USERNAME,
  password: process.env.BANCO_IDEIAS_PASSWORD,
  database: process.env.BANCO_IDEIAS_DATABASE,
  port: parseInt(process.env.BANCO_IDEIAS_PORT),
  /* synchronize: true, */
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true
});

export default DatabaseConfig;
/* ksda */