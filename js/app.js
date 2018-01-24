"use strict";
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // Randomly choose speed between 50 & 200
    this.speed = Math.floor(Math.random() * (200 - 50)) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 505) {
        this.x = 0;
    } else {
        this.x = this.x + (this.speed * dt);
    }
    //if player position stays within 50 on X from Enemy and 30 on Y from Enemy game will reset
    if (player.x < this.x + 50 && player.x + 50 > this.x && player.y < this.y + 30 && player.y + 30 > this.y) {
        player.gameReset();
        allEnemies.forEach(function(item) {
            item.gameReset();
        });
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};
//gameReset method will put Enemy back to position 0 on x
Enemy.prototype.gameReset = function() {
    this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

}; // Now write your own player class

//Once player reaches position 30, player and enemies are going to reset
Player.prototype.update = function(dt) {
    if (this.y < 30) {
        this.gameReset();
        allEnemies.forEach(function(item) {
            item.gameReset();
        });
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
//gameReset method will put Player back to original position
Player.prototype.gameReset = function(x, y) {
    this.x = 200;
    this.y = 400;
};

//method will prevent Player to move off screen
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x >= 100) {
        this.x -= 100;
    }
    if (direction === 'up' && this.y >= 30) {
        this.y -= 83;
    }
    if (direction === 'right' && this.x <= 305) {
        this.x += 100;
    }
    if (direction === 'down' && this.y <= 350) {
        this.y += 83;
    }
};

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(1, 50);
var enemy2 = new Enemy(1, 130);
var enemy3 = new Enemy(1, 210);


var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player

var player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});