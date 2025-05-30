// entity/sendedEmail.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('sended_email')
export class SendedEmail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', name: 'admin_id'})
    adminId: number;

    @Column({type: 'int', name: 'receiver_id'})
    receiverId: number;

    @Column({type: 'varchar', length: 255, name: 'sended_details', nullable: true})
    sendedDetails: string;

    @CreateDateColumn({ type: 'timestamp', name: 'sended_at', default: () => 'CURRENT_TIMESTAMP' })
    sendedAt: Date;
}
