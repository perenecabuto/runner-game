var STEP_SIZE = 4;
var Game = function() {};

Game.prototype = {
    constructor: Game,

    preload: function () {
        this.game.load.spritesheet('boy', 'assets/sprites/boy.png', 32, 32);
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'boy');
        this.player.anchor.setTo(0.5, 0.5);

        this.player.animations.add('walk-down', [0, 1, 2, 3], 20, true);
        this.player.animations.add('walk-left', [4, 5, 6, 7], 20, true);
        this.player.animations.add('walk-right', [8, 9, 10, 11], 20, true);
        this.player.animations.add('walk-up', [12, 13, 14, 15], 20, true);
        this.player.animations.add('stop', [0, 1], 10, true);

        //console.log(this.camera);
    },

    update: function() {

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.x -= STEP_SIZE;
            this.player.play('walk-left');
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.x += STEP_SIZE;
            this.player.play('walk-right');
        }
        //} if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            //this.player.y -= STEP_SIZE;
            //this.player.play('walk-up');
        //} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            //this.player.y += STEP_SIZE;
            //this.player.play('walk-down');
        //}

        if (this.player.x < -STEP_SIZE) {
            return;
        }

        this.player.x -= STEP_SIZE / 2;
    },

    render: function () {
        this.game.debug.spriteInfo(this.player, 20, 32);
    }
};
