import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { Team } from './models';
import * as teamsActions from './actions';

export interface TeamsState {
  readonly loading: boolean;
  readonly data: Team[];
  readonly selected?: teamsActions.TeamSelectedPayload;
  readonly errors?: string;
}

const initialState: TeamsState = {
  loading: false,
  data: [],
  selected: undefined,
  errors: undefined,
};

export type TeamsAction = ActionType<typeof teamsActions>;

const reducer: Reducer<TeamsState, TeamsAction> = (state = initialState, action) => {
  switch (action.type) {
    case getType(teamsActions.fetchRequest): {
      console.log("teamsActions.fetchRequest");
      return { ...state, loading: true };
    }
    case getType(teamsActions.selectTeam): {
      return { ...state, loading: true };
    }
    case getType(teamsActions.fetchSuccess): {
      console.log("teamsActions.fetchSuccess", action);
      return { ...state, loading: false, data: action.payload.teams };
    }
    case getType(teamsActions.fetchError): {
      console.log("teamsActions.fetchError", action);
      return { ...state, loading: false, errors: action.payload };
    }
    case getType(teamsActions.teamSelected): {
      return { ...state, loading: false, selected: action.payload };
    }
    case getType(teamsActions.clearSelected): {
      return { ...state, selected: undefined };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
