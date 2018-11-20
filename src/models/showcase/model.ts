import { Repository, getManager } from 'typeorm';
import { Showcase } from '../../entity/showcase';

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
      .where("date > current_date - interval '1 days'")
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

  public createShowcase = async (showcase: Showcase) => {
    const newShowcase = new Showcase();
    newShowcase.date = showcase.date;
    newShowcase.description = showcase.description;
    newShowcase.link = showcase.link;
    try {
      const savedShowcase = await this.showcaseRepo.save(newShowcase);
      return savedShowcase;
    } catch (err) {
      return err;
    }
  }

  public updateShowcase = async (showcase: Showcase) => {
    try {
      const showcaseToUpdate = await this.showcaseRepo.findOneOrFail(showcase.id);
      showcaseToUpdate.date = showcase.date;
      showcaseToUpdate.description = showcase.description;
      showcaseToUpdate.link = showcase.link;
      await this.showcaseRepo.update(showcaseToUpdate.id, showcaseToUpdate);
      return showcaseToUpdate;
    } catch (err) {
      throw err;
    }
  }
}
