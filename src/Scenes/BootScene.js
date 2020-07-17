/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/images/logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}