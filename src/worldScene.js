/**
 * Represent the home screen of the game.
 *
 * @export
 * @class WorldScene
 * @extends {Phaser.Scene}
 */
export default class WorldScene extends Phaser.Scene {
  /**
   * Creates an instance of WorldScene.
   * @memberof WorldScene
   */
  constructor() {
    super('WorldScene');
  }

  /**
   * Creates the content of the WorldScene.
   *
   * @memberof WorldScene
   */
  create() {
    this.cameras.main.fadeIn(100);
    const stars = this.add.group({
      key: 'sprites',
      frame: ['star1', 'star2', 'star3', 'star4'],
      repeat: 25,
    });
    const rect = new Phaser.Geom.Rectangle(0, 0, 1024, 576);
    // eslint-disable-next-line new-cap
    Phaser.Actions.RandomRectangle(stars.getChildren(), rect);
    stars.getChildren().forEach((star) => {
      star.rotation = Math.random() * 3.14;
      star.scale = Math.random() * 0.2 + 0.2;
    });
    this.planet = this.add.sprite(512, 288, 'sprites', 'planet');
    this.player = this.add.sprite(512, 150, 'sprites', 'player1');
    this.player.currentAngle = -90;
    this.player.jumpOffset = 100;
    this.player.jumpForce = 0;
    this.anims.create({
      key: 'player',
      frames: [
        {key: 'sprites', frame: 'player1'},
        {key: 'sprites', frame: 'player2'},
        {key: 'sprites', frame: 'player3'},
        {key: 'sprites', frame: 'player4'},
        {key: 'sprites', frame: 'player5'},
        {key: 'sprites', frame: 'player4'},
        {key: 'sprites', frame: 'player3'},
        {key: 'sprites', frame: 'player2'},
      ],
      frameRate: 15,
      repeat: -1,
    });
    this.player.play('player');
    this.input.on('pointerdown', (e) => {
      if (!this.player.jumpOffset) {
        this.player.jumpForce = 10;
      }
    }, this);
  }

  /**
   * Updates the content of the WorldScene.
   *
   * @memberof WorldScene
   */
  update() {
    // adjusting player jump offset
    this.player.jumpOffset += this.player.jumpForce;

    // decreasing jump force due to gravity
    this.player.jumpForce -= 0.8;

    // if jumpOffset is less than zero, it means the player touched the ground
    if (this.player.jumpOffset < 0) {
      // setting jump offset to zero
      this.player.jumpOffset = 0;

      // there is no jump force
      this.player.jumpForce = 0;
    }

    // setting new player current angle according to current position and speed
    // eslint-disable-next-line new-cap
    this.player.currentAngle = Phaser.Math.Angle.WrapDegrees(
        this.player.currentAngle + 1,
    );
    this.player.angle = this.player.currentAngle + 90;

    // getting the same angle in radians
    // eslint-disable-next-line new-cap
    const radians = Phaser.Math.DegToRad(this.player.currentAngle);

    // determining the distance from the center
    const distanceFromCenter = 73 + this.player.jumpOffset;

    // position the player using trigonometry
    this.player.x = this.planet.x + distanceFromCenter * Math.cos(radians);
    this.player.y = this.planet.y + distanceFromCenter * Math.sin(radians);
  }
}
