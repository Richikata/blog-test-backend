import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authorsService: AuthorsService,
    private jwtService: JwtService,
	) {}

  async validateUser(email: string, password: string): Promise<Author> {
		const user = await this.authorsService.validate(email, password);

		if (!user) {
			throw new BadRequestException('Password or email are incorrect');
		}

		return user;
  }
  
  async generateUserAuthToken({
		name,
		email,
		id,
	}: Author): Promise<string> {
		return this.jwtService.sign({
			name,
			email,
			id
		});
  }
  
  async login(payload): Promise<string>{
    const author = await this.authorsService.getByEmail(payload.email);
    if (author) {
      return await this.generateUserAuthToken(author);
    } else {
      throw new BadRequestException('Email or Password is incorrect');
    }

  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOneBy(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
