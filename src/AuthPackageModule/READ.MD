2 "modulos/"pacotes"
-auth/
-auth/user



-Local guard funciona na rota de login.
-Jwt guard declarado no modulo em que quer que seja usado
-As rotas publicas devem preceder @IsPublic()




@ROTAS:
### USER MODULE
POST-localhost:8000/api/user
*Criar usuario name,email e password

GET-localhost:8000/api/user/me
*precisa enviar um bearer token



# @UseGuards(JwtAuthGuard)
# @UseGuards(LocalAuthGuard)
@CurrentUser()  somente funciona com @UseGuards(JwtAuthGuard) ou sem mas com o jwt espalhado por todo modulo.

Module Config:

Utilizar gloacalmente(como um middleware)
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
  ***Desse jeito todos os modulos utilizam esse useClass, dai tem que ir nas rotas e declarar:

  @Public()
  @POST()
  myPostFunction(){
  }


///////////
 POST :8000/api/auth/user
 Rota aberta (criar usuario)

POST :8000/api/auth/login
 Rota aberta (loginusuario)
 retorna access_token

Get :8000/api/auth/user
 Rota fechada (informa access_token)
 retorna o usuario
 {
	"id": 13,
	"email": "emasissls@email.com",
	"name": "test"
}


