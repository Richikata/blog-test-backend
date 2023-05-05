import { Blog } from 'src/blogs/entities/blog.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('tags')
export class Tag {
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
		blog => blog.tags,
	)
	blogs: Blog[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
