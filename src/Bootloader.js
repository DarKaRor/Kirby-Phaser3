class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        console.log('Bootloader');
        this.load.path = './assets/';
        this.load.audio('doubleJump', 'audio/doubleJump.wav');

        this.load.on('complete', () => {
            console.log('Bootloader: complete');
            this.scene.start('Test');
           
        });

       
    }

    create() {

    }
}
export default Bootloader;