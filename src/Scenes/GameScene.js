import 'phaser';
import Button from '../Objects/Button';
import { getLocalScore, saveLocalScore } from '../Helpers/localStorage';

let livesText;
let lives = 3;

let scoreText;
let score = getLocalScore();

let currentMap = 1;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {

    // preload map
    this.load.tilemapTiledJSON('map01', 'assets/tilemaps/level01.json');
    this.load.tilemapTiledJSON('map02', 'assets/tilemaps/level02.json');
    this.load.tilemapTiledJSON('map03', 'assets/tilemaps/level03.json');
    
    // preload images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');    
    this.load.image('spike', 'assets/images/spike.png');
    this.load.image('diamond', 'assets/images/diamond.png');
    
    // preload player
    this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');

  }

  create() {
    
    // create map
    const map = this.make.tilemap({ key: 'map0' + currentMap });

    // create tileset
    const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');

    // create background
    const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
    backgroundImage.setScale(2, 0.8);

    // create platform
    const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
    platforms.setCollisionByExclusion(-1, true);

    // add player to map
    this.player = this.physics.add.sprite(50, 300, 'player');
    this.player.setBounce(0.3); 
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);

    // add menu button
    this.menuButton = new Button(this, 680, 550, 'blueButton1', 'blueButton2', 'menu', 'Title');

    // walking animation
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'robo_player_',
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1
    });

    // idle animation
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 'robo_player_0' }],
      frameRate: 10,
    });

    // jump animation
    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 'robo_player_1' }],
      frameRate: 10,
    });

    // user input via cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // create a group for all spikes
    this.spikes = this.physics.add.group({ allowGravity: false, immovable: true });

    // create a group diamonds
    this.diamonds = this.physics.add.group({ allowGravity: false, immovable: true });

    // get spikes from the object layer of our tiled map
    const spikeObjects = map.getObjectLayer('Spikes')['objects'];
    spikeObjects.forEach(spikeObject => {
      const spike = this.spikes.create(spikeObject.x, spikeObject.y + 200 - spikeObject.height, 'spike').setOrigin(0, 0);
      spike.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
    });

    const diamondObjects = map.getObjectLayer('Diamonds')['objects'];
    diamondObjects.forEach(diamondObject => {
      const diamond = this.diamonds.create(diamondObject.x, diamondObject.y + 200 - diamondObject.height, 'diamond').setOrigin(0, 0);
      diamond.body.setSize(diamond.width, diamond.height - 20).setOffset(0, 20);
    });

    // display total lives and score
    livesText = this.add.text(20, 525, "lives: " + lives, { fontSize: '20px', fill: '#ffffff', });
    scoreText = this.add.text(20, 550, "score: " + score, { fontSize: '20px', fill: '#ffffff', });

    // add collision between the player and the spikes and the diamond
    this.physics.add.collider(this.player, this.spikes, hitSpikes, null, this);
    this.physics.add.collider(this.diamonds, this.player, collectDiamond, null, this);

    // reset variables and end game
    const gameOver = () => {
      lives = 3;
      score = 0;
      currentMap = 1;
      this.scene.start('GameOver');
    }
    
    function hitSpikes(player) {
      // set player to the beginning of the map
      player.setVelocity(0, 0);
      player.setX(50);
      player.setY(300);
      player.play('idle', true);
      player.setAlpha(0);
      let tw = this.tweens.add({ targets: player, alpha: 1, duration: 100, ease: 'Linear', repeat: 5, });

      // update total player lives
      lives -= 1;
      livesText.setText("lives: " + lives);

      // game over if no life
      if (lives == 0) {
        gameOver();
      }
      
    }

    function collectDiamond(diamond) {
      score += 3;
      scoreText.setText("score: " + score);

      saveLocalScore(score)
      currentMap +=1;

      if (score == 9) {
        gameOver();
      } else {
        this.scene.restart();
      }
    }

  }

  update() {
    // left or right keys
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      if (this.player.body.onFloor()) {
        this.player.play('walk', true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      if (this.player.body.onFloor()) {
        this.player.play('walk', true);
      }
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.onFloor()) {
        this.player.play('idle', true);
      }
    }

    // Player can jump while walking any direction by pressing the space bar
    if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.setVelocityY(-350);
      this.player.play('jump', true);
    }

    // If the player is moving to the right, keep them facing forward
    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
      // otherwise, make them face the other side
      this.player.setFlipX(true);
    }
  }

}
