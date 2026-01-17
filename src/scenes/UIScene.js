export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: false });
    }

    init(data) {
        this.score = data.score || 0;
        this.level = data.level || 1;
    }

    create() {
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '24px', fill: '#fff' }).setResolution(2);
        this.levelText = this.add.text(16, 48, `Level: ${this.level}`, { fontSize: '20px', fill: '#0ff' }).setResolution(2);

        // Mobile layout adjustment
        if (this.sys.game.device.input.touch) {
            this.scoreText.setX(this.scale.width - 200);
            this.levelText.setX(this.scale.width - 200);
        }
    }

    updateScore(score) {
        this.score = score;
        this.scoreText.setText(`Score: ${this.score}`);
    }
}
