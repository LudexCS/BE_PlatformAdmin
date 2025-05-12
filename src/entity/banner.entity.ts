import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("banner")
export class Banner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: true, default: 0, name: "admin_id" })
    adminId: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type: "varchar", length: 255, nullable: false, name: "image_url" })
    imageUrl: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    key: string;

    @Column({ type: "varchar", length: 255, nullable: true, name: "link_url" })
    linkUrl: string;

    @Column({ type: "boolean", default: true, nullable: false })
    visible: boolean;

    @Column({ type: "int", default: 0 })
    priority: number;

    @Column({ type: "datetime", nullable: false, name: "starts_at" })
    startsAt: Date;

    @Column({ type: "datetime", nullable: false, name: "ends_at" })
    endsAt: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", name: "updated_at" })
    updatedAt: Date;
}