import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("banner")
export class Banner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: true, default: 0 })
    admin_id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    image_url: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    link_url: string;

    @Column({ type: "boolean", default: true, nullable: false })
    visible: boolean;

    @Column({ type: "int", default: 0 })
    priority: number;

    @Column({ type: "datetime", nullable: false })
    starts_at: Date;

    @Column({ type: "datetime", nullable: false })
    ends_at: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}