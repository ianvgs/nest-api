import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/AuthPackageModule/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

//@STRATEGIES
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

//@MIDDLEWARES
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';


@Module({
  imports: [UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' }
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})


export class AuthModule implements NestModule {
  //Middleware: email,password,appId ?? Exception;
  configure(consumer: MiddlewareConsumer) {
    /*      consumer.apply(LoginValidationMiddleware).forRoutes('/auth/*');  */
    consumer.apply(LoginValidationMiddleware).forRoutes('/auth/login');
  }
}
