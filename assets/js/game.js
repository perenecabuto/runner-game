var STEP_SIZE = 2;
var Game = function() {};

Game.prototype = {
    constructor: Game,

    preload: function () {
        this.game.load.spritesheet('boy', 'assets/sprites/boy.png', 32, 32);
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 16, 'boy');
        this.player.anchor.setTo(0.5, 0.5);

        this.player.animations.add('walk-left', [4, 5, 6, 7], 20, true);
        this.player.animations.add('stop-left', [4, 5], true);
        this.player.animations.add('walk-right', [8, 9, 10, 11], 20, true);
        this.player.animations.add('stop-right', [8, 9], true);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.autoIncreaseWindSpeed();
        //console.log(this.player);
        //console.log(this.camera);
    },

    update: function() {
        if (!this.jumping && this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.jumping = true;
            this.player.body.velocity.y = -400;
            this.game.physics.arcade.gravity.y = 1000;
        } else if (this.player.body.y > this.world.height - this.player.body.height) {
            this.player.body.y = this.world.height - this.player.body.height;
            this.jumping = false;
            this.game.physics.arcade.gravity.y = 0;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.x -= STEP_SIZE;
            this.direction = 'left';
            this.player.play('walk-left');
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.x += STEP_SIZE;
            this.direction = 'right';
            this.player.play('walk-right');
        } else {
            this.player.play('stop-right');
        }

        if (this.player.body.x < this.world.x) {
            this.player.body.x = this.world.x;
        } else if (this.player.body.x > this.world.width - this.player.body.width) {
            this.player.body.x = this.world.width - this.player.body.width;
        }
    },

    render: function () {
        this.game.debug.spriteInfo(this.player, 20, 32);
    },

    autoIncreaseWindSpeed: function() {
        this.player.body.velocity.x -= 10;

        if (this.player.body.velocity.x > -100) {
            var that = this;
            setTimeout(function () {
                that.autoIncreaseWindSpeed()
            }, 5000);
        }
    }
};
