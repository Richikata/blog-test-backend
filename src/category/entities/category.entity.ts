import { Blog } from 'src/blogs/entities/blog.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @ManyToMany(
		() => Blog,
		blog => blog.category,
	)
	blogs: Blog[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
