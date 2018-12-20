/*
 * app.scoring
 * Joe Booth:  Angular Succinctly
 */
import { Component } from '@angular/core';         // Component metadata
import { ViewEncapsulation } from '@angular/core'; // Encapsulation enum
import { SoccerService } from '../services/soccerService';
import { Title } from '@angular/platform-browser';
import { Ranking } from '../interfaces/rankings';
import { Schedule } from '../interfaces/schedule';
import { WebService } from '../services/WebService';


  @Component({
    encapsulation: ViewEncapsulation.ShadowDom,       // Use Shadow DOM
    templateUrl: '../Views/scoring.html',             // HTML Template name
    styles: [` h3 {text-align:center;color:navy;
                  font-size:x- large;margin:0px;font-weight:bold;}
            select { font-size:large;margin-left:25px;} `],
    providers: [Title,SoccerService,WebService]
   })
export class AppScoring {


  private UsingAsync: boolean = false;
  private CurGame: number = 0;

  public LeagueName: string;
  public HomeTeam: string;
  public AwayTeam: string;
  public HomeScore: number =0;
  public AwayScore: number =0;
  public SeasonStart: Date = new Date;
  public CurrentRole: number=1;
  public IPAddr: string;
  public ErrMsg: string;
  public MD5Hash: string;
  public MySchedule: Schedule[];


    public constructor( private _titleService: Title,
                        private _soccerService: SoccerService,
                        private _web: WebService ) {
        this._titleService.setTitle("422 Soccer");
        this.LeagueName = "Over 30 men's league";
        _web.getIP().subscribe( IP => this.IPAddr = IP);

        this.getSchedule();
        if (this.MySchedule.length > 0) {
          this.UpdVariables(0);    // Default to first game in drop-down list
          this.CurGame=1;
       }
     }
     public onSchedChange(GameValue:number) {
      if (GameValue>0)
      {
        this.UpdVariables(GameValue);
        this.CurGame = GameValue;
      }
    }
    // Get the score from the form and update it
    public onRecordScores() {
      this.MySchedule[this.CurGame-1].AwayScore = Number(this.AwayScore);
      this.MySchedule[this.CurGame-1].HomeScore = Number(this.HomeScore);
    }

    // Update screen variable based on current game
    private UpdVariables(GameID: number) {

         // Need to search Schedule array, looking for game ID
         var x : number =0;
         if (GameID >0) {
           x = GameID-1;
         }

         this.HomeTeam = this.MySchedule[x].HomeTeam;
         this.AwayTeam = this.MySchedule[x].AwayTeam;
         this.HomeScore = this.MySchedule[x].HomeScore;
         this.AwayScore = this.MySchedule[x].AwayScore;
    }



      // Get the schedule (only showing games not yet scored)
      private getSchedule() {
        if (this.UsingAsync) {
          //  let xx = this._soccerService.getScheduleAsnyc();
          //   xx.then((Schedules:Schedule[])=> this.MySchedule =Schedules );
        }
        else
        {
         this.MySchedule = this._soccerService.getSchedule();
        }
      }
}
