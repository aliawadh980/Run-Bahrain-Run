export class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'background2').setAlpha(0.6).setDisplaySize(width, height);

        this.load.html('level-select', 'assets/ui/level-select.html');
        this.load.once('complete', () => {
            const levelSelect = this.add.dom(width / 2, height / 2).createFromCache('level-select');
            this.populateLevels(levelSelect);
            this.updateProgress(levelSelect);
            levelSelect.getChildByID('back-to-menu').addEventListener('click', () => {
                this.scene.start('MenuScene');
            });
        });
        this.load.start();
    }

    populateLevels(levelSelect) {
        const levelCardsContainer = levelSelect.getChildByID('level-cards');
        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');

        const levels = [
            { id: 1, name: 'Manama Skyline Sprint', icon: 'apartment', desc: '"The Concrete Jungle of 2026"' },
            { id: 2, name: 'Souq Adventure', icon: 'temple_hindu', desc: '"Tradition Meets Technology"' },
            { id: 3, name: 'Amwaj Islands Dash', icon: 'waves', desc: '"Azure Waters Await"' },
            { id: 4, name: 'Desert of the Future', icon: 'landscape', desc: '"Uncharted Dunes"' },
            { id: 5, name: 'Vision Hub 2026', icon: 'hub', desc: '"The Final Core"' }
        ];

        levels.forEach((level, index) => {
            const isUnlocked = level.id === 1 || completedLevels.includes(level.id - 1);
            const isCompleted = completedLevels.includes(level.id);
            const card = this.createLevelCard(level, isUnlocked, isCompleted);
            levelCardsContainer.append(card);
        });
    }

    createLevelCard(level, isUnlocked, isCompleted) {
        const cardHTML = `
            <div class="group relative card-hover bg-slate-900/80 border ${isUnlocked ? 'border-primary/50 hover:neon-glow' : 'border-slate-800'} w-64 p-6 rounded-xl flex flex-col items-center text-center ${isUnlocked ? 'cursor-pointer' : 'locked-card'}">
                ${isCompleted ? '<div class="absolute top-2 right-2"><span class="material-symbols-outlined text-primary font-bold">check_circle</span></div>' : ''}
                ${!isUnlocked ? '<div class="absolute inset-0 flex items-center justify-center z-20"><span class="material-symbols-outlined text-4xl text-white">lock</span></div>' : ''}
                <div class="w-full aspect-video bg-slate-800 rounded-lg mb-4 flex items-center justify-center"><span class="material-symbols-outlined text-6xl ${isUnlocked ? 'text-primary' : 'text-slate-600'}">${level.icon}</span></div>
                <h3 class="text-white font-bold text-lg mb-2">${level.name}</h3>
                <p class="text-xs ${isUnlocked ? 'text-slate-400' : 'text-slate-500'} mb-4 italic">${level.desc}</p>
                <div class="mt-auto w-full py-2 ${isUnlocked ? 'bg-primary text-slate-900' : 'bg-slate-800 text-slate-600'} font-bold text-sm rounded">${isCompleted ? 'REPLAY' : (isUnlocked ? 'START' : 'LOCKED')}</div>
            </div>
        `;
        const card = document.createElement('div');
        card.innerHTML = cardHTML;
        const cardElement = card.firstElementChild;

        if (isUnlocked) {
            cardElement.addEventListener('click', () => {
                this.scene.start('GameScene', { level: level.id });
            });
        }
        return cardElement;
    }

    updateProgress(levelSelect) {
        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');
        const progress = (completedLevels.length / 5) * 100;
        const progressBar = levelSelect.getChildByID('progress-bar');
        const progressText = levelSelect.getChildByID('progress-text');

        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${Math.round(progress)}% Progress`;
    }
}
