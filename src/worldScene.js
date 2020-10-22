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
    this.planet = this.add.sprite(512, 288, 'sprites', 'planet');
    this.player = this.add.sprite(512, 150, 'sprites', 'player');
    this.player.currentAngle = -90;
    this.player.jumpOffset = 0;
    this.player.jumpForce = 0;
    this.input.on('pointerdown', (e) => {
      if (!this.player.jumpOffset) {
        this.player.jumpForce = 12;
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
    const distanceFromCenter = 137 + this.player.jumpOffset;

    // position the player using trigonometry
    this.player.x = this.planet.x + distanceFromCenter * Math.cos(radians);
    this.player.y = this.planet.y + distanceFromCenter * Math.sin(radians);
  }
}
