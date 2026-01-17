export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.image(width / 2, height / 2, 'background1')
            .setDisplaySize(width, height)
            .setAlpha(0.5);

        const containerHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; position: relative;">
                <div id="menu-content" style="pointer-events: auto; width: 100%; display: flex; flex-direction: column; align-items: center;">
                </div>
            </div>
        `;

        const container = this.add.dom(0, 0).setOrigin(0, 0).createFromHTML(containerHTML);
        const contentArea = container.getChildByID('menu-content');

        // Load content from cache
        const menuBody = this.add.dom(0, 0).createFromCache('menu');
        contentArea.appendChild(menuBody.node);

        this.setupMenuButtons(container);
    }

    setupMenuButtons(container) {
        const unlockAudio = () => {
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }

            // If any other BGM is playing (e.g. from level), stop it
            const currentBGM = this.sound.get('bgm_menu');
            if (!currentBGM || !currentBGM.isPlaying) {
                // Stop other BGMs first
                this.sound.getAllPlaying().forEach(s => {
                    if (s.key.startsWith('bgm_') && s.key !== 'bgm_menu') {
                        s.stop();
                    }
                });
                this.safePlaySound('bgm_menu', { loop: true, volume: 0.3 });
            }
        };

        const buttons = {
            'start-game': () => this.scene.start('LevelSelectScene'),
            'leaderboard': () => this.showLeaderboard(),
            'how-to-play': () => this.scene.start('InstructionsScene'),
            'settings': () => this.scene.start('SettingsScene')
        };

        for (const [id, action] of Object.entries(buttons)) {
            const btn = container.getChildByID(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    unlockAudio();
                    action();
                });
            }
        }
    }

    showLeaderboard() {
        const { width, height } = this.scale;
        const highScores = JSON.parse(localStorage.getItem('highScores') || '{}');
        let scoresHTML = '';
        for (let i = 1; i <= 5; i++) {
            scoresHTML += `<p style="margin: 0.5rem 0; font-size: 1.2rem;">Level ${i}: ${highScores[i] || 0}</p>`;
        }

        const leaderboardModal = `
            <div style="width: ${width}px; height: ${height}px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); pointer-events: auto;">
                <div class="glass-panel" style="width: 400px; padding: 2rem; color: white; text-align: center;">
                    <h2 style="font-family: 'Orbitron', sans-serif; font-size: 2rem; color: #00f2ff; margin-bottom: 1.5rem;">Leaderboard</h2>
                    <div style="margin-bottom: 2rem;">
                        ${scoresHTML}
                    </div>
                    <button id="close-leaderboard" class="glass-button" style="width: auto; padding: 0.5rem 2rem; margin: 0 auto;">Close</button>
                </div>
            </div>
        `;

        const modal = this.add.dom(0, 0).setOrigin(0, 0).createFromHTML(leaderboardModal);
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
