
export const LevelData = {
    1: {
        name: 'Manama Skyline Sprint',
        width: 8000,
        platforms: [
            { x: 0, y: 568, width: 1200, type: 'ground' },
            { x: 1400, y: 568, width: 1000, type: 'ground' },
            { x: 2600, y: 568, width: 5400, type: 'ground' },
            // Elevated platforms
            { x: 400, y: 450, width: 200 },
            { x: 700, y: 350, width: 200 },
            { x: 1000, y: 450, width: 150 },
            { x: 1300, y: 300, width: 200 },
            { x: 1600, y: 400, width: 200 },
            { x: 1900, y: 300, width: 150 },
            { x: 2200, y: 450, width: 200 },
            { x: 2500, y: 350, width: 200 },
            { x: 2800, y: 250, width: 200 },
            { x: 3100, y: 350, width: 200 },
            { x: 3400, y: 450, width: 200 },
            { x: 3700, y: 300, width: 200 },
            { x: 4000, y: 400, width: 200 },
            { x: 4300, y: 300, width: 200 },
            { x: 4600, y: 450, width: 200 },
            { x: 4900, y: 350, width: 200 },
            { x: 5200, y: 250, width: 200 }
        ],
        collectibles: [
            { x: 450, y: 400, type: 'pearl' },
            { x: 750, y: 300, type: 'pearl' },
            { x: 1050, y: 400, type: 'pearl' },
            { x: 1350, y: 250, type: 'pearl' },
            { x: 1650, y: 350, type: 'pearl' },
            { x: 1950, y: 250, type: 'pearl' },
            { x: 2250, y: 400, type: 'pearl' },
            { x: 2550, y: 300, type: 'pearl' },
            { x: 2850, y: 200, type: 'pearl' },
            { x: 3150, y: 300, type: 'pearl' },
            { x: 3450, y: 400, type: 'pearl' },
            { x: 3750, y: 250, type: 'pearl' },
            { x: 4050, y: 350, type: 'pearl' },
            { x: 4350, y: 250, type: 'pearl' },
            { x: 4650, y: 400, type: 'pearl' },
            { x: 4950, y: 300, type: 'pearl' },
            { x: 5250, y: 200, type: 'pearl' }
        ],
        enemies: [
            { x: 800, y: 500, type: 'drone', range: 200 },
            { x: 1500, y: 500, type: 'drone', range: 200 },
            { x: 2000, y: 500, type: 'drone', range: 200 },
            { x: 3000, y: 500, type: 'drone', range: 300 },
            { x: 4000, y: 500, type: 'drone', range: 300 },
            { x: 5000, y: 500, type: 'drone', range: 300 }
        ],
        decorations: [
            { x: 200, y: 568, type: 'deco_palm' },
            { x: 1500, y: 568, type: 'deco_palm' },
            { x: 3000, y: 568, type: 'deco_palm' },
            { x: 255, y: 150, type: 'deco_turbine' },
            { x: 375, y: 150, type: 'deco_turbine' }
        ],
        goal: { x: 7800, y: 500, type: 'goal' }
    },
    2: {
        name: 'Souq Adventure',
        width: 9000,
        platforms: [
            { x: 0, y: 568, width: 800, type: 'ground' },
            { x: 1000, y: 568, width: 800, type: 'ground' },
            { x: 2000, y: 568, width: 1500, type: 'ground' },
            { x: 3700, y: 568, width: 1000, type: 'ground' },
            { x: 4900, y: 568, width: 2100, type: 'ground' },
            // Overhanging balconies
            { x: 300, y: 450, width: 100 },
            { x: 500, y: 350, width: 100 },
            { x: 1100, y: 400, width: 150 },
            { x: 1300, y: 300, width: 150 },
            { x: 1600, y: 400, width: 150 },
            { x: 2200, y: 350, width: 200 },
            { x: 2500, y: 250, width: 200 },
            { x: 2800, y: 350, width: 200 },
            { x: 3100, y: 450, width: 200 },
            { x: 4000, y: 400, width: 200 },
            { x: 4300, y: 300, width: 200 },
            { x: 5200, y: 400, width: 150 },
            { x: 5500, y: 300, width: 150 },
            { x: 5800, y: 400, width: 150 },
            { x: 6100, y: 350, width: 200 },
            { x: 6400, y: 250, width: 200 }
        ],
        collectibles: [
            { x: 350, y: 400, type: 'date' },
            { x: 550, y: 300, type: 'date' },
            { x: 1150, y: 350, type: 'date' },
            { x: 1350, y: 250, type: 'date' },
            { x: 2250, y: 300, type: 'date' },
            { x: 2550, y: 200, type: 'date' },
            { x: 4050, y: 350, type: 'date' },
            { x: 4350, y: 250, type: 'date' },
            { x: 5250, y: 350, type: 'date' },
            { x: 5550, y: 250, type: 'date' }
        ],
        enemies: [
            { x: 600, y: 500, type: 'sprite', range: 100 },
            { x: 1200, y: 500, type: 'sprite', range: 100 },
            { x: 2300, y: 500, type: 'sprite', range: 150 },
            { x: 4200, y: 500, type: 'sprite', range: 150 },
            { x: 5400, y: 500, type: 'sprite', range: 150 }
        ],
        decorations: [
            { x: 400, y: 400, type: 'deco_lantern' },
            { x: 1200, y: 350, type: 'deco_lantern' },
            { x: 2500, y: 300, type: 'deco_lantern' },
            { x: 4500, y: 400, type: 'deco_lantern' }
        ],
        goal: { x: 8800, y: 500, type: 'key' }
    },
    3: {
        name: 'Amwaj Islands Dash',
        width: 10000,
        platforms: [
            { x: 0, y: 568, width: 400, type: 'ground' },
            { x: 600, y: 500, width: 200 },
            { x: 900, y: 400, width: 200 },
            { x: 1200, y: 500, width: 200 },
            { x: 1500, y: 400, width: 200 },
            { x: 1800, y: 300, width: 150 },
            { x: 2100, y: 450, width: 200 },
            { x: 2400, y: 350, width: 200 },
            { x: 2700, y: 500, width: 400 },
            { x: 3300, y: 400, width: 200 },
            { x: 3600, y: 300, width: 200 },
            { x: 3900, y: 450, width: 200 },
            { x: 4200, y: 568, width: 800, type: 'ground' },
            { x: 5200, y: 450, width: 200 },
            { x: 5500, y: 350, width: 200 },
            { x: 5800, y: 250, width: 200 },
            { x: 6100, y: 350, width: 200 },
            { x: 6400, y: 450, width: 200 },
            { x: 6800, y: 568, width: 1200, type: 'ground' }
        ],
        collectibles: [
            { x: 650, y: 450, type: 'pearl' },
            { x: 1250, y: 450, type: 'pearl' },
            { x: 3350, y: 350, type: 'pearl' },
            { x: 5550, y: 300, type: 'pearl' }
        ],
        powerups: [
            { x: 1850, y: 250, type: 'shield' },
            { x: 4500, y: 500, type: 'speed' },
            { x: 6150, y: 300, type: 'shield' }
        ],
        enemies: [
            { x: 2800, y: 450, type: 'drone', range: 100 },
            { x: 4400, y: 500, type: 'drone', range: 200 },
            { x: 7200, y: 500, type: 'drone', range: 300 }
        ],
        decorations: [
            { x: 100, y: 568, type: 'deco_palm' },
            { x: 4200, y: 568, type: 'deco_palm' },
            { x: 6800, y: 568, type: 'deco_palm' }
        ],
        goal: { x: 9800, y: 500, type: 'goal' }
    },
    4: {
        name: 'Desert of the Future',
        width: 10000,
        platforms: [
            { x: 0, y: 568, width: 500, type: 'ground' },
            { x: 700, y: 450, width: 150 },
            { x: 1000, y: 350, width: 150 },
            { x: 1300, y: 250, width: 150 },
            { x: 1600, y: 350, width: 150 },
            { x: 1900, y: 450, width: 150 },
            { x: 2200, y: 568, width: 2000, type: 'ground' },
            { x: 4400, y: 450, width: 200 },
            { x: 4700, y: 350, width: 200 },
            { x: 5000, y: 250, width: 200 },
            { x: 5300, y: 350, width: 200 },
            { x: 5600, y: 450, width: 200 },
            { x: 6000, y: 568, width: 4000, type: 'ground' }
        ],
        collectibles: [
            { x: 1350, y: 200, type: 'date' },
            { x: 5050, y: 200, type: 'date' }
        ],
        powerups: [
            { x: 1050, y: 300, type: 'doublejump' },
            { x: 6500, y: 500, type: 'speed' }
        ],
        enemies: [
            { x: 2500, y: 500, type: 'sandbot', range: 400 },
            { x: 3000, y: 500, type: 'sandbot', range: 400 },
            { x: 3500, y: 500, type: 'sandbot', range: 400 },
            { x: 6800, y: 500, type: 'sandbot', range: 500 },
            { x: 7500, y: 500, type: 'sandbot', range: 500 }
        ],
        goal: { x: 9800, y: 500, type: 'goal' }
    },
    5: {
        name: 'Vision Hub 2026',
        width: 12000,
        platforms: [
            { x: 0, y: 568, width: 300, type: 'ground' },
            { x: 400, y: 450, width: 100 },
            { x: 600, y: 350, width: 100 },
            { x: 800, y: 250, width: 100 },
            { x: 1000, y: 350, width: 100 },
            { x: 1200, y: 450, width: 100 },
            { x: 1500, y: 568, width: 1000, type: 'ground' },
            { x: 2700, y: 450, width: 150 },
            { x: 3000, y: 350, width: 150 },
            { x: 3300, y: 250, width: 150 },
            { x: 3600, y: 350, width: 150 },
            { x: 3900, y: 450, width: 150 },
            { x: 4200, y: 568, width: 7800, type: 'ground' }
        ],
        collectibles: [
            { x: 850, y: 200, type: 'pearl' },
            { x: 3350, y: 200, type: 'pearl' }
        ],
        powerups: [
            { x: 1550, y: 500, type: 'shield' },
            { x: 4500, y: 500, type: 'doublejump' },
            { x: 6000, y: 500, type: 'speed' }
        ],
        enemies: [
            { x: 1800, y: 500, type: 'drone', range: 200 },
            { x: 5000, y: 500, type: 'drone', range: 500 },
            { x: 6000, y: 450, type: 'drone', range: 300, vertical: true },
            { x: 7000, y: 450, type: 'drone', range: 300, vertical: true },
            { x: 8000, y: 500, type: 'drone', range: 500 }
        ],
        decorations: [
            { x: 400, y: 300, type: 'deco_turbine' },
            { x: 4000, y: 200, type: 'deco_turbine' },
            { x: 8000, y: 300, type: 'deco_turbine' }
        ],
        goal: { x: 11800, y: 500, type: 'goal' }
    }
};
