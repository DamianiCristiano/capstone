import { Match } from 'src/app/interface/Match';
import { MatchService } from './../../service/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  matches: Match[][] = [];

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.matchService.getAllMatches().subscribe(matches => {
      const matchGroups: { [key: number]: Match[] } = {};
      console.log(matchGroups);

      matches.forEach(match => {
        const dayOfGames = match.dayOfGames;
        if (!matchGroups[dayOfGames]) {
          matchGroups[dayOfGames] = [];
        }
        matchGroups[dayOfGames].push(match);
      });

      // Assegna i match raggruppati alla variabile matches
      this.matches = Object.values(matchGroups);
      console.log(matches);
    });
  }

}

