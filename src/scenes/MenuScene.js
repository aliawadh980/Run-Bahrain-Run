export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        const menuHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none;">
                <div style="pointer-events: auto; display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 500px;">
                    <header style="text-align: center; margin-bottom: 4rem;">
                        <h1 class="glow-text" style="font-family: 'Orbitron', sans-serif; font-size: 5rem; font-weight: 900; font-style: italic; color: #00f2ff; text-transform: uppercase; margin: 0; line-height: 1;">
                            Bahrain Quest
                            <span style="display: block; font-size: 3rem; color: white; letter-spacing: 0.3em; margin-top: 0.5rem;">2026</span>
                        </h1>
                    </header>
                    <nav style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
                        <button id="start-game" class="glass-button">Start Game</button>
                        <button id="leaderboard" class="glass-button">Leaderboard</button>
                        <button id="how-to-play" class="glass-button">How to Play</button>
                        <button id="settings" class="glass-button">Settings</button>
                    </nav>
                </div>
            </div>
        `;

        const menu = this.add.dom(width / 2, height / 2).createFromHTML(menuHTML);
        this.setupMenuButtons(menu);
    }

    setupMenuButtons(menu) {
        const unlockAudio = () => {
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            this.safePlaySound('bgm_menu', { loop: true, volume: 0.3 });
        };

        const buttons = {
            'start-game': () => this.scene.start('LevelSelectScene'),
            'leaderboard': () => this.showLeaderboard(),
            'how-to-play': () => this.scene.start('InstructionsScene'),
            'settings': () => console.log('Settings clicked')
        };

        for (const [id, action] of Object.entries(buttons)) {
            const btn = menu.getChildByID(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    unlockAudio();
                    action();
                });
            }
        }
    }

    showLeaderboard() {
        const highScores = JSON.parse(localStorage.getItem('highScores') || '{}');
        let scoresHTML = '';
        for (let i = 1; i <= 5; i++) {
            scoresHTML += `<p style="margin: 0.5rem 0; font-size: 1.2rem;">Level ${i}: ${highScores[i] || 0}</p>`;
        }

        const leaderboardModal = `
            <div class="glass-panel" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; padding: 2rem; color: white; text-align: center;">
                <h2 style="font-family: 'Orbitron', sans-serif; font-size: 2rem; color: #00f2ff; margin-bottom: 1.5rem;">Leaderboard</h2>
                <div style="margin-bottom: 2rem;">
                    ${scoresHTML}
                </div>
                <button id="close-leaderboard" class="glass-button" style="width: auto; padding: 0.5rem 2rem;">Close</button>
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
