import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'content',
  })
  content: string;

  @Column({
    name: 'imageUrl',
  })
  imageUrl: string;

  @ManyToOne(
    () => Author,
    author => author.blogs,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinTable()
  author: Author;

	@ManyToMany(
		() => Category,
		category => category.blogs,
		{ onDelete: 'CASCADE', onUpdate: 'CASCADE' },
	)
	@JoinTable()
  category: Category[];

  @ManyToMany(
		() => Tag,
		tag => tag.blogs,
		{ onDelete: 'CASCADE', onUpdate: 'CASCADE' },
	)
	@JoinTable()
	tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
