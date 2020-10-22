import Button from './button.js';

/**
 * Represent the title screen of the game.
 *
 * @export
 * @class TitleScene
 * @extends {Phaser.Scene}
 */
export default class TitleScene extends Phaser.Scene {
  /**
   * Creates an instance of TitleScene.
   * @memberof TitleScene
   */
  constructor() {
    super('TitleScene');
  }

  /**
   *
   *
   * @memberof TitleScene
   */
  create() {
    this.cameras.main.fadeIn(100);
    // this.add.image(512, 288, 'bg');
    // const music = this.sound.add('title', {
    //   loop: true,
    // });
    // music.volume = 0.5;
    // music.play();
    const play = new Button(this, 512, 480, 'sprites', 'playon');
    play.once('click', () => {
      play.disableInteractive();
      this.cameras.main.fadeOut(600);
    });
    this.input.keyboard.on('keydown', (event) => {
      event.preventDefault();
      this.cameras.main.fadeOut(300);
    });
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('WorldScene');
    });
  }
}
