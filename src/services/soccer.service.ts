/**
  * Soccer.Service
 * Joe Booth:  Angular Succinctly
 */
import { SEASON_SCHEDULE, TEAMS } from './Schedule-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoccerService {
  getScheduleAsnyc() {
    // return Promise.resolve(SEASON_SCHEDULE);
  }
  getSchedule() {
      return SEASON_SCHEDULE;
  }

  getTeamsAsync() {
      // return Promise.resolve(TEAMS);
  }

  getTeams() {
      return TEAMS;
  }

}
