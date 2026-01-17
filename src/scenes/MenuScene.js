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

        // Load content from cache as HTML string
        contentArea.innerHTML = this.cache.html.get('menu');

        this.setupMenuButtons(container);
    }

    setupMenuButtons(container) {
        const manageMusic = () => {
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }

            // Get existing instances of menu music
            const bgms = this.sound.getAll('bgm_menu');

            // Stop and remove all but one if multiple exist
            if (bgms.length > 1) {
                bgms.forEach((s, index) => {
                    if (index > 0) {
                        s.stop();
                        this.sound.remove(s);
                    }
                });
            }

            const menuBgm = this.sound.get('bgm_menu');
            const settings = JSON.parse(localStorage.getItem('gameSettings') || '{"music": 1}');
            const targetVolume = (settings.music !== undefined ? settings.music : 1) * 0.3;

            // If music is already playing, just update volume and return
            if (menuBgm && menuBgm.isPlaying) {
                menuBgm.setVolume(targetVolume);
                return;
            }

            // Stop any other BGMs (from levels)
            this.sound.getAllPlaying().forEach(s => {
                if (s.key.startsWith('bgm_') && s.key !== 'bgm_menu') {
                    s.stop();
                }
            });

            // Play menu music
            this.safePlaySound('bgm_menu', {
                loop: true,
                volume: targetVolume
            });
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
                    this.safePlaySound('collect', { volume: 0.5 });
                    manageMusic();
                    action();
                });
            }
        }

        // Also try to start music immediately on scene creation (might be blocked by browser)
        manageMusic();
    }

    showLeaderboard() {
        if (this.leaderboardOpen) return;
        this.leaderboardOpen = true;

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
            this.safePlaySound('collect', { volume: 0.5 });
            this.leaderboardOpen = false;
            modal.destroy();
        });
    }

    safePlaySound(key, config) {
        if (this.cache.audio.exists(key)) {
            const settings = JSON.parse(localStorage.getItem('gameSettings') || '{"sfx": 1}');
            const finalConfig = config || {};
            if (!key.startsWith('bgm_')) {
                finalConfig.volume = (finalConfig.volume || 1) * (settings.sfx !== undefined ? settings.sfx : 1);
            }
            this.sound.play(key, finalConfig);
        }
    }
}
