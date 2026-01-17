import { Assets } from '../assets.js';
import { LevelData } from '../levels.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.level = data.level || 1;
        this.score = 0;
        this.isGameOver = false;
        this.hasShield = false;
        this.canDoubleJump = false;
        this.jumpCount = 0;
        this.data = LevelData[this.level];
    }

    create() {
        const { width, height } = this.scale;
        const levelWidth = this.data.width;

        // 1. Parallax Backgrounds
        this.createParallaxBackground(levelWidth, height);

        // 2. Groups
        this.platforms = this.physics.add.staticGroup();
        this.collectibles = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.powerups = this.physics.add.group();

        // 3. Level Design
        this.buildLevel();

        // 4. Player
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);

        this.baseSpeed = 200;
        this.player.speed = this.baseSpeed;
        this.player.jumpForce = -450;

        // 5. Collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);

        this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.powerups, this.collectPowerup, null, this);

        // 6. Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.sys.game.device.input.touch) {
            this.createTouchControls();
        }

        // 7. UI
        this.scene.launch('UIScene', { score: this.score, level: this.level });

        // 8. Camera
        this.cameras.main.setBounds(0, 0, levelWidth, height);
        this.physics.world.setBounds(0, 0, levelWidth, height + 100);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // 9. Goal
        this.goal = this.physics.add.staticSprite(this.data.goal.x, this.data.goal.y, 'goal');
        this.physics.add.overlap(this.player, this.goal, this.levelComplete, null, this);

        // 10. Music
        this.sound.stopAll();
        this.safePlaySound('bgm', { loop: true, volume: 0.3 });
    }

    safePlaySound(key, config) {
        try {
            if (this.cache.audio.exists(key)) {
                this.sound.play(key, config);
            } else {
                console.warn(`Audio key "${key}" missing from cache. (CORS or Network issue?)`);
            }
        } catch (e) {
            console.error(`Failed to play sound "${key}":`, e);
        }
    }

    createParallaxBackground(totalWidth, height) {
        const bgKey = `background${this.level}`;
        // Scale 800x600 backgrounds to fill the 1024x768 height
        const scale = height / 600;
        const bgWidth = 800 * scale;

        for (let x = 0; x < totalWidth + bgWidth; x += bgWidth) {
            this.add.image(x, height / 2, bgKey)
                .setScrollFactor(0.5)
                .setScale(scale);
        }
    }

    buildLevel() {
        this.data.platforms.forEach(p => {
            const platform = this.platforms.create(p.x + (p.width || 64) / 2, p.y, 'ground');
            if (p.width) platform.setDisplaySize(p.width, 64);
            platform.refreshBody();
        });

        this.data.collectibles.forEach(c => {
            this.collectibles.create(c.x, c.y, c.type);
        });

        if (this.data.powerups) {
            this.data.powerups.forEach(p => {
                this.powerups.create(p.x, p.y, p.type);
            });
        }

        this.data.enemies.forEach(e => {
            const enemy = this.enemies.create(e.x, e.y, e.type);
            enemy.setBounce(1);
            enemy.setCollideWorldBounds(true);

            if (e.vertical) {
                enemy.setVelocityY(100);
                enemy.startY = e.y;
                enemy.range = e.range;
                enemy.isVertical = true;
            } else {
                enemy.setVelocityX(100);
                enemy.startX = e.x;
                enemy.range = e.range;
            }
        });
    }

    createTouchControls() {
        const { width, height } = this.scale;
        this.touchMove = { left: false, right: false, jump: false };
        const btnStyle = { radius: 40, color: 0xffffff, alpha: 0.2 };

        this.btnLeft = this.add.circle(60, height - 60, btnStyle.radius, btnStyle.color, btnStyle.alpha).setScrollFactor(0).setInteractive().setDepth(100);
        this.btnRight = this.add.circle(160, height - 60, btnStyle.radius, btnStyle.color, btnStyle.alpha).setScrollFactor(0).setInteractive().setDepth(100);
        this.btnJump = this.add.circle(width - 80, height - 80, 50, btnStyle.color, btnStyle.alpha).setScrollFactor(0).setInteractive().setDepth(100);

        this.add.text(60, height - 60, '<', { fontSize: '32px' }).setOrigin(0.5).setScrollFactor(0).setDepth(101).setResolution(2);
        this.add.text(160, height - 60, '>', { fontSize: '32px' }).setOrigin(0.5).setScrollFactor(0).setDepth(101).setResolution(2);
        this.add.text(width - 80, height - 80, 'JUMP', { fontSize: '20px' }).setOrigin(0.5).setScrollFactor(0).setDepth(101).setResolution(2);

        this.btnLeft.on('pointerdown', () => this.touchMove.left = true);
        this.btnLeft.on('pointerup', () => this.touchMove.left = false);
        this.btnRight.on('pointerdown', () => this.touchMove.right = true);
        this.btnRight.on('pointerup', () => this.touchMove.right = false);
        this.btnJump.on('pointerdown', () => this.touchMove.jump = true);
        this.btnJump.on('pointerup', () => this.touchMove.jump = false);
    }

    update() {
        if (this.isGameOver) return;

        if (this.cursors.left.isDown || (this.touchMove && this.touchMove.left)) {
            this.player.setVelocityX(-this.player.speed);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown || (this.touchMove && this.touchMove.right)) {
            this.player.setVelocityX(this.player.speed);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.player.body.touching.down) {
            this.jumpCount = 0;
        }

        const isJumpJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.cursors.space);
        const isTouchJump = this.touchMove && this.touchMove.jump;

        if (isJumpJustDown || isTouchJump) {
            if (this.player.body.touching.down) {
                this.performJump();
            } else if (this.canDoubleJump && this.jumpCount < 1) {
                this.performJump();
                this.jumpCount++;
            }
            if (this.touchMove) this.touchMove.jump = false;
        }

        this.enemies.getChildren().forEach(enemy => {
            if (enemy.isVertical) {
                if (enemy.y > enemy.startY + enemy.range) enemy.setVelocityY(-100);
                else if (enemy.y < enemy.startY - enemy.range) enemy.setVelocityY(100);
            } else {
                if (enemy.x > enemy.startX + enemy.range) {
                    enemy.setVelocityX(-100);
                    enemy.setFlipX(false);
                } else if (enemy.x < enemy.startX - enemy.range) {
                    enemy.setVelocityX(100);
                    enemy.setFlipX(true);
                }
            }
        });

        if (this.player.y > this.scale.height + 50) {
            this.gameOver();
        }
    }

    performJump() {
        this.player.setVelocityY(this.player.jumpForce);
        this.safePlaySound('jump');
        this.tweens.add({
            targets: this.player,
            scaleX: 0.8,
            scaleY: 1.2,
            duration: 100,
            yoyo: true
        });
    }

    collectItem(player, item) {
        item.disableBody(true, true);
        this.score += 10;
        this.safePlaySound('collect');
        this.scene.get('UIScene').updateScore(this.score);
    }

    collectPowerup(player, powerup) {
        const type = powerup.texture.key;
        powerup.disableBody(true, true);
        this.safePlaySound('collect');

        if (type === 'shield') {
            this.hasShield = true;
            this.player.setTint(0x00ffff);
        } else if (type === 'speed') {
            this.player.speed = this.baseSpeed * 1.5;
            this.player.setTint(0xffff00);
            this.time.delayedCall(5000, () => {
                this.player.speed = this.baseSpeed;
                this.player.clearTint();
            });
        } else if (type === 'doublejump') {
            this.canDoubleJump = true;
            this.player.setTint(0xff00ff);
            this.time.delayedCall(10000, () => {
                this.canDoubleJump = false;
                this.player.clearTint();
            });
        }
    }

    hitEnemy(player, enemy) {
        if (player.body.touching.down && enemy.body.touching.up) {
            enemy.disableBody(true, true);
            player.setVelocityY(-200);
            this.score += 20;
            this.safePlaySound('collect');
            this.scene.get('UIScene').updateScore(this.score);
        } else if (this.hasShield) {
            this.hasShield = false;
            this.player.clearTint();
            enemy.disableBody(true, true);
            this.safePlaySound('lose');
        } else {
            this.gameOver();
        }
    }

    gameOver() {
        if (this.isGameOver) return;
        this.isGameOver = true;
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.safePlaySound('lose');
        this.scene.get('UIScene').showResult('GAME OVER', 'Try again — Bahrain believes in you!', 0xff0000, true);
    }

    levelComplete() {
        if (this.isGameOver) return;
        this.isGameOver = true;
        this.physics.pause();
        this.player.setTint(0x00ff00);
        this.safePlaySound('win');

        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');
        if (!completedLevels.includes(this.level)) {
            completedLevels.push(this.level);
            localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
        }

        const highScores = JSON.parse(localStorage.getItem('highScores') || '{}');
        if (!highScores[this.level] || this.score > highScores[this.level]) {
            highScores[this.level] = this.score;
            localStorage.setItem('highScores', JSON.stringify(highScores));
        }

        this.scene.get('UIScene').showResult('LEVEL COMPLETE!', `Final Score: ${this.score}`, 0x00ff00, false);
    }
}
