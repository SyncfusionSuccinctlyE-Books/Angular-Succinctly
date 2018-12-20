/*
 * SoccerService
 * Joe Booth:  Angular Succinctly
 */
import { Injectable } from '@angular/core';
import { SEASON_SCHEDULE, TEAMS } from './Schedule-data';

@Injectable( {
    providedIn: 'root',
    }
)
export class SoccerService {

    getScheduleAsnyc() {
        return Promise.resolve(SEASON_SCHEDULE);
    }
    getSchedule() {
        return SEASON_SCHEDULE;
    }

    getAllTeamsAsync() {
        return Promise.resolve(TEAMS);
    }

    getAllTeams() {
        return TEAMS;
    }
}
