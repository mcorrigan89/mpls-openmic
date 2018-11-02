import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Artist } from './artist';
import { Showcase } from './showcase';
import { Template } from './template';

@Entity()
export class Timeslot extends Template {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('time')
  public time: string;

  @ManyToOne(type => Showcase, showcase => showcase.timeslots)
  @JoinTable()
  public showcase: Showcase;

  @ManyToOne(type => Artist, artist => artist.timeslots)
  @JoinTable()
  public artist: Artist;
}
