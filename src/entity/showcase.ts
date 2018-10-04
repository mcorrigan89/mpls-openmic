import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Timeslot } from './timeslot';
import { Template } from './template';

@Entity()
export class Showcase extends Template {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('date')
  public date: string;

  @Column('text', { nullable: true })
  public description: string;

  @Column('text', { nullable: true })
  public link: string;

  @OneToMany(type => Timeslot, timeslot => timeslot.showcase)
  public timeslots: Array<Timeslot>;
}
