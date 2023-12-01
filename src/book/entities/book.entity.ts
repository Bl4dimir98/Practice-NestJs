import { UserReader } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn('increment')
    id: number;


    @Column()
    barCode: number
    @Column()
    title: string;
    @Column()
    author: string;
    @Column()
    country: string;
    @Column()
    yearPublic: number;

    @ManyToOne(() => UserReader, userReader => userReader.books)
    users: UserReader[];

}
