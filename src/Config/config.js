import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
};