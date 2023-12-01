import { Book } from "src/book/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserReader {
    @PrimaryGeneratedColumn('increment')
    idUser: number;

    @Column()
    name: string

    @Column()
    fullName: string;

    @Column()
    phone: number;

    @OneToMany(() => Book, book => book.users)
    books: UserReader[];
}
