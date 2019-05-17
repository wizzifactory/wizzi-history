import { createStandardAction } from 'typesafe-actions';
import { Team, Player } from './models';

const FETCH_REQUEST = '@@teams/FETCH_REQUEST';
const FETCH_SUCCESS = '@@teams/FETCH_SUCCESS';
const FETCH_ERROR = '@@teams/FETCH_ERROR';
const SELECT_TEAM = '@@teams/SELECT_TEAM';
const SELECTED = '@@teams/SELECTED';
const CLEAR_SELECTED = '@@teams/CLEAR_SELECTED';

export type TeamFetchSuccessPayload = {
    teams: Team[];
};
export type TeamFetchErrorPayload = string;

export type SelectTeamPayload = {
    team_id: string;
};
export type TeamSelectedPayload = {
    detail: Team;
    players: Player[];
};
export const fetchRequest = createStandardAction(FETCH_REQUEST)();
export const clearSelected = createStandardAction(CLEAR_SELECTED)();
export const fetchSuccess = createStandardAction(FETCH_SUCCESS)<TeamFetchSuccessPayload>();
export const fetchError = createStandardAction(FETCH_ERROR)<TeamFetchErrorPayload>();
export const selectTeam = createStandardAction(SELECT_TEAM)<SelectTeamPayload>();
export const teamSelected = createStandardAction(SELECTED)<TeamSelectedPayload>();
