// Response object for GET /teams
// https://docs.opendota.com/#tag/teams%2Fpaths%2F~1teams%2Fget
export interface Team {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag?: string;
  logo_url?: string;
}

export interface Player {
  account_id: number;
  name: string;
  games_played: number;
  wins: number;
  is_current_team_member: boolean;
}
