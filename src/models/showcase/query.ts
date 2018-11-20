import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLFieldConfig,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';
import { ShowcaseModel } from '../showcase/model';
import { showcaseType } from '../showcase/type';
import { timeslotInputType } from '../timeslot/type';

export namespace query {
  export const showcases = {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(showcaseType))),
    args: {
      future: {
        type: GraphQLBoolean
      }
    },
    resolve: (_, args) => args.future ? new ShowcaseModel().getFutureShowcase() : new ShowcaseModel().getShowcases()
  };
  export const showcase = {
    type: showcaseType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: (_, args) => new ShowcaseModel().getShowcaseById(args.id)
  };
}

export namespace mutation {
  export const createShowcase: GraphQLFieldConfig<{}, {}> = {
    type: showcaseType,
    args: {
      date: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: new GraphQLNonNull(GraphQLString)
      },
      link: {
        type: GraphQLString
      },
      timeslots: {
        type: new GraphQLList(timeslotInputType)
      }
    },
    resolve: (_, args) => new ShowcaseModel().createShowcase(args.date, args.description, args.link, args.timeslots)
  };

  export const updateShowcase: GraphQLFieldConfig<{}, {}> = {
    type: showcaseType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      date: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: new GraphQLNonNull(GraphQLString)
      },
      link: {
        type: GraphQLString
      },
      timeslots: {
        type: new GraphQLList(timeslotInputType)
      }
    },
    resolve: (_, args) => new ShowcaseModel().updateShowcase(args.id, args.date, args.description, args.link, args.timeslots)
  };
}
