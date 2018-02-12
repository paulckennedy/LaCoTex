const graphql = require('graphql');
//const _ = require('lodash');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean
} = graphql;

const BASE_URL = 'http://localhost:3000';
//const users = [
//  { id: '23', firstName: 'Peter', lastName: 'Resler', emailAddress: 'paresler@hotmail.com'},
//  { id: '48', firstName: 'Paul', lastName: 'Kennedy', emailAddress: 'paulcalvinkennedy@gmail.com'}
//];

const SeriesType = new GraphQLObjectType({
  name: 'Series',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "alias": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "name": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
  })
});

const SeasonType = new GraphQLObjectType({
  name: 'Season',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "year": { type: GraphQLInt}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
  })
});

const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    "name": { type: GraphQLString},
    "completed": { type: GraphQLInt},
    "distance": { type: GraphQLFloat},
    "banking": { type: GraphQLString},
    "frontstretch": { type: GraphQLInt},
    "backstretch": { type: GraphQLInt},
    "seating": { type: GraphQLInt},
    "address": { type: GraphQLString},
    "city": { type: GraphQLString},
    "state": { type: GraphQLString},
    "zip": { type: GraphQLString},
    "surface": { type: GraphQLString},
    "track_type": { type: GraphQLString},
    "owner": { type: GraphQLString},
    "id": { type: GraphQLString}
  })
});

const BroadcastType = new GraphQLObjectType({
  name: 'Broadcast',
  fields: () => ({
    "network": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "satellite": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "radio": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
  })
});

const RacesType = new GraphQLObjectType({
  name: 'Races',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "name": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "status": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "distance": { type: GraphQLInt}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "laps": { type: GraphQLInt}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "scheduled": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "broadcast": { type: new GraphQLList(BroadcastType)}
    })
});

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "name": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "start_date": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "track": { type: TrackType },
    "races": {
        type: new GraphQLList(RacesType)
      }
  })
});

const SchedulesType = new GraphQLObjectType({
  name: 'Schedules',
  fields: () => ({
    "series": { type: SeriesType}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "season": { type: SeasonType}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "events": {
      type: new GraphQLList(EventType),
      resolve(parentValue, args){
        return axios.get(`${BASE_URL}/schedules`)
          .then(res => res.data)
          .then(schedules => schedules.events);
      }
    }
  })
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "name": { type: GraphQLString} //"David",
  })
});

const ManufacturerType = new GraphQLObjectType({
  name: 'Manufacturer',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "name": { type: GraphQLString} //"David",
  })
});

const EngineType = new GraphQLObjectType({
  name: 'Engine',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "name": { type: GraphQLString} //"David",
  })
});

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "name": { type: GraphQLString} //"David",
  })
});

const CarType = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
    "number": { type: GraphQLInt}, //"38",
    "status": { type: GraphQLString}, //"ACT",
    "crew_chief": { type: GraphQLString}, //"Derrick Finley",
    "manufacturer": { type: ManufacturerType}, //"Derrick Finley",
    "engine": { type: EngineType}, //"Derrick Finley",
    "owner": { type: OwnerType}, //"Derrick Finley",
    "team": { type: TeamType} //"Derrick Finley",
  })
});

function getDriverByURL(relativeURL) {
  return axios.get(`${BASE_URL}${relativeURL}`)
    .then(res => res.data);
}

const DriverType = new GraphQLObjectType({
    name: 'Driver',
    fields: () => ({
      "id": { type: GraphQLString}, //"25884070-3ded-4fdc-9370-d09428ac95e4",
      "first_name": { type: GraphQLString}, //"David",
      "last_name": { type: GraphQLString}, //"Ragan",
      "full_name": { type: GraphQLString}, //"David Ragan",
      "height": { type: GraphQLInt}, //72,
      "birthday": { type: GraphQLString}, //"1985-12-24",
      "rookie_year": { type: GraphQLInt}, //2007,
      "gender": { type: GraphQLString}, //"M",
      "status": { type: GraphQLString}, //"ACT",
      "country": { type: GraphQLString}, //"UNITED STATES",
      "residence": { type: GraphQLString}, //"Huntersville, North Carolina, United States",
      "birth_place": { type: GraphQLString}, //"Unadilla, Georgia, United States",
      "hobbies": { type: GraphQLString}, //"Boxing, restoring old cars, hunting, fishing",
      "twitter": { type: GraphQLString}, //"@DavidRagan",
      "points_eligible": { type: GraphQLBoolean}, //true,
      "team": { type: TeamType}, //"Derrick Finley",
      "cars": {
        type: new GraphQLList(CarType),
        resolve(parentValue, args){
          return axios.get(`${BASE_URL}/driversdata/${parentValue.id}`)
            .then(res => res.data)
            .then(drivers => drivers.cars);
        }
      }
    })
  });


const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString},
    name: { type: GraphQLString},
    description: { type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return axios.get(`${BASE_URL}/companies/${parentValue.id}/users`)
          .then(res => res.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    lastName: { type: GraphQLString},
    emailAddress: { type: GraphQLString},
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`${BASE_URL}/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  })
});

const StandingsType = new GraphQLObjectType({
  name: 'Standings',
  fields: () => ({
    id	: { type: 	GraphQLString	},
    first_name	: { type: 	GraphQLString	},
    last_name	: { type: 	GraphQLString	},
    full_name	: { type: 	GraphQLString	},
    status	: { type: 	GraphQLString	},
    rank	: { type: 	GraphQLInt	},
    points	: { type: 	GraphQLInt	},
    starts	: { type: 	GraphQLInt	},
    wins	: { type: 	GraphQLInt	},
    poles	: { type: 	GraphQLInt	},
    stage_wins	: { type: 	GraphQLInt	},
    chase_bonus	: { type: 	GraphQLInt	},
    top_5	: { type: 	GraphQLInt	},
    top_10	: { type: 	GraphQLInt	},
    top_15	: { type: 	GraphQLInt	},
    top_20	: { type: 	GraphQLInt	},
    dnf	: { type: 	GraphQLInt	},
    laps_led	: { type: 	GraphQLInt	},
    laps_completed	: { type: 	GraphQLInt	},
    money	: { type: 	GraphQLInt	},
    avg_start_position	: { type: 	GraphQLInt	},
    avg_finish_position	: { type: 	GraphQLInt	},
    avg_laps_completed	: { type: 	GraphQLInt	},
    laps_led_pct	: { type: 	GraphQLInt	},
    in_chase	: { type: 	GraphQLString	}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(res => res.data);
      }
    },
    track: {
      type: TrackType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/tracks/${args.id}`)
          .then(res => res.data);
      }
    },
    drivers: {
      type: DriverType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/driversdata/${args.id}`)
          .then(res => res.data);
      }
    },
    standings: {
      type: StandingsType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/drivers-standings/${args.id}`)
          .then(res => res.data);
      }
    },
    schedules: {
      type: SchedulesType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/schedules`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
