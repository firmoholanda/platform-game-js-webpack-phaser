/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'created by: firmo holanda', { fontSize: '26px', fill: '#fff' });
    this.madeByText2 = this.add.text(0, 0, 'a simple game, made using phaser framework', { fontSize: '26px', fill: '#fff' });

    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText2,
      this.zone,
    );

    this.madeByText.setY(1000);
    this.madeByText2.setY(1050);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 15000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText2,
      y: -250,
      ease: 'Power1',
      duration: 15000,
      delay: 1000,
      // eslint-disable-next-line func-names
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}