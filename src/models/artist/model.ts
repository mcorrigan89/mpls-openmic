import { Repository, getManager } from 'typeorm';
import { Artist } from '../../entity/artist';

export class ArtistModel {

  private artistRepo: Repository<Artist>;

  constructor() {
    this.artistRepo = getManager().getRepository(Artist);
  }

  public getArtists = async () => {
    return this.artistRepo.find();
  }

  public getArtistById = async (id: string) => {
    return this.artistRepo.findOne(id);
  }

  public getArtistByTimeslotId = async (timeslotId: string) => {
    return this.artistRepo.createQueryBuilder('artist')
      .leftJoinAndSelect('artist.timeslots', 'timeslot')
      .where('timeslot.id = :id', { id: timeslotId })
      .cache(60000)
      .getOne();
  }

  public createArtist = async (artist: Artist) => {
    const newArtist = new Artist();
    newArtist.name = artist.name;
    newArtist.description = artist.description;
    try {
      const savedArtist = await this.artistRepo.save(newArtist);
      return savedArtist;
    } catch (err) {
      return err;
    }
  }

  public updateArtist = async (artist: Artist) => {
    try {
      const artistToUpdate = await this.artistRepo.findOneOrFail(artist.id);
      artistToUpdate.name = artist.name;
      artistToUpdate.description = artist.description;
      await this.artistRepo.update(artistToUpdate.id, artistToUpdate);
      return artistToUpdate;
    } catch (err) {
      throw err;
    }
  }
}
