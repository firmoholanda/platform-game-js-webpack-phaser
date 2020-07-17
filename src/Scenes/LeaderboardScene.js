import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { getScores } from '../Helpers/leaderboardAPI';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.title = this.add.text(0, 0, 'leaderboard', { fontSize: '32px', fontStyle: 'bold', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    this.title.displayOriginY = 210;

    getScores()
      .then(scores => {
        const arr = [];
        scores.map((user, i) => {
          arr.push(
            `${(i + 1).toString()}. ${user[1]}                      ${user[0].toString()}`,
          );
          return true;
        });

        const graphics = this.add.graphics();
        graphics.fillRect(235, 133, 320, 340);

        const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        const text = this.add.text(250, 150, arr, { fontFamily: 'Arial', color: '#fff', wordWrap: { width: 310 } }).setOrigin(0);

        text.setMask(mask);

        const zone = this.add.zone(235, 130, 320, 256).setOrigin(0).setInteractive();

        zone.on('pointermove', (pointer) => {
          if (pointer.isDown) {
            text.y += (pointer.velocity.y / 10);

            text.y = Phaser.Math.Clamp(text.y, -400, 300);
          }
        });
      });

    this.menuButton = new Button(this, 400, 530, 'blueButton1', 'blueButton2', 'menu', 'Title');
  }
}