export class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'background3').setAlpha(0.7).setDisplaySize(width, height);

        this.load.html('instructions', 'assets/ui/instructions.html');
        this.load.once('complete', () => {
            const instructions = this.add.dom(width / 2, height / 2).createFromCache('instructions');
            instructions.getChildByID('close-instructions').addEventListener('click', () => {
                this.scene.start('MenuScene');
            });
        });
        this.load.start();
    }
}
