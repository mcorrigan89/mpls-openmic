import { Request } from 'express';
import { GraphQLFieldConfigMap, GraphQLInputFieldConfigMap, GraphQLNonNull, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInputObjectType } from 'graphql';
import { Showcase } from '../../entity/showcase';
import { timeslotType } from '../timeslot/type';
import { TimeslotModel } from '../timeslot/model';

const baseShowcaseFields: GraphQLFieldConfigMap<Showcase, Request> & GraphQLInputFieldConfigMap = {
  date: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  link: {
    type: GraphQLString
  },
};

export const showcaseType = new GraphQLObjectType({
  name: 'Showcase',
  description: 'Moto-i Showcase events',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    ...baseShowcaseFields,
    timeslots: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(timeslotType))),
      resolve: (source) => new TimeslotModel().getTimeslotByShowcaseId(source.id)
    }
  })
});

export const showcaseInputType = new GraphQLInputObjectType({
  name: 'ShowcaseInput',
  fields: () => baseShowcaseFields
});

export const showcaseUpdateType = new GraphQLInputObjectType({
  name: 'ShowcaseUpdate',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    ...baseShowcaseFields
  })
});
