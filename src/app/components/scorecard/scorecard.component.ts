import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbData } from 'src/app/interfaces/db-data';
import { Player } from 'src/app/interfaces/player';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GolfApiService } from 'src/app/services/golf-api.service';

@Component({
    selector: 'app-scorecard',
    templateUrl: './scorecard.component.html',
    styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit
{
    gameSettings = {
        playerAmount: 1,
        players: [{ name: "Player1", difficulty: "men" }]
    }

    teeTypes = ["pro", "champion", "men", "women", "auto change location"]

    playerData: Player[] = <Player[]><unknown>[];
    dbPlayerData: Player[] = <Player[]><unknown>[];

    ready = false;

    courseId = 0;
    course;

    constructor(private golfApi: GolfApiService, private route: ActivatedRoute, private firestore: FirebaseService) { }

    ngOnInit(): void
    {
        this.firestore.setDbUrl(this.route.snapshot.params['id']);
        this.getCourse();
        this.getDbPlayerData();
    }

    getCourse()
    {
        this.golfApi.getCourse(this.route.snapshot.params['id']).subscribe(res =>
        {
            this.course = res;
        });
    }

    getDbPlayerData()
    {
        this.firestore.getSavedData().subscribe(res =>
        {
            this.dbPlayerData = res.playerData;
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

    loadGameFromDb()
    {
        this.playerData = this.dbPlayerData;
        this.ready = true;
    }

    saveGame()
    {
        //db -> courseid -> data
        //Save data to database in a collection with a key of the course id.
        let tempObj: DbData = {
            playerData: this.playerData
        }
        this.firestore.savePlayerData(tempObj);
    }
}
