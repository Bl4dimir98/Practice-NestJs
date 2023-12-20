import { BookEntity } from "src/book/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    idUser: number;

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar' })
    fullName: string;

    @Column({ type: 'int', default: 0 })
    phone: number;
    // relación
    @OneToMany(() => BookEntity, (books) => books.user,
        {
            cascade: true,
            eager: true
        }
    )
    bookTitle?: BookEntity[];
}
