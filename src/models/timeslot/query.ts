import {
  GraphQLNonNull,
  GraphQLFieldConfig,
} from 'graphql';
import { TimeslotModel } from './model';
import { timeslotType, timeslotUpdateType } from './type';

export namespace mutation {
  export const updateTimeslot: GraphQLFieldConfig<{}, {}> = {
    type: timeslotType,
    args: {
      timeslot: {
        type: new GraphQLNonNull(timeslotUpdateType)
      }
    },
    resolve: (_, args) => new TimeslotModel().updateTimeslot(args.timeslot)
  };
}
