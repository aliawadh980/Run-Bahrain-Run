export class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
    }

    create() {
        // Stop level music if playing
        this.sound.getAllPlaying().forEach(s => {
            if (s.key.startsWith('bgm_') && s.key !== 'bgm_menu') {
                s.stop();
            }
        });

        // Ensure menu music is playing if it was started
        const menuBgm = this.sound.get('bgm_menu');
        if (menuBgm && !menuBgm.isPlaying) {
            menuBgm.play();
        }

        const { width, height } = this.scale;

        // Background
        this.add.image(width / 2, height / 2, 'background3')
            .setAlpha(0.4)
            .setDisplaySize(width, height);

        // UI Container for centering
        const containerHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; padding: 2rem; box-sizing: border-box;">
                <div id="instructions-content" style="pointer-events: auto; width: 100%; max-width: 900px; display: flex; flex-direction: column; align-items: center;">
                </div>
            </div>
        `;

        const container = this.add.dom(0, 0).setOrigin(0, 0).createFromHTML(containerHTML);
        const contentArea = container.getChildByID('instructions-content');

        // Load the actual content from cache as HTML string
        contentArea.innerHTML = this.cache.html.get('instructions');

        const closeBtn = container.getChildByID('close-instructions');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.safePlaySound('collect', { volume: 0.5 });
                this.scene.start('MenuScene');
            });
            // Apply glass-button class if it doesn't have a good one
            closeBtn.classList.add('glass-button');
            closeBtn.style.width = 'auto';
            closeBtn.style.padding = '0.75rem 3rem';
        }
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
