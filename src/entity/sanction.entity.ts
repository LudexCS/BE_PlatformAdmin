import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

export enum Reason {
    RESOURCE = 'RESOURCE',
    GENERAL = 'GENERAL',
}

@Entity({ name: "sanction_user" })
@Index(["adminId", "userId"], { unique: true })
export class SanctionUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "admin_id", type: "int" })
    adminId: number;

    @Column({ name: "user_id", type: "int" })
    userId: number;

    @Column({ name: "sanction_detail", type: "varchar", length: 255 })
    sanctionDetail: string;

    @Column({ name: "started_at", type: "datetime" })
    startedAt: Date;
}

@Entity({ name: "sanction_game" })
@Index(["adminId", "gameId"], { unique: true })
export class SanctionGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "admin_id", type: "int" })
    adminId: number;

    @Column({ name: "game_id", type: "int" })
    gameId: number;

    @Column({ name: "sanction_detail", type: "varchar", length: 255 })
    sanctionDetail: string;

    @Column({
        type: 'enum',
        enum: Reason,
        default: Reason.GENERAL,
        name: 'reason'
    })
    reason: Reason;

    @Column({ name: "started_at", type: "datetime" })
    startedAt: Date;
}