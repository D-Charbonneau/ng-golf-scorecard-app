import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { GolfApiService } from 'src/app/services/golf-api.service';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";

@Component({
    selector: 'app-scorecard',
    templateUrl: './scorecard.component.html',
    styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit
{
    private companyRef: AngularFirestoreDocument<Player[]>;

    gameSettings = {
        playerAmount: 1,
        players: [{ name: "Player1", difficulty: "men" }]
    }

    teeTypes = ["pro", "champion", "men", "women", "auto change location"]

    playerData: Player[] = <Player[]><unknown>[];

    ready = false;

    courseId = 0;
    course;

    constructor(private golfApi: GolfApiService, private route: ActivatedRoute, private db: AngularFirestore) { }

    ngOnInit(): void
    {
        this.getCourse();
    }

    getCourse()
    {
        this.golfApi.getCourse(this.route.snapshot.params['id']).subscribe(res =>
        {
            this.course = res;
        });
    }

    changePlayerAmount(amount: number)
    {
        this.gameSettings.playerAmount += amount;
        this.playerAmountCheck();
    }

    playerAmountCheck()
    {
        while (this.gameSettings.playerAmount <= 0)
        {
            this.gameSettings.playerAmount = 1;
        }
        while (this.gameSettings.playerAmount >= 5)
        {
            this.gameSettings.playerAmount = 4;
        }

        while (this.gameSettings.players.length < this.gameSettings.playerAmount) //If a player is added
        {
            this.gameSettings.players.push({ name: "Player" + (this.gameSettings.players.length + 1), difficulty: "men" })
        }
        while (this.gameSettings.players.length > this.gameSettings.playerAmount) //If a player is removed
        {
            this.gameSettings.players.splice(this.gameSettings.playerAmount, 1);
        }
    }

    readyUp()
    {
        this.ready = true;

        for (let i = 0; i < this.gameSettings.playerAmount; i++)
        {
            let scoreArr = [0];
            for (let j = 1; j < 9 && j < this.course.data.holes.length; j++)
            {
                scoreArr.push(0);
            }
            this.playerData[i] = { name: this.gameSettings.players[i].name, difficulty: this.gameSettings.players[i].difficulty, scores: scoreArr }
        }
    }

    calculateTotalScore(playerIndex: number)
    {
        let total = 0;
        for (let i = 0; i < this.playerData[playerIndex].scores.length; i++)
        {
            total += this.playerData[playerIndex].scores[i];
        }
        return total;
    }

    scoreChanger(playerIndex: number, scoreIndex: number, amount: number)
    {
        this.playerData[playerIndex].scores[scoreIndex] += amount;
        this.scoreCheck(playerIndex, scoreIndex);
    }

    scoreCheck(playerIndex: number, scoreIndex: number)
    {
        if (this.playerData[playerIndex].scores[scoreIndex] < 0) this.playerData[playerIndex].scores[scoreIndex] = 0;
    }

    loadGame()
    {
        //Adjust gameSettings and then call ready up manually (You cannot use readyUp() because it will not keep the scores).
        this.gameSettings.playerAmount = 0; //db.id.playerData.length;
        this.gameSettings.players = [];
        for (let i = 0; i < 0 /* db.id.playerData.length */; i++)
        {
            this.gameSettings.players[i] = { name: "", difficulty: "" } /* TODO: Change to the database info */
        }
        this.ready = true;
    }

    saveGame()
    {
        //db -> courseid -> data
        //Save data to database in a collection with a key of the course id.

    }
}
