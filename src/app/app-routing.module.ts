import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreCardChoiceComponent } from './components/score-card-choice/score-card-choice.component';
import { ScorecardComponent } from './components/scorecard/scorecard.component';

const routes: Routes = [
    { path: "course/:id", component: ScorecardComponent },
    { path: "**", component: ScoreCardChoiceComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
