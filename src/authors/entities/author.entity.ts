import { Blog } from 'src/blogs/entities/blog.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('author')
export class Author {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'imageUrl',
  })
  imageUrl: string;

  @Column({
    name: 'email',
  })
  email: string;

  @Column({
    name: 'password',
    select: false,
  })
  password: string;

  @OneToMany(
		() => Blog,
		blog => blog.author,
	)
	blogs: Blog[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
