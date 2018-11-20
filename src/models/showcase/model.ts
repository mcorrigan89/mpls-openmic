import { Repository, getManager, getRepository } from 'typeorm';
import { Showcase } from '../../entity/showcase';
import { Timeslot } from '../../entity/timeslot';
import { Artist } from '../../entity/artist';

export class ShowcaseModel {

  private showcaseRepo: Repository<Showcase>;

  constructor() {
    this.showcaseRepo = getManager().getRepository(Showcase);
  }

  public getShowcases = async () => {
    return this.showcaseRepo.createQueryBuilder('showcase')
      .orderBy('date')
      .cache(60000)
      .getMany();
  }

  public getFutureShowcase = async () => {
    return this.showcaseRepo.createQueryBuilder('showcase')
      .where(`date > current_date - interval '1 days'`)
      .orderBy('date')
      .cache(60000)
      .getMany();
  }

  public getShowcaseById = async (id: string) => {
    return this.showcaseRepo.findOne(id);
  }

  public getShowcaseByTimeslotId = async (timeslotId: string) => {
    return this.showcaseRepo.createQueryBuilder('showcase')
      .leftJoinAndSelect('showcase.timeslots', 'timeslot')
      .where('timeslot.id = :id', { id: timeslotId })
      .cache(60000)
      .getOne();
  }

  public createShowcase = async (date: string, description: string, link?: string, timeslots?: Array<{ time: string, artist: { name: string, description?: string }}>) => {
    const newShowcase = new Showcase();
    newShowcase.date = date;
    newShowcase.description = description;
    if (link) {
      newShowcase.link = link;
    }
    let savedTimeslots: Array<Timeslot> = [];
    if (timeslots) {
      const timeslotRepo = getRepository(Timeslot);
      const artistRepo = getRepository(Artist);
      const timeslotEntities = timeslots.map(async timeslot => {
        const timeslotEntity = new Timeslot();
        const artistEntity = new Artist();
        artistEntity.name = timeslot.artist.name;
        if (timeslot.artist.description) {
          artistEntity.description = timeslot.artist.description;
        }
        const savedArtist = await artistRepo.save(artistEntity);
        timeslotEntity.time = timeslot.time;
        timeslotEntity.artist = savedArtist;
        return timeslotRepo.save(timeslotEntity);
      });
      savedTimeslots = await Promise.all(timeslotEntities);
    }
    newShowcase.timeslots = savedTimeslots;
    try {
      const savedShowcase = await this.showcaseRepo.save(newShowcase);
      return savedShowcase;
    } catch (err) {
      return err;
    }
  }

  public updateShowcase = async (id: string, date: string, description: string, link?: string, timeslots?: Array<{ time: string, artist: { name: string, description?: string }}>) => {
    try {
      const showcaseToUpdate = await this.showcaseRepo.findOneOrFail(id);
      showcaseToUpdate.date = date;
      showcaseToUpdate.description = description;
      if (link) {
        showcaseToUpdate.link = link;
      }
      let savedTimeslots: Array<Timeslot> = [];
      if (timeslots) {
        const timeslotRepo = getRepository(Timeslot);
        const artistRepo = getRepository(Artist);
        const timeslotEntities = timeslots.map(async timeslot => {
          const timeslotEntity = new Timeslot();
          const artistEntity = new Artist();
          artistEntity.name = timeslot.artist.name;
          if (timeslot.artist.description) {
            artistEntity.description = timeslot.artist.description;
          }
          const savedArtist = await artistRepo.save(artistEntity);
          timeslotEntity.showcase = showcaseToUpdate;
          timeslotEntity.time = timeslot.time;
          timeslotEntity.artist = savedArtist;
          return timeslotRepo.save(timeslotEntity);
        });
        savedTimeslots = await Promise.all(timeslotEntities);
      }
      showcaseToUpdate.timeslots = savedTimeslots;
      await this.showcaseRepo.save(showcaseToUpdate);
      return showcaseToUpdate;
    } catch (err) {
      throw err;
    }
  }
}
