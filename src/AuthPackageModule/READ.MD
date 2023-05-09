-Local guard funciona na rota de login.
-Jwt guard declarado no modulo em que quer que seja usado
-As rotas publicas devem preceder @IsPublic()

######
@Module({
  controllers: [UserController],
  providers: [UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  exports: [UserService]
})
export class UserModule { }
######


@ROTAS:
### USER MODULE
POST-localhost:8000/api/user
*Criar usuario name,email e password

GET-localhost:8000/api/user/me
*precisa enviar um bearer token

### AUTH MODULE
POST-localhost:8000/api/login (email e password)
*retorna access_token 

#####

# @UseGuards(JwtAuthGuard)
# @UseGuards(LocalAuthGuard)
@CurrentUser()  somente funciona com @UseGuards(JwtAuthGuard) ou sem mas com o jwt espalhado por todo modulo.




