export class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, 80, 'BAHRAIN QUEST 2026', { fontSize: '40px', fill: '#0ff' }).setOrigin(0.5);
        this.add.text(width / 2, 140, 'Select Level', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');

        const levels = [
            { id: 1, name: 'Manama Skyline Sprint' },
            { id: 2, name: 'Souq Adventure' },
            { id: 3, name: 'Amwaj Islands Dash' },
            { id: 4, name: 'Desert of the Future' },
            { id: 5, name: 'Vision Hub 2026' }
        ];

        levels.forEach((lvl, index) => {
            const isUnlocked = lvl.id === 1 || completedLevels.includes(lvl.id - 1);
            const color = isUnlocked ? '#0f0' : '#444';

            const btn = this.add.text(width / 2, 220 + (index * 60), `${lvl.id}. ${lvl.name}`, {
                fontSize: '24px',
                fill: color
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: isUnlocked });

            if (isUnlocked) {
                btn.on('pointerdown', () => {
                    this.scene.start('GameScene', { level: lvl.id });
                });

                btn.on('pointerover', () => btn.setScale(1.1));
                btn.on('pointerout', () => btn.setScale(1));
            } else {
                this.add.text(width / 2 + 200, 220 + (index * 60), 'Locked', { fontSize: '16px', fill: '#666' }).setOrigin(0.5);
            }
        });

        const backBtn = this.add.text(width / 2, height - 50, 'Back to Menu', { fontSize: '20px', fill: '#aaa' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}
