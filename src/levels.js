export const LevelData = {
    1: {
        name: 'Manama Skyline Sprint',
        width: 3000,
        platforms: [
            { x: 0, y: 568, width: 3000, type: 'ground' },
            { x: 400, y: 450, width: 200 },
            { x: 700, y: 350, width: 200 },
            { x: 1000, y: 450, width: 150 },
            { x: 1300, y: 300, width: 200 },
            { x: 1600, y: 400, width: 200 },
            { x: 1900, y: 300, width: 150 },
            { x: 2200, y: 450, width: 200 },
            { x: 2500, y: 350, width: 200 }
        ],
        collectibles: [
            { x: 450, y: 400, type: 'pearl' },
            { x: 750, y: 300, type: 'pearl' },
            { x: 1050, y: 400, type: 'pearl' },
            { x: 1350, y: 250, type: 'pearl' },
            { x: 1650, y: 350, type: 'pearl' },
            { x: 1950, y: 250, type: 'pearl' },
            { x: 2250, y: 400, type: 'pearl' },
            { x: 2550, y: 300, type: 'pearl' }
        ],
        enemies: [
            { x: 800, y: 500, type: 'drone', range: 200 },
            { x: 1500, y: 500, type: 'drone', range: 200 },
            { x: 2000, y: 500, type: 'drone', range: 200 }
        ],
        goal: { x: 2800, y: 500 }
    },
    2: {
        name: 'Souq Adventure',
        width: 3200,
        platforms: [
            { x: 0, y: 568, width: 800, type: 'ground' },
            { x: 900, y: 568, width: 800, type: 'ground' },
            { x: 1800, y: 568, width: 1400, type: 'ground' },
            { x: 300, y: 450, width: 100 },
            { x: 500, y: 350, width: 100 },
            { x: 1000, y: 400, width: 150 },
            { x: 1200, y: 300, width: 150 },
            { x: 1500, y: 400, width: 150 },
            { x: 2000, y: 350, width: 200 },
            { x: 2300, y: 250, width: 200 }
        ],
        collectibles: [
            { x: 350, y: 400, type: 'date' },
            { x: 550, y: 300, type: 'date' },
            { x: 1050, y: 350, type: 'date' },
            { x: 1250, y: 250, type: 'date' }
        ],
        enemies: [
            { x: 600, y: 500, type: 'sprite', range: 100 },
            { x: 1100, y: 500, type: 'sprite', range: 100 },
            { x: 2100, y: 500, type: 'sprite', range: 150 }
        ],
        goal: { x: 3000, y: 500 }
    },
    3: {
        name: 'Amwaj Islands Dash',
        width: 3500,
        platforms: [
            { x: 0, y: 568, width: 400, type: 'ground' },
            { x: 600, y: 500, width: 200 },
            { x: 900, y: 400, width: 200 },
            { x: 1200, y: 500, width: 200 },
            { x: 1500, y: 400, width: 200 },
            { x: 1800, y: 300, width: 100 }, // Bubble shield here
            { x: 2100, y: 400, width: 200 },
            { x: 2500, y: 568, width: 1000, type: 'ground' }
        ],
        collectibles: [
            { x: 650, y: 450, type: 'pearl' },
            { x: 1250, y: 450, type: 'pearl' }
        ],
        powerups: [
            { x: 1850, y: 250, type: 'shield' },
            { x: 2200, y: 300, type: 'speed' }
        ],
        enemies: [
            { x: 2600, y: 500, type: 'drone', range: 300 }
        ],
        goal: { x: 3300, y: 500 }
    },
    4: {
        name: 'Desert of the Future',
        width: 4000,
        powerups: [
            { x: 1200, y: 250, type: 'doublejump' }
        ],
        platforms: [
            { x: 0, y: 568, width: 500, type: 'ground' },
            { x: 600, y: 450, width: 100 },
            { x: 800, y: 350, width: 100 },
            { x: 1000, y: 250, width: 100 },
            { x: 1200, y: 350, width: 100 },
            { x: 1400, y: 450, width: 100 },
            { x: 1600, y: 568, width: 2400, type: 'ground' }
        ],
        collectibles: [
            { x: 1050, y: 200, type: 'date' }
        ],
        enemies: [
            { x: 1800, y: 500, type: 'sandbot', range: 400 },
            { x: 2200, y: 500, type: 'sandbot', range: 400 },
            { x: 2600, y: 500, type: 'sandbot', range: 400 }
        ],
        goal: { x: 3800, y: 500 }
    },
    5: {
        name: 'Vision Hub 2026',
        width: 5000,
        platforms: [
            { x: 0, y: 568, width: 300, type: 'ground' },
            { x: 400, y: 400, width: 100 },
            { x: 600, y: 300, width: 100 },
            { x: 800, y: 400, width: 100 },
            { x: 1000, y: 500, width: 100 },
            { x: 1200, y: 300, width: 100 },
            { x: 1400, y: 400, width: 100 },
            { x: 1600, y: 200, width: 100 },
            { x: 1800, y: 400, width: 100 },
            { x: 2000, y: 568, width: 3000, type: 'ground' }
        ],
        collectibles: [
            { x: 1650, y: 150, type: 'pearl' }
        ],
        enemies: [
            { x: 2500, y: 500, type: 'drone', range: 500 },
            { x: 3500, y: 450, type: 'drone', range: 500, vertical: true }
        ],
        goal: { x: 4800, y: 500 }
    }
};
