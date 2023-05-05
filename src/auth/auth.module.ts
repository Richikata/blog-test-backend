import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthorsModule } from 'src/authors/authors.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    AuthorsModule,
		PassportModule.register({ defaultStrategy: 'local' }),
		JwtModule.register({
			global: true,
			secret: "secret",
			signOptions: {expiresIn: '2d'}
		})
		// 	JwtModule.registerAsync({
		// 	inject: [ConfigService],

		// 	useFactory: async (
		// 		configService: ConfigService,
		// 	): Promise<JwtModuleOptions> => ({
		// 		secret: configService.get<string>('jwt.secret'),
		// 		signOptions: {
		// 			expiresIn: configService.get<string>('jwt.expiresIn'),
		// 		},
		// 	}),
		// }),
  ],
  controllers: [AuthController],
	providers: [AuthService, LocalStrategy],
	exports: [AuthService]
})
export class AuthModule {}
