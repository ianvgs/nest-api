## Local Strategy = retira email,password,appId e envia pra gerar no jwt
***Intercepta o request e faz o login - ver local.strategy


## JWT Strategy = Verifica o jwt e usuario vinculado

@UseGuards(LocalAuthGuard) => faz a autenticação e injeta o req.body.user
@CurrentUser() user: UserFromJwt => descriptografa o 'BEARER E devolve UserFromJwt'

@IsPublic()  => quando nao quer nenhum tipo de autenticacao afetando (tipo quando importa no modulo e replica à todos os outros) como no caso abaixo \/
/* 
  providers: [{
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }],
*/