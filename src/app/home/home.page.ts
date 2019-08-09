import { Component, OnInit } from '@angular/core';
import {Word} from '../models/word';
import { core } from '@angular/compiler';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
  data: any;
  totalWords: number = 1000;
  words: Array<Word> = [];
  keyWord: Array<Word> = [];

  answerIshidden = true;


  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get("data").then(d=>
		{
			if(d)
			{
        console.log('using local storage');
        //debugger;
				this.data = d;
        this.getRandom();
			}
			else
			{
        fetch('./assets/data.json').then(res => res.json())
        .then(json => {
          this.storage.set('data', json); 
          this.data = json;
          this.getRandom();
        });
      }
    });


/*
    if(this.storage.get("namssse")){
      
       
      //this.data = this.storage.get("data");
      
      
    }
    else{
      fetch('./assets/data.json').then(res => res.json())
      .then(json => {
        this.storage.set('data', json); 
        this.data = json;
        this.getRandom();
      });
    }
    
    */
    

  }

  getRandom() {
    this.totalWords = this.data.length;
    this.answerIshidden = true;
    this.words = [];
    this.keyWord = [];
    this.words.push(this.randomNumber());
    this.words.push(this.randomNumber());
    this.words.push(this.randomNumber());
    this.words.push(this.randomNumber());
    let randomKeyIndex = Math.floor(Math.random() * this.words.length)
    this.keyWord.push(this.words[randomKeyIndex]);
    //debugger;
  }

  randomNumber() {
    let randomIndex = Math.floor(Math.random() * this.data.length)
    return this.data[randomIndex]
  }

  checkAnswer(e) {
    //debugger;

    
    console.log(e.target.id);
    let correctId = this.keyWord[0].Number;
    if(e.target.id === correctId){
      if(this.answerIshidden != false){
        this.data.splice(correctId, 1);
        this.storage.set('data', this.data); 
      }
      
      this.getRandom();
      
    }
    else{
      this.answerIshidden = false;
    }
    
  }
}