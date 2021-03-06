import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, Column } from 'typeorm';

export abstract class Template  {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createAt: Date;

  @UpdateDateColumn()
  public updateAt: Date;

  @VersionColumn({ default: 1 })
  public version: number;

  @Column('bool', { default: false })
  public deleted: boolean;
}
