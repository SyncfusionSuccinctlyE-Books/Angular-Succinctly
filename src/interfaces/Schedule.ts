/**
 * Schedule interface
 * Joe Booth:  Angular Succinctly
 */
export interface Schedule{
    id: number;
    PlayingDate: Date;
    HomeTeam: string;
    AwayTeam: string;
    HomeScore: number;
    AwayScore: number;
    RefName: string;
    notes?: string;
}
