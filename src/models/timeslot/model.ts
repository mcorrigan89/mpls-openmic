import { Repository, getManager } from 'typeorm';
import { Timeslot } from '../../entity/timeslot';
import { Artist } from '../../entity/artist';
import { Showcase } from '../../entity/showcase';

export class TimeslotModel {

  private timeslotRepo: Repository<Timeslot>;
  private artistRepo: Repository<Artist>;
  private showcaseRepo: Repository<Showcase>;

  constructor() {
    this.timeslotRepo = getManager().getRepository(Timeslot);
    this.artistRepo = getManager().getRepository(Artist);
    this.showcaseRepo = getManager().getRepository(Showcase);
  }

  public getTimeslots = async () => {
    return this.timeslotRepo.find();
  }

  public getTimeslotById = async (id: string) => {
    return this.timeslotRepo.findOne(id);
  }

  public getTimeslotByShowcaseId = async (showcaseId: string) => {
    return this.timeslotRepo.createQueryBuilder('timeslot')
      .leftJoinAndSelect('timeslot.showcase', 'showcase')
      .where('showcase.id = :id', { id: showcaseId })
      .orderBy('time')
      .cache(60000)
      .getMany();
  }

  public getTimeslotByArtistId = async (artistId: string) => {
    return this.timeslotRepo.createQueryBuilder('timeslot')
      .leftJoinAndSelect('timeslot.artist', 'artist')
      .where('artist.id = :id', { id: artistId })
      .cache(60000)
      .getMany();
  }

  public addArtistToShowcase = async (artistId: string, showcaseId: string, time: string) => {
    try {
      const artist = await this.artistRepo.findOne(artistId);
      const showcase = await this.showcaseRepo.findOne(showcaseId);
      if (artist && showcase) {
        const newTimeslot = new Timeslot();
        newTimeslot.artist = artist;
        newTimeslot.showcase = showcase;
        newTimeslot.time = time;
        return this.timeslotRepo.save(newTimeslot);
      } else {
        throw new Error('Not able to create this timeslot');
      }
    } catch (err) {
      throw err;
    }
  }

  public updateTimeslot = async (timeslot: Timeslot) => {
    try  {
      const timeslotToUpdate = await this.timeslotRepo.findOneOrFail(timeslot.id);
      timeslotToUpdate.time = timeslot.time;
      await this.timeslotRepo.update(timeslotToUpdate.id, timeslotToUpdate);
      return timeslotToUpdate;
    } catch (err) {
      throw err;
    }
  }
}
