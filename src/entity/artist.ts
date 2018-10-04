import { Entity, Column, PrimaryGeneratedColumn,  OneToMany } from 'typeorm';
import { Timeslot } from './timeslot';
import { Template } from './template';

@Entity()
export class Artist extends Template {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text', { nullable: true })
  public name: string;

  @Column('text', { nullable: true })
  public description: string;

  @OneToMany(type => Timeslot, timeslot => timeslot.artist)
  public timeslots: Array<Timeslot>;
}
