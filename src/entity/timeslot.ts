import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Artist } from './artist';
import { Showcase } from './showcase';

@Entity()
export class Timeslot {

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
