export class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene');
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
        this.add.image(width / 2, height / 2, 'background2')
            .setAlpha(0.3)
            .setDisplaySize(width, height);

        // UI Container for centering
        const containerHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; padding: 2rem; box-sizing: border-box;">
                <div id="level-select-content" style="pointer-events: auto; width: 100%; max-width: 1000px; display: flex; flex-direction: column; align-items: center;">
                </div>
            </div>
        `;

        const container = this.add.dom(0, 0).setOrigin(0, 0).createFromHTML(containerHTML);
        const contentArea = container.getChildByID('level-select-content');

        // Load the actual content from cache
        const levelSelectBody = this.add.dom(0, 0).createFromCache('level-select');
        contentArea.appendChild(levelSelectBody.node);

        this.populateLevels(container);
        this.updateProgress(container);

        const backBtn = container.getChildByID('back-to-menu');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.safePlaySound('collect', { volume: 0.5 });
                this.scene.start('MenuScene');
            });
        }
    }

    populateLevels(container) {
        const levelCardsContainer = container.getChildByID('level-cards');
        if (!levelCardsContainer) return;

        levelCardsContainer.innerHTML = ''; // Clear it
        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');

        const levels = [
            { id: 1, name: 'Manama Skyline', icon: 'apartment', desc: '"Concrete Jungle"' },
            { id: 2, name: 'Souq Adventure', icon: 'temple_hindu', desc: '"Tradition & Tech"' },
            { id: 3, name: 'Amwaj Dash', icon: 'waves', desc: '"Azure Waters"' },
            { id: 4, name: 'Desert Future', icon: 'landscape', desc: '"Uncharted Dunes"' },
            { id: 5, name: 'Vision Hub', icon: 'hub', desc: '"The Final Core"' }
        ];

        levels.forEach((level) => {
            const isUnlocked = level.id === 1 || completedLevels.includes(level.id - 1);
            const isCompleted = completedLevels.includes(level.id);
            const card = this.createLevelCard(level, isUnlocked, isCompleted);
            levelCardsContainer.append(card);
        });
    }

    createLevelCard(level, isUnlocked, isCompleted) {
        const cardHTML = `
            <div class="level-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}">
                <div class="card-icon">
                    <span class="material-icons">${level.icon}</span>
                </div>
                <h3 class="card-title">${level.name}</h3>
                <p class="card-desc">${level.desc}</p>
                <div class="card-status">${isCompleted ? 'REPLAY' : (isUnlocked ? 'START' : 'LOCKED')}</div>
                ${isCompleted ? '<div class="check-mark">✓</div>' : ''}
            </div>
        `;
        const card = document.createElement('div');
        card.innerHTML = cardHTML;
        const cardElement = card.firstElementChild;

        if (isUnlocked) {
            cardElement.addEventListener('click', () => {
                this.safePlaySound('collect', { volume: 0.5 });
                this.scene.start('GameScene', { level: level.id });
            });
        }
        return cardElement;
    }

    updateProgress(container) {
        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');
        const progress = (completedLevels.length / 5) * 100;
        const progressBar = container.getChildByID('progress-bar');
        const progressText = container.getChildByID('progress-text');

        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressText) progressText.innerText = `${Math.round(progress)}% Progress`;
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
