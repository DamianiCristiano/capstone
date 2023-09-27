export interface Match {
  id: number;
  dayOfGames: number;
  teamRId:  {
    id: number,
    league: String,
    name: String,
    nationality: String,
  };
  teamBId: {
    id: number,
    league: String,
    name: String,
    nationality: String,
  };
}
