export class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
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

        // Load content from cache as HTML string
        contentArea.innerHTML = this.cache.html.get('settings');

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
            this.sound.setVolume(newSettings.master);
            this.sound.setMute(newSettings.mute);

            // Apply music volume to all playing BGMs
            this.sound.getAllPlaying().forEach(s => {
                if (s.key.startsWith('bgm_')) {
                    // Level BGMs use 0.3 base, Menu BGM uses 0.3 base
                    s.setVolume(newSettings.music * 0.3);
                }
            });
        };

        masterSlider.addEventListener('input', () => { updateTexts(); applySettings(); });
        musicSlider.addEventListener('input', () => { updateTexts(); applySettings(); });
        sfxSlider.addEventListener('input', () => {
            updateTexts();
            applySettings();
            // Play a small sfx preview
            if (!this.lastSfxPreview || this.time.now > this.lastSfxPreview + 200) {
                this.safePlaySound('collect', { volume: 0.3 });
                this.lastSfxPreview = this.time.now;
            }
        });
        muteToggle.addEventListener('change', () => {
            applySettings();
            this.safePlaySound('collect', { volume: 0.5 });
        });

        container.getChildByID('close-settings').addEventListener('click', () => {
            applySettings();
            this.safePlaySound('collect', { volume: 0.5 });
            this.scene.start('MenuScene');
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
