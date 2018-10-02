import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';
import { query as artistQuery, mutation as artistMutation } from './artist/query';
import { query as showcaseQuery, mutation as showcaseMutation } from './showcase/query';
import { mutation as timeslotMutation } from './timeslot/query';

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    showcases: showcaseQuery.showcases,
    showcase: showcaseQuery.showcase,
    artists: artistQuery.artists,
    artist: artistQuery.artist
  })
});

const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    createShowcase: showcaseMutation.createShowcase,
    updateShowcase: showcaseMutation.updateShowcase,
    createArtist: artistMutation.createArtist,
    updateArtist: artistMutation.updateArtist,
    addArtistToShowcase: artistMutation.addArtistToShowcase,
    updateTimeslot: timeslotMutation.updateTimeslot
  })
});

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
});
