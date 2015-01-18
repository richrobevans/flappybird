// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(1000, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var label_score;
var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "assets/MarioPlayer2.jpg");
    game.load.image("Border", "assets/shroom.jpg");
    game.load.audio("score", "assets/point.ogg");
    game.load.audio("Mario1", "assets/sm64_mario_haha.wav");
    game.load.image("pipe","assets/pipe.png");
    game.load.audio("Game Over", "assets/sm64_game_over and music.wav");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.stage.setBackgroundColor("#3399FF");
    game.add.text(350, 180, "Not like Super Mario",{font:"40px Arial", fill: "#FFFFFF"});
    game.add.sprite(10, 10, "Border");
    game.add.sprite(10, 340, "Border");
    game.add.sprite(930, 10, "Border");
    game.add.sprite(930,340, "Border");

    game.input.onDown.add(clickHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);

    label_score = game.add.text(500, 20, "0",{font:"40px Arial", fill: "#FFFFFF"});

    player = game.add.sprite(100, 200, "playerImg");

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);

    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    pipes = game.add.group();
    //generate_pipe();

    pipe_interval = 2.25;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(player);
    //player.body.velocity.x = 0;
    player.body.velocity.y = -100;
    player.body.gravity.y = 200;


    // set the background colour of the scene
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    game.physics.arcade.overlap(player, pipes, game_over);


}

function clickHandler(event) {
    game.sound.play("Mario1");
}

function player_jump() {
    player.body.velocity.y = -200;
}

function changeScore () {
    score = score +1;
    label_score.setText(score.toString());
}

function moveRight() {
    player.x = player.x + 10
}

function moveLeft() {
    player.x = player.x - 10
}

function moveUp() {
    player.y = player.y - 10
}

function moveDown() {
    player.y = player.y + 10
}

function generate_pipe(){
    var gap = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap + 1) {
            add_pipe_block(800, count * 50);
        }
    }
    changeScore();

}

function add_pipe_block(x, y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function game_over() {
    game.add.text(350, 180, "At least your game is cooler than Alex's",{font:"50px Arial", fill: "#FFFFFF"});
    game.sound.play("Game Over");
    game.destroy();
}