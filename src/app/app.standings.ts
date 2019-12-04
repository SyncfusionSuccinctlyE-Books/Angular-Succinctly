/*
 * app.standings
 * Joe Booth:  Angular Succinctly
 */
import { Component } from "@angular/core"; // Component metadata
import { ViewEncapsulation } from "@angular/core"; // Encapsulation enum
import { Title } from "@angular/platform-browser";
import { Team } from "../interfaces/Teams";
import { SoccerService } from "../services/soccerService";
import { Ranking } from "../interfaces/rankings";
import { Schedule } from "../interfaces/Schedule";

  @Component({
    encapsulation: ViewEncapsulation.Native,       // Use Shadow DOM
    templateUrl: '../Views/Standings.html',    // HTML template name
   })
export class AppStandings {
  public UsingAsync: boolean = false;
  public MyTeams: Team[];
  public LeagueName: string;
  public MySchedule: Schedule[];
  public Standings: Ranking[];


  public constructor(private _titleService: Title,
                   private _soccerService: SoccerService ) {
    this._titleService.setTitle('422 Sportsplex');
    this.getTeams();
    this.LeagueName = 'Over 30 men\'s league';
    this.getSchedule();
    this.ComputeRankings();

    }
    getTeams() {
      if (this.UsingAsync) {
          let xx = this._soccerService.getAllTeamsAsync();
              xx.then((Teams:Team[])=> this.MyTeams =Teams );
      }
      else
      {
          this.MyTeams = this._soccerService.getAllTeams();
      }
   }
   private getSchedule() {
    if (this.UsingAsync) {
     let xx = this._soccerService.getScheduleAsnyc();
         xx.then((Schedules:Schedule[])=> this.MySchedule =Schedules );
    }
    else
    {
     this.MySchedule = this._soccerService.getSchedule();
    }
    }
    public ComputeRankings() {
      var curDate: Date = new Date();
      var TeamAt: number;
      this.Standings = [];                     // Empty the array
      this.MySchedule.forEach(element => {
         // If game has already been played
         if (element.PlayingDate < curDate && element.HomeScore >= 0)
         {
            TeamAt = this.FindTeam(element.HomeTeam);
            if (TeamAt<0)
            {
                this.Standings.push(  { TeamName: element.HomeTeam,
                                        GamesPlayed:0,Wins:0,Ties:0,
                                        GoalsFor:0,GoalsAgainst:0 } )
                TeamAt = this.Standings.length-1;
            }
      this.UpdCurrentRow(element,TeamAt,'H');
            TeamAt = this.FindTeam(element.AwayTeam);
            if (TeamAt<0)
            {
                this.Standings.push(  { TeamName: element.AwayTeam,
                                      GamesPlayed:0,Wins:0,Ties:0,
                                      GoalsFor:0,GoalsAgainst:0 } )
                TeamAt = this.Standings.length-1;
            }
            this.UpdCurrentRow(element,TeamAt,'A');
          }
       });


       // Sort standings
       this.Standings.sort((left, right): number =>
           {
             if (left.Wins*3+left.Ties<right.Wins*3+right.Ties) return 1;
             if (left.Wins*3+left.Ties>right.Wins*3+right.Ties) return -1;
             // Else, then are tied, typically we'd add addition logic to break Ties
             if (left.GoalsFor<right.GoalsFor) return 1;
             if (left.GoalsFor>right.GoalsFor) return -1;
             // Finally, return zero if still tied.
                  return 0;
           });
        };

  private UpdCurrentRow(element:Schedule,TeamAt:number,HomeAway:string) {
                this.Standings[TeamAt].GamesPlayed ++;
                if (HomeAway=='H') {
                  this.Standings[TeamAt].GoalsFor += element.HomeScore;
                  this.Standings[TeamAt].GoalsAgainst += element.AwayScore;
                  // Win
                  if (element.HomeScore>element.AwayScore)
                  {
                    this.Standings[TeamAt].Wins++;
                  }
                }
                if (HomeAway=='A') {
                  this.Standings[TeamAt].GoalsFor += element.AwayScore;
                  this.Standings[TeamAt].GoalsAgainst += element.HomeScore;
                  if (element.AwayScore>element.HomeScore)
                  {
                    this.Standings[TeamAt].Wins++;
                  }
                }
                if (element.HomeScore==element.AwayScore)
                {
                  this.Standings[TeamAt].Ties++;
                }
       }
  // Find the team or -1
       private FindTeam(TeamName:string) : number {
         var FoundAt: number = -1;
         for (var _x=0;_x < this.Standings.length;_x++)
         {
              if (this.Standings[_x].TeamName==TeamName) {
                return _x;
              }
         }
         return FoundAt;
       }

  }
