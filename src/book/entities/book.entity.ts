import { UserEntity } from "src/user/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'books' })
export class BookEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'varchar' })
    title: string;

    // Relación
    @ManyToOne(() => UserEntity, (users => users.bookTitle))
    user?: UserEntity;



}
