import LoadScene from './loadScene.js';
import TitleScene from './titleScene.js';
import WorldScene from './worldScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#000',
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    width: 1024,
    height: 576,
  },
  scene: [
    LoadScene,
    TitleScene,
    WorldScene,
  ],
});
