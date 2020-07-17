/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { postScore } from '../Helpers/leaderboardAPI';
import { getLocalName, getLocalScore } from '../Helpers/localStorage';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const localName = getLocalName();
    const localScore = getLocalScore();

    this.add.image(400, 100, 'diamond').setAlpha(0.7);

    this.title = this.add.text(0, 0, 'game over', { fontSize: '32px', fontStyle: 'bold', fill: '#fff' });
    this.messageText = this.add.text(0, 0, 'thanks for playing');
    this.score = this.add.text(0, 0, `score: ${localScore}`, { fontSize: '30px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    // post score to api
    if (localScore > 0) {
      postScore(localName, localScore);
    }

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.messageText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.score,
      this.zone,
    );

    this.title.displayOriginY = 50;
    this.messageText.displayOriginY = -15;
    this.score.displayOriginY = -80;

    this.menuButton = new Button(this, 400, 530, 'blueButton1', 'blueButton2', 'menu', 'Title');
  }
}