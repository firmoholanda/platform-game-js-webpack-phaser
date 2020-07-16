import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { saveLocal } from '../Helpers/saveLocal';

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  preload() {
    this.load.html('nameForm', 'assets/text/nameForm.html');
  }


  create() {

    this.add.image(400, 100, 'diamond').setAlpha(0.7);

    this.title = this.add.text(0, 0, 'welcome, thanks for playing', { fontSize: '32px', fontStyle: 'bold', fill: '#fff' });
    this.messageText01 = this.add.text(0, 0, 'this is a simple game, made using phaser framework.' );
    this.messageText02 = this.add.text(0, 0, 'the objective of this game is to collect the diamond on the scene');
    this.messageText03 = this.add.text(0, 0, 'while trying to avoid the spikes. you start with 3 lives');
    this.messageText04 = this.add.text(0, 0, 'and if you hit the spikes, you lose one.');
    this.messageText05 = this.add.text(0, 0, 'each diamond gives you 3 scores.so, try to collect all of them.');
    this.messageText06 = this.add.text(0, 0, 'the game is over if you run out of lives or collect all the diamonds. have fun!');
    this.messageText07 = this.add.text(0, 0, 'please enter player name:', { fontSize: '18px', fontStyle: 'bold', fill: '#fff' });
    
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.messageText01,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.messageText02,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.messageText03,
      this.zone,
    );
    
    Phaser.Display.Align.In.Center(
      this.messageText04,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.messageText05,
      this.zone,
    );
    
    Phaser.Display.Align.In.Center(
      this.messageText06,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.messageText07,
      this.zone,
    );

    this.title.displayOriginY = 130;
    this.messageText01.displayOriginY = 90;
    this.messageText02.displayOriginY = 70;
    this.messageText03.displayOriginY = 50;
    this.messageText04.displayOriginY = 30;
    this.messageText05.displayOriginY = 10;
    this.messageText06.displayOriginY = -10;
    this.messageText07.displayOriginY = -100;

  

    this.add.dom(400, 450).createFromCache('nameForm');

    var imputTextElement = document.getElementById('nameField')
    imputTextElement.addEventListener('focusout', () => {
      saveLocal(imputTextElement.value, 0);
    });

    this.menuButton = new Button(this, 400, 530, 'blueButton1', 'blueButton2', 'play', 'Game');

  }

}