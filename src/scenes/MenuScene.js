export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.image(width / 2, height / 2, 'background1').setAlpha(0.5).setDisplaySize(width, height);

        // Title
        this.add.text(width / 2, height * 0.25, 'BAHRAIN QUEST 2026', {
            fontSize: '72px',
            fill: '#fff',
            fontStyle: 'bold',
            stroke: '#00ffff',
            strokeThickness: 8
        }).setOrigin(0.5).setResolution(2);

        // Buttons
        const unlockAudio = () => {
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            if (!this.sound.get('bgm_menu') || !this.sound.get('bgm_menu').isPlaying) {
                this.safePlaySound('bgm_menu', { loop: true, volume: 0.3 });
            }
        };

        this.createButton(width / 2, height * 0.5, 'START GAME', () => {
            unlockAudio();
            this.scene.start('LevelSelectScene');
        });

        this.createButton(width / 2, height * 0.62, 'LEADERBOARD', () => {
            unlockAudio();
            this.showLeaderboard();
        });

        this.createButton(width / 2, height * 0.74, 'HOW TO PLAY', () => {
            unlockAudio();
            this.showHowToPlay();
        });

        // Credits
        this.add.text(width / 2, height - 30, 'Created by AI for Bahrain 2026', { fontSize: '16px', fill: '#888' }).setOrigin(0.5);

        // Auto-start music if already unlocked
        if (this.sound.context && this.sound.context.state === 'running') {
            if (!this.sound.get('bgm_menu') || !this.sound.get('bgm_menu').isPlaying) {
                this.safePlaySound('bgm_menu', { loop: true, volume: 0.3 });
            }
        }
    }

    safePlaySound(key, config) {
        try {
            if (this.cache.audio.exists(key)) {
                this.sound.play(key, config);
            }
        } catch (e) {
            console.error(`Failed to play sound "${key}":`, e);
        }
    }

    createButton(x, y, label, callback) {
        const btn = this.add.text(x, y, label, {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#00ffff44',
            padding: { x: 20, y: 10 }
        })
        .setResolution(2)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', callback)
        .on('pointerover', () => btn.setBackgroundColor('#00ffff88'))
        .on('pointerout', () => btn.setBackgroundColor('#00ffff44'));

        return btn;
    }

    showLeaderboard() {
        const { width, height } = this.scale;
        const overlay = this.add.container(0, 0).setDepth(10);

        overlay.add(this.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.8, 0x000000, 0.9).setOrigin(0.5));
        overlay.add(this.add.text(width / 2, height * 0.2, 'LOCAL LEADERBOARD', { fontSize: '32px', fill: '#0ff' }).setOrigin(0.5).setResolution(2));

        const highScores = JSON.parse(localStorage.getItem('highScores') || '{}');
        let yPos = height * 0.35;

        for (let i = 1; i <= 5; i++) {
            const score = highScores[i] || 0;
            overlay.add(this.add.text(width / 2, yPos, `Level ${i}: ${score}`, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setResolution(2));
            yPos += 40;
        }

        overlay.add(this.createButton(width / 2, height * 0.8, 'CLOSE', () => overlay.destroy()));

        const resetBtn = this.add.text(width / 2, height * 0.9, 'RESET ALL DATA', {
            fontSize: '18px',
            fill: '#f00'
        })
        .setOrigin(0.5)
        .setResolution(2)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            if (confirm('Are you sure you want to reset all progress and high scores?')) {
                localStorage.clear();
                overlay.destroy();
                this.showLeaderboard();
            }
        });
        overlay.add(resetBtn);
    }

    showHowToPlay() {
        const { width, height } = this.scale;
        const overlay = this.add.container(0, 0).setDepth(10);

        overlay.add(this.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.8, 0x000000, 0.9).setOrigin(0.5));

        const helpText = `
        HOW TO PLAY

        Desktop:
        - Arrow Keys / Space: Move & Jump

        Mobile:
        - On-screen Buttons to Move & Jump

        Objective:
        - Collect Energy Pearls & Dates
        - Avoid or Jump on Enemies
        - Reach the Green Goal (end of level)

        Power-ups:
        - Shield: Protects from one hit
        `;

        overlay.add(this.add.text(width / 2, height * 0.45, helpText, {
            fontSize: '20px',
            fill: '#fff',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5).setResolution(2));

        overlay.add(this.createButton(width / 2, height * 0.9, 'CLOSE', () => overlay.destroy()));
    }
}
