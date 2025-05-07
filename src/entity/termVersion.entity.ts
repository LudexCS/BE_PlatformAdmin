import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("term_version")
export class TermVersion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: false })
    term_id: number;

    @Column({ type: "int", nullable: false })
    version: number;

    @Column({ type: "text", nullable: false })
    content: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
}