1)Local Strategy = retira email,password,appId e envia pra gerar no jwt
2)JWT Strategy = Verifica o jwt e usuario vinculado

@UseGuards(LocalAuthGuard) => faz a autenticação e injeta o req.body.user