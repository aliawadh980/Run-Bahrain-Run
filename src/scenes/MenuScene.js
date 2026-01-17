export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'background1').setAlpha(0.5).setDisplaySize(width, height);

        this.load.html('menu', 'assets/ui/menu.html');
        this.load.once('complete', () => {
            const menu = this.add.dom(width / 2, height / 2).createFromCache('menu');
            this.setupMenuButtons(menu);
        });
        this.load.start();
    }

    setupMenuButtons(menu) {
        const unlockAudio = () => {
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            this.safePlaySound('bgm_menu', { loop: true, volume: 0.3 });
        };

        const startGameBtn = menu.getChildByID('start-game');
        startGameBtn.addEventListener('click', () => {
            unlockAudio();
            this.scene.start('LevelSelectScene');
        });

        const leaderboardBtn = menu.getChildByID('leaderboard');
        leaderboardBtn.addEventListener('click', () => {
            unlockAudio();
            this.showLeaderboard();
        });

        const howToPlayBtn = menu.getChildByID('how-to-play');
        howToPlayBtn.addEventListener('click', () => {
            unlockAudio();
            this.scene.start('InstructionsScene');
        });

        const settingsBtn = menu.getChildByID('settings');
        settingsBtn.addEventListener('click', () => {
            unlockAudio();
            // Placeholder for settings
        });
    }

    showLeaderboard() {
        const highScores = JSON.parse(localStorage.getItem('highScores') || '{}');
        let scoresHTML = '';
        for (let i = 1; i <= 5; i++) {
            scoresHTML += `<p>Level ${i}: ${highScores[i] || 0}</p>`;
        }

        const leaderboardModal = `
            <div id="leaderboard-modal" class="glass-panel" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 500px; z-index: 100; padding: 2rem;">
                <h2 style="font-size: 2rem; color: var(--primary); text-align: center; margin-bottom: 1.5rem;">Leaderboard</h2>
                ${scoresHTML}
                <button id="close-leaderboard" class="glass-button" style="margin-top: 1.5rem; display: block; margin-left: auto; margin-right: auto;">Close</button>
            </div>
        `;

        const modal = this.add.dom(0, 0).createFromHTML(leaderboardModal).setOrigin(0);
        modal.getChildByID('close-leaderboard').addEventListener('click', () => {
            modal.destroy();
        });
    }

    safePlaySound(key, config) {
        if (this.cache.audio.exists(key)) {
            this.sound.play(key, config);
        }
    }
}
