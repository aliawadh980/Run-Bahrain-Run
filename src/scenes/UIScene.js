export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: false });
    }

    init(data) {
        this.score = data.score || 0;
        this.level = data.level || 1;
    }

    create() {
        const { width, height } = this.scale;

        // 1. HUD
        this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setResolution(2);

        this.levelText = this.add.text(20, 60, `Level: ${this.level}`, {
            fontSize: '24px',
            fill: '#0ff',
            stroke: '#000',
            strokeThickness: 3
        }).setResolution(2);

        if (this.sys.game.device.input.touch) {
            this.scoreText.setX(width - 250);
            this.levelText.setX(width - 250);
        }

        // 2. Result Screen Container (Hidden by default)
        this.resultContainer = this.add.container(0, 0).setVisible(false).setDepth(1000);

        const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.8)
            .setInteractive(); // Block input to layers below
        this.resultContainer.add(overlay);

        this.resultTitle = this.add.text(width / 2, height * 0.35, '', {
            fontSize: '80px',
            fontWeight: 'bold'
        }).setOrigin(0.5).setResolution(2);
        this.resultContainer.add(this.resultTitle);

        this.resultSubtitle = this.add.text(width / 2, height * 0.5, '', {
            fontSize: '28px',
            fill: '#fff'
        }).setOrigin(0.5).setResolution(2);
        this.resultContainer.add(this.resultSubtitle);

        // Buttons
        this.btnAction = this.add.text(width / 2, height * 0.65, '', {
            fontSize: '40px',
            backgroundColor: '#00ffff',
            fill: '#000',
            padding: { x: 30, y: 15 }
        })
        .setOrigin(0.5)
        .setResolution(2)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.handleAction());
        this.resultContainer.add(this.btnAction);

        this.btnHome = this.add.text(width / 2, height * 0.8, 'BACK TO HOME', {
            fontSize: '24px',
            fill: '#aaa'
        })
        .setOrigin(0.5)
        .setResolution(2)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.stop('GameScene');
            this.scene.start('MenuScene');
        });
        this.resultContainer.add(this.btnHome);
    }

    updateScore(score) {
        this.score = score;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    showResult(title, subtitle, color, isGameOver) {
        this.isGameOverResult = isGameOver;
        this.resultTitle.setText(title);
        this.resultTitle.setColor(Phaser.Display.Color.IntegerToColor(color).rgba);
        this.resultSubtitle.setText(subtitle);
        this.btnAction.setText(isGameOver ? 'RETRY LEVEL' : 'NEXT LEVEL');

        this.resultContainer.setVisible(true);
        this.resultContainer.setAlpha(0);
        this.tweens.add({
            targets: this.resultContainer,
            alpha: 1,
            duration: 500
        });
    }

    handleAction() {
        this.scene.stop('GameScene');
        if (this.isGameOverResult) {
            this.scene.start('GameScene', { level: this.level });
        } else {
            this.scene.start('LevelSelectScene');
        }
    }
}
