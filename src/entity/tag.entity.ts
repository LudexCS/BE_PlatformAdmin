import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("tag")
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ name: 'name_ko', type: 'varchar', length: 255, nullable: true })
    nameKo: string;

    setName(name: string) {
        this.name = name;
    }

    setNameKo(nameKo: string) {
        this.nameKo = nameKo;
    }
}