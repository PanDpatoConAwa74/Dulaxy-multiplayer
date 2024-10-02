class User {
    static #instance;
    
    constructor() {
        if (User.#instance) {
            return User.#instance;
        }

        this.x = 100; 
        this.y = 100; 
        this.spriteWidth = 15; 
        this.spriteHeight = 18; 
        this.frameIndex = 0;  

        User.#instance = this;
    }

    move(event) {
        switch (event.key) {
            case 'ArrowUp':
                this.y -= 10;
                break;
            case 'ArrowDown':
                this.y += 10;
                break;
            case 'ArrowLeft':
                this.x -= 10;
                break;
            case 'ArrowRight':
                this.x += 10;
                break;
        }
    }

    getPosX() {
        return this.x;
    }

    getPosY() {
        return this.y;
    }

    updateFrame(numFrames) {
        this.frameIndex = (this.frameIndex + 1) % numFrames;
    }

    getFrame() {
        return this.frameIndex;
    }

    static getInstance() {
        if (!User.#instance) {
            User.#instance = new User();
        }
        return User.#instance;
    }
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const spriteSheet = new Image();
spriteSheet.src = 'Astronaut-Sheet.png'; 

const numFrames = 1;    
const animationSpeed = 10;  

const objeto = { x: 0, y: 200, width: 15, height: 18 };

window.addEventListener('keydown', (event) => {
    const user = User.getInstance();
    user.move(event); 
});

function checkCollision(user) {
    const x = user.getPosX();
    const y = user.getPosY();

    if (x < objeto.x + objeto.width &&
        x + user.spriteWidth * 2 > objeto.x &&
        y < objeto.y + objeto.height &&
        y + user.spriteHeight * 2 > objeto.y) {
        alert("Die");
    }
}

function updateSprite() {
    const user = User.getInstance();

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.drawImage(
        spriteSheet,                       
        user.getFrame() * user.spriteWidth, 0,  
        user.spriteWidth, user.spriteHeight,
        user.getPosX(), user.getPosY(),      
        user.spriteWidth * 2, user.spriteHeight * 2 
    );


    user.updateFrame(numFrames);
}

function gameLoop() {
    updateSprite();
    requestAnimationFrame(gameLoop);  
}

spriteSheet.onload = gameLoop;
