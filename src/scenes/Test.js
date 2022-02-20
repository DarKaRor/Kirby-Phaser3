
class Test extends Phaser.Scene {
    constructor() {
        super({ key: 'Test' });
    }

    init() {
        console.log('Scene: Test');

    }

    preload() {
    }

    create() {
        let { width, height } = this.sys.game.config;
        this.floorHeight = 200;
        this.newHeight = 0;
        this.floor = this.add.rectangle(width / 2, height - this.floorHeight / 2, width, this.floorHeight, 0x000000);

        // Pink 
        this.player = this.add.circle(0, 0, 50, 0xFF00FF);
        this.floorCollision = this.add.circle(this.player.x, this.player.y + (this.player.height / 2) - 5, 10, 0x000000);

        // Create container for player and floorCollision
        this.playerContainer = this.add.container(0, 0, [this.player, this.floorCollision]);
        this.playerContainer.setSize(this.player.width, this.player.height);



        // Add physics
        this.physics.world.enable(this.playerContainer);
        this.playerContainer.body.collideWorldBounds = true;
        this.playerContainer.body.setBounce(.2)

        this.physics.add.existing(this.floorCollision);
        this.floorCollision.body.immovable = true;
        this.floorCollision.body.allowGravity = false;
        this.physics.add.existing(this.floor);
        this.floor.body.immovable = true;
        this.floor.body.moves = false;

        this.physics.add.collider(this.playerContainer, this.floor);

        this.cursor = this.input.keyboard.createCursorKeys();
        this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.cursor.z = this.input.keyboard.addKey(this.keyCodes.Z);


        this.player.speed = 300;
        this.player.jumpSpeed = -500;
        this.player.airJumpSpeed = -300;
        this.player.isGrounded = false;
        this.playerContainer.body.setGravityY(1000);
        this.player.isJump = false;
        this.player.jumpTimeCounter = 0;
        this.player.jumpTime = 200;
        this.player.currentJumpSpeed = this.player.jumpSpeed;
        this.player.isAir = false;

        this.cursor.z.on('down', this.jump, this);

        this.doubleJumpAudio = this.sound.add('doubleJump');

    }


    jump() {
        this.player.currentJumpSpeed = this.player.isGrounded ? this.player.jumpSpeed : this.player.airJumpSpeed;
        console.log(this.player.currentJumpSpeed);
        this.playerContainer.body.setGravityY(1000);
        if(!this.player.isGrounded){
            this.playRandomPitch(this.doubleJumpAudio);
            this.player.isAir = true;
            this.playerContainer.body.setGravityY(500);
        }
        this.player.isJump = true;
        this.player.jumpTimeCounter = this.player.jumpTime;
        this.playerContainer.body.setVelocityY(this.player.currentJumpSpeed);
        console.log(this.playerContainer.body.gravity);
    }

    playRandomPitch(audio) {
        audio.rate = Phaser.Math.FloatBetween(0.9, 1.1);
        // Allow the audio to overlap itself
        let copy = this.sound.add(audio.key, audio.config);
        copy.play();
    }

    checkOverlap(spriteA, spriteB) {
        let boundsA = spriteA.getBounds();
        let boundsB = spriteB.getBounds();

        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }

    update(time, delta) {
        let { config } = this.sys.game;
        let { width, height } = config;

        let inputX = 0;

        this.player.isGrounded = this.checkOverlap(this.floor, this.floorCollision);

        if (this.cursor.left.isDown) inputX = -1;
        if (this.cursor.right.isDown) inputX = 1;

        this.playerContainer.body.setVelocityX(inputX * this.player.speed);


        if (this.cursor.z.isDown && this.player.isJump) {
            if (this.player.jumpTimeCounter > 0) {
                this.playerContainer.body.setVelocityY(this.player.currentJumpSpeed);
                this.player.jumpTimeCounter -= delta;
                
            }
            else this.player.isJump = false;
            
        }

        if(this.cursor.z.isUp) {
            this.player.isJump = false;
        }




    }
}

export default Test;
