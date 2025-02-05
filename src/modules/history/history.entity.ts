import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConversionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  base: string;

  @Column()
  target: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  convertedAmount: number;

  @Column('decimal', { precision: 10, scale: 6 })
  rate: number;

  @Column({ nullable: true })
  chatId?: string;

  @Column({ nullable: true })
  userId?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
