import { Request } from 'express';
import { GraphQLObjectType, GraphQLInputObjectType, GraphQLFieldConfigMap, GraphQLInputFieldConfigMap, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { ArtistModel } from '../artist/model';
import { artistType, artistInputType } from '../artist/type';
import { showcaseType } from '../showcase/type';
import { ShowcaseModel } from '../showcase/model';
import { Timeslot } from '../../entity/timeslot';

const baseTimeslotFields: GraphQLFieldConfigMap<Timeslot, Request> & GraphQLInputFieldConfigMap = {
  time: {
    type: new GraphQLNonNull(GraphQLString)
  },
};

export const timeslotType = new GraphQLObjectType({
  name: 'Timeslot',
  description: 'Showcase Timeslot',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    ...baseTimeslotFields,
    artist: {
      type: new GraphQLNonNull(artistType),
      resolve: (source) => new ArtistModel().getArtistByTimeslotId(source.id)
    },
    showcase: {
      type: new GraphQLNonNull(showcaseType),
      resolve: (source) => new ShowcaseModel().getShowcaseByTimeslotId(source.id)
    }
  })
});

export const timeslotInputType = new GraphQLInputObjectType({
  name: 'TimeslotInput',
  fields: () => ({
    ...baseTimeslotFields,
    artist: {
      type: new GraphQLNonNull(artistInputType)
    }
  })
});

export const timeslotUpdateType = new GraphQLInputObjectType({
  name: 'TimeslotUpdate',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    ...baseTimeslotFields
  })
});
