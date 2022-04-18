import { Component, OnInit } from '@angular/core';
import { GolfApiService } from 'src/app/services/golf-api.service';

@Component({
    selector: 'app-score-card-choice',
    templateUrl: './score-card-choice.component.html',
    styleUrls: ['./score-card-choice.component.scss']
})
export class ScoreCardChoiceComponent implements OnInit
{
    courses: any = [];

    constructor(private golfApi: GolfApiService) { }

    ngOnInit(): void
    {
        this.getCourses();
    }

    getCourses()
    {
        this.golfApi.getCourses().subscribe(res =>
        {
            this.courses = res;
        });
    }
}
