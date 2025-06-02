import { Entity, Column } from 'typeorm';


@Entity('origin_game')
export class OriginGame {
    @Column({ name: 'game_id'})
    gameId: number;

    @Column({ name: 'origin_game_id'})
    originGameId: number;
}