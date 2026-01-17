export class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    create() {
        const { width, height } = this.scale;

        // Background (re-use Menu background)
        this.add.image(width / 2, height / 2, 'background1')
            .setDisplaySize(width, height)
            .setAlpha(0.3);

        const containerHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; align-items: center; justify-content: center; pointer-events: none; padding: 2rem; box-sizing: border-box;">
                <div id="settings-content" style="pointer-events: auto; width: 100%; max-width: 600px;">
                </div>
            </div>
        `;

        const container = this.add.dom(0, 0).setOrigin(0, 0).createFromHTML(containerHTML);
        const contentArea = container.getChildByID('settings-content');

        const settingsBody = this.add.dom(0, 0).createFromCache('settings');
        contentArea.appendChild(settingsBody.node);

        this.setupControls(container);
    }

    setupControls(container) {
        const settings = JSON.parse(localStorage.getItem('gameSettings') || '{"master": 1, "music": 1, "sfx": 1, "mute": false}');

        const masterSlider = container.getChildByID('master-volume');
        const musicSlider = container.getChildByID('music-volume');
        const sfxSlider = container.getChildByID('sfx-volume');
        const muteToggle = container.getChildByID('mute-toggle');

        const masterVal = container.getChildByID('master-val');
        const musicVal = container.getChildByID('music-val');
        const sfxVal = container.getChildByID('sfx-val');

        // Set initial values
        masterSlider.value = settings.master;
        musicSlider.value = settings.music;
        sfxSlider.value = settings.sfx;
        muteToggle.checked = settings.mute;

        const updateTexts = () => {
            masterVal.innerText = `${Math.round(masterSlider.value * 100)}%`;
            musicVal.innerText = `${Math.round(musicSlider.value * 100)}%`;
            sfxVal.innerText = `${Math.round(sfxSlider.value * 100)}%`;
        };
        updateTexts();

        const applySettings = () => {
            const newSettings = {
                master: parseFloat(masterSlider.value),
                music: parseFloat(musicSlider.value),
                sfx: parseFloat(sfxSlider.value),
                mute: muteToggle.checked
            };
            localStorage.setItem('gameSettings', JSON.stringify(newSettings));

            // Apply to Phaser Sound Manager
            this.sound.volume = newSettings.master;
            this.sound.mute = newSettings.mute;

            // We can't easily set per-category volume in basic Phaser sound manager without groups,
            // but we can adjust playing sounds or store for future ones.
            // For now, let's just use Master Volume and Mute as primary controls.
        };

        masterSlider.addEventListener('input', () => { updateTexts(); applySettings(); });
        musicSlider.addEventListener('input', () => { updateTexts(); applySettings(); });
        sfxSlider.addEventListener('input', () => { updateTexts(); applySettings(); });
        muteToggle.addEventListener('change', () => { applySettings(); });

        container.getChildByID('close-settings').addEventListener('click', () => {
            applySettings();
            this.scene.start('MenuScene');
        });
    }
}
