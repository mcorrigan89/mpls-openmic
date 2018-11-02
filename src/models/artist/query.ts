import { Request } from 'express';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { ArtistModel } from './model';
import { artistType, artistInputType, artistUpdateType } from './type';
import { TimeslotModel } from '../timeslot/model';
import { timeslotType } from '../timeslot/type';
import { Artist } from '../../entity/artist';

export namespace query {
  export const artists: GraphQLFieldConfig<Artist, Request> = {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(artistType))),
    resolve: () => new ArtistModel().getArtists()
  };

  export const artist: GraphQLFieldConfig<Artist, Request> = {
    type: artistType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: (_, args) => new ArtistModel().getArtistById(args.id)
  };
}

export namespace mutation {
  export const createArtist: GraphQLFieldConfig<{}, {}> = {
    type: artistType,
    args: {
      artist: {
        type: new GraphQLNonNull(artistInputType)
      }
    },
    resolve: (_, args) => new ArtistModel().createArtist(args.artist)
  };

  export const updateArtist: GraphQLFieldConfig<{}, {}> = {
    type: artistType,
    args: {
      artist: {
        type: new GraphQLNonNull(artistUpdateType)
      }
    },
    resolve: (_, args) => new ArtistModel().updateArtist(args.artist)
  };

  export const addArtistToShowcase: GraphQLFieldConfig<{}, {}> = {
    type: timeslotType,
    args: {
      artistId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      showcaseId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      time: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (_, args) => new TimeslotModel().addArtistToShowcase(args.artistId, args.showcaseId, args.time)
  };
}
