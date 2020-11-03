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
    const stars = this.add.group({
      key: 'sprites',
      frame: ['star1', 'star2', 'star3', 'star4'],
      repeat: 50,
    });
    const rect = new Phaser.Geom.Rectangle(0, 0, 1024, 576);
    // eslint-disable-next-line new-cap
    Phaser.Actions.RandomRectangle(stars.getChildren(), rect);
    stars.getChildren().forEach((star) => {
      star.rotation = Math.random() * 3.14;
      star.scale = Math.random() * 0.2 + 0.2;
    });
    this.planet = this.add.sprite(512, 288, 'sprites', 'planet');
    this.planet.setInteractive();
    this.planet.on('pointerdown', (e) => {
      for (let i = 0; i < this.pickup1level; i += 1) {
        const pickup = this.add.sprite(512, 288, 'sprites', 'pickup1');
        this.pickups.push(pickup);
        pickup.currentAngle = Math.random() * 360;
        pickup.jumpOffset = 0;
        pickup.jumpForce = 16;
        pickup.value = 1;
      }
      for (let i = 0; i < this.pickup2level; i += 1) {
        const pickup = this.add.sprite(512, 288, 'sprites', 'pickup2');
        this.pickups.push(pickup);
        pickup.currentAngle = Math.random() * 360;
        pickup.jumpOffset = 0;
        pickup.jumpForce = 16;
        pickup.value = 10;
      }
      for (let i = 0; i < this.pickup3level; i += 1) {
        const pickup = this.add.sprite(512, 288, 'sprites', 'pickup3');
        this.pickups.push(pickup);
        pickup.currentAngle = Math.random() * 360;
        pickup.jumpOffset = 0;
        pickup.jumpForce = 16;
        pickup.value = 100;
      }
      for (let i = 0; i < this.pickup4level; i += 1) {
        const pickup = this.add.sprite(512, 288, 'sprites', 'pickup4');
        this.pickups.push(pickup);
        pickup.currentAngle = Math.random() * 360;
        pickup.jumpOffset = 0;
        pickup.jumpForce = 16;
        pickup.value = 1000;
      }
    }, this);
    this.player = this.add.sprite(512, 150, 'sprites', 'player1');
    this.player.currentAngle = -90;
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
    this.pickups = [];
    this.point = 0;
    this.pointText = this.add.text(512, 20, this.point, {
      fontSize: '128px',
      fontFamily: 'font',
    }).setOrigin(0.5);

    this.autocost = 25;
    this.autocostText = this.add.text(50, 20, this.autocost, {
      fontSize: '128px',
      fontFamily: 'font',
    }).setOrigin(0, 0.5);
    this.autoButton = this.add.sprite(20, 20, 'sprites', 'auto');
    this.autoButton.setInteractive();
    this.autoButton.on('pointerdown', (e) => {
      if (this.autocost < this.point) {
        this.point -= this.autocost;
        this.autocost *= 2;
        this.autolevel += 1;
        this.autocostText.text = this.autocost;
        this.pointText.text = this.point;
      }
    }, this);
    this.autolevel = 0;
    this.autotime = 0;

    this.pickup1cost = 150;
    this.pickup1costText = this.add.text(50, 70, this.pickup1cost, {
      fontSize: '128px',
      fontFamily: 'font',
    }).setOrigin(0, 0.5);
    this.pickup1Button = this.add.sprite(20, 70, 'sprites', 'pickup1');
    this.pickup1Button.setInteractive();
    this.pickup1Button.on('pointerdown', (e) => {
      if (this.pickup1cost < this.point) {
        this.point -= this.pickup1cost;
        this.pickup1cost *= 2;
        this.pickup1level += 1;
        this.pickup1costText.text = this.pickup1cost;
        this.pointText.text = this.point;
      }
    }, this);
    this.pickup1level = 1;

    this.pickup2cost = 900;
    this.pickup2costText = this.add.text(50, 120, this.pickup2cost, {
      fontSize: '128px',
      fontFamily: 'font',
    }).setOrigin(0, 0.5);
    this.pickup2Button = this.add.sprite(20, 120, 'sprites', 'pickup2');
    this.pickup2Button.setInteractive();
    this.pickup2Button.on('pointerdown', (e) => {
      if (this.pickup2cost < this.point) {
        this.point -= this.pickup2cost;
        this.pickup2cost *= 2;
        this.pickup2level += 1;
        this.pickup2costText.text = this.pickup2cost;
        this.pointText.text = this.point;
      }
    }, this);
    this.pickup2level = 0;
    this.pickup1level = 1;

    this.pickup3cost = 5400;
    this.pickup3costText = this.add.text(50, 170, this.pickup3cost, {
      fontSize: '128px',
      fontFamily: 'font',
    }).setOrigin(0, 0.5);
    this.pickup3Button = this.add.sprite(20, 170, 'sprites', 'pickup3');
    this.pickup3Button.setInteractive();
    this.pickup3Button.on('pointerdown', (e) => {
      if (this.pickup3cost < this.point) {
        this.point -= this.pickup3cost;
        this.pickup3cost *= 2;
        this.pickup3level += 1;
        this.pickup3costText.text = this.pickup3cost;
        this.pointText.text = this.point;
      }
    }, this);
    this.pickup3level = 0;

    this.pickup4cost = 32400;
    this.pickup4costText = this.add.text(50, 220, this.pickup4cost, {
      fontSize: '128px',
      fontFamily: 'font',
    }).setOrigin(0, 0.5);
    this.pickup4Button = this.add.sprite(20, 220, 'sprites', 'pickup4');
    this.pickup4Button.setInteractive();
    this.pickup4Button.on('pointerdown', (e) => {
      if (this.pickup4cost < this.point) {
        this.point -= this.pickup4cost;
        this.pickup4cost *= 2;
        this.pickup4level += 1;
        this.pickup4costText.text = this.pickup4cost;
        this.pointText.text = this.point;
      }
    }, this);
    this.pickup4level = 0;
  }

  /**
   * Updates the content of the WorldScene.
   *
   * @memberof WorldScene
   */
  update() {
    this.autotime += 1;
    if (this.autolevel > 0 && this.autotime > 100 / this.autolevel) {
      for (let i = 0; i < this.pickup1level; i += 1) {
        const pickup = this.add.sprite(512, 288, 'sprites', 'pickup1');
        this.pickups.push(pickup);
        pickup.currentAngle = Math.random() * 360;
        pickup.jumpOffset = 0;
        pickup.jumpForce = 16;
        pickup.value = 1;
      }
      for (let i = 0; i < this.pickup2level; i += 1) {
        const pickup = this.add.sprite(512, 288, 'sprites', 'pickup2');
        this.pickups.push(pickup);
        pickup.currentAngle = Math.random() * 360;
        pickup.jumpOffset = 0;
        pickup.jumpForce = 16;
        pickup.value = 10;
      }
      for (let i = 0; i < this.pickup3level; i += 1) {
        const pickup = this.add.sprite(512, 288, 'sprites', 'pickup3');
        this.pickups.push(pickup);
        pickup.currentAngle = Math.random() * 360;
        pickup.jumpOffset = 0;
        pickup.jumpForce = 16;
        pickup.value = 100;
      }
      for (let i = 0; i < this.pickup4level; i += 1) {
        const pickup = this.add.sprite(512, 288, 'sprites', 'pickup4');
        this.pickups.push(pickup);
        pickup.currentAngle = Math.random() * 360;
        pickup.jumpOffset = 0;
        pickup.jumpForce = 16;
        pickup.value = 1000;
      }
      this.autotime = 0;
    }
    this.pickups.forEach((pickup) => {
      // adjusting player jump offset
      pickup.jumpOffset += pickup.jumpForce;

      // decreasing jump force due to gravity
      pickup.jumpForce -= 1.8;

      // if (pickup.jumpOffset > 15) {
      // if jumpOffset is less than zero, it means the player touched the ground
      if (pickup.jumpOffset < 0) {
        // setting jump offset to zero
        pickup.jumpOffset = 0;

        // there is no jump force
        pickup.jumpForce = 0;
      }

      // eslint-disable-next-line new-cap
      pickup.angle = pickup.currentAngle + 90;

      // getting the same angle in radians
      // eslint-disable-next-line new-cap
      const radians = Phaser.Math.DegToRad(pickup.currentAngle);

      // determining the distance from the center
      const distanceFromCenter = pickup.jumpOffset + 140;

      // position the player using trigonometry
      pickup.x = this.planet.x + distanceFromCenter * Math.cos(radians);
      pickup.y = this.planet.y + distanceFromCenter * Math.sin(radians);

      // eslint-disable-next-line new-cap
      if (Phaser.Math.Distance.Between(
          pickup.x, pickup.y, this.player.x, this.player.y,
      ) < 60) {
        this.pickups.splice(this.pickups.indexOf(pickup), 1);
        pickup.destroy();
        this.point += pickup.value;
        this.pointText.text = this.point;
      }
    });

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
    const distanceFromCenter = 185;

    // position the player using trigonometry
    this.player.x = this.planet.x + distanceFromCenter * Math.cos(radians);
    this.player.y = this.planet.y + distanceFromCenter * Math.sin(radians);
  }
}
