import { Request } from 'express';
import { GraphQLFieldConfigMap, GraphQLInputFieldConfigMap, GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLID, GraphQLString } from 'graphql';
import { Artist } from '../../entity/artist';
import { TimeslotModel } from '../timeslot/model';
import { timeslotType } from '../timeslot/type';

const artistBaseFields: GraphQLFieldConfigMap<Artist, Request> & GraphQLInputFieldConfigMap = {
  name: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
};

export const artistType = new GraphQLObjectType({
  name: 'Artist',
  description: 'Open Mic Performers',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    ...artistBaseFields,
    timeslots: {
      type: new GraphQLList(timeslotType),
      resolve: (source) => new TimeslotModel().getTimeslotByArtistId(source.id)
    }
  })
});

export const artistInputType = new GraphQLInputObjectType({
  name: 'ArtistInput',
  fields: () => artistBaseFields
});

export const artistUpdateType = new GraphQLInputObjectType({
  name: 'ArtistUpdate',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    ...artistBaseFields
  })
});
