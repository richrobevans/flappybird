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
game.load.image("playerImg", "assets/jamesBond.gif");
    game.load.image("Border", "assets/shroom.jpg");

    game.load.audio("score", "assets/point.ogg");
    game.load.audio("Mario1", "assets/sm64_mario_haha.wav");

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

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    label_score = game.add.text(500, 20, "0",{font:"40px Arial", fill: "#FFFFFF"});

    player = game.add.sprite(100, 200, "playerImg");

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);

    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    // set the background colour of the scene
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {


}

function clickHandler(event) {
    game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler(event) {
    game.sound.play("Mario1");
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