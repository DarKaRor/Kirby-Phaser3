import Test from './scenes/Test.js';
import Bootloader from './Bootloader.js';

const config = {
    title: "Kirby",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 800,
        height: 800,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#ffffff",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500,
            },
            debug: true
        }
    },
    scene: [Bootloader, Test]
};

new Phaser.Game(config);