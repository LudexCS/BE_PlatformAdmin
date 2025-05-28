import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "report" })
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "complainant_id", type: "int" })
    complainantId: number;

    @Column({ name: "reported_game_id", type: "int" })
    reportedGameId: number;

    @Column({ name: "reports_details", type: "varchar", length: 255, nullable: true })
    reportsDetails: string;

    @CreateDateColumn({ name: "reported_at", type: "timestamp" })
    reportedAt: Date;

    @Column({ name: "ishandled", type: "boolean", default: false })
    isHandled: boolean;

    @Column({ name: "handled_admin_id", type: "int", nullable: true })
    handledAdminId: number;

    @Column({
        name: "handled_at",
        type: "timestamp",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    })
    handledAt: Date;
}