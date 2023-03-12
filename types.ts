export interface MatchTime {
  status: string;
  starting_at: {
    date_time: string;
    date: string;
    time: string;
    timestamp: number;
    timezone: string;
  };
  minute: number;
  second: null;
  added_time: number;
  extra_minute: null;
  injury_time: null;
}

export interface Match {
  id: number;
  league_id: number;
  localteam_id: number;
  visitorteam_id: number;
  localteam_score: string;
  visitorteam_score: string;
  status: string;
  minute: number;
  starting_at: string;
  updated_at: string;
  time_status_priority: number;
  localteam_name: string;
  localteam_short_code: string;
  localteam_logo_path: string;
  visitorteam_name: string;
  visitorteam_short_code: string;
  visitorteam_logo_path: string;
  time_status: string;
  time_minute: number;
  match_id: number;
  time: string;
}

export interface League {
  league_id: number;
  unique_id: string;
  country_id: number;
  league_name: string;
  slug: string;
  icon: string;
  data: Match[];
}
