import { Assets } from '../assets.js';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        const width = this.scale.width;
        const height = this.scale.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 80,
            text: 'Loading...',
            style: { font: '24px monospace', fill: '#ffffff' }
        }).setOrigin(0.5).setResolution(2);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00ffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        this.load.on('loaderror', (file) => {
            console.error('CRITICAL: Error loading asset:', file.key, file.src);
        });

        this.load.on('filecomplete-audio-bgm_menu', () => {
            console.log('Audio asset "bgm_menu" loaded successfully.');
        });

        // Load Images at 4x resolution for high-DPI screens
        for (let key in Assets.images) {
            this.load.svg(key, Assets.images[key], { scale: 4 });
        }

        // Load Audio
        for (let key in Assets.sounds) {
            this.load.audio(key, Assets.sounds[key]);
        }

        // Load UI HTML Templates
        this.load.html('menu', 'assets/ui/menu.html');
        this.load.html('instructions', 'assets/ui/instructions.html');
        this.load.html('level-select', 'assets/ui/level-select.html');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
