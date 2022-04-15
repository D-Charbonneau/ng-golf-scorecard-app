import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { ScoreCardChoiceComponent } from './components/score-card-choice/score-card-choice.component';
import { HttpClientModule } from '@angular/common/http';
import { ScorecardComponent } from './components/scorecard/scorecard.component';
import { DuplicateNamesPipePipe } from './pipes/duplicate-names-pipe.pipe';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        ScoreCardChoiceComponent,
        ScorecardComponent,
        DuplicateNamesPipePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig), // <-- add this
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
