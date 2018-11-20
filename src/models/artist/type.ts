import { Request } from 'express';
import { GraphQLFieldConfigMap, GraphQLInputFieldConfigMap, GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLID, GraphQLString } from 'graphql';
import { Artist } from '../../entity/artist';
import { TimeslotModel } from '../timeslot/model';
import { timeslotType } from '../timeslot/type';

const artistBaseFields: GraphQLFieldConfigMap<Artist, Request> & GraphQLInputFieldConfigMap = {
  name: {
    type: new GraphQLNonNull(GraphQLString)
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
      type: new GraphQLNonNull(GraphQLID)
    },
    ...artistBaseFields,
    timeslots: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(timeslotType))),
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
