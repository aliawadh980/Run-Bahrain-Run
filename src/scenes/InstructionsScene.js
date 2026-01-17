export class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.image(width / 2, height / 2, 'background3')
            .setAlpha(0.4)
            .setDisplaySize(width, height);

        // UI Container for centering
        const containerHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; align-items: center; justify-content: center; pointer-events: none; padding: 2rem; box-sizing: border-box;">
                <div id="instructions-content" style="pointer-events: auto; width: 100%; max-width: 900px;">
                </div>
            </div>
        `;

        const container = this.add.dom(width / 2, height / 2).createFromHTML(containerHTML);
        const contentArea = container.getChildByID('instructions-content');

        // Load the actual content from cache
        const instructionsBody = this.add.dom(0, 0).createFromCache('instructions');
        contentArea.appendChild(instructionsBody.node);

        const closeBtn = container.getChildByID('close-instructions');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.scene.start('MenuScene');
            });
            // Apply glass-button class if it doesn't have a good one
            closeBtn.classList.add('glass-button');
            closeBtn.style.width = 'auto';
            closeBtn.style.padding = '0.75rem 3rem';
        }
    }
}
