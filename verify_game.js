const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');

async function run() {
    // Start a simple server
    const server = http.createServer((req, res) => {
        let filePath = '.' + req.url;
        if (filePath === './') filePath = './index.html';

        const extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js': contentType = 'text/javascript'; break;
            case '.css': contentType = 'text/css'; break;
            case '.json': contentType = 'application/json'; break;
            case '.png': contentType = 'image/png'; break;
            case '.svg': contentType = 'image/svg+xml'; break;
            case '.jpg': contentType = 'image/jpg'; break;
            case '.mp3': contentType = 'audio/mpeg'; break;
        }

        fs.readFile(filePath, (error, content) => {
            if (error) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }).listen(8080);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        console.log('Navigating to game...');
        await page.goto('http://localhost:8080');
        await page.waitForTimeout(2000);

        const title = await page.title();
        console.log('Title:', title);

        // Check for "BAHRAIN QUEST 2026" text (rendered on canvas, so we can't easily check DOM)
        // But we can check if the canvas exists
        const canvas = await page.$('canvas');
        if (canvas) {
            console.log('Canvas found!');
        } else {
            console.error('Canvas not found!');
        }

        // Take a screenshot of the menu
        await page.screenshot({ path: 'menu_screenshot.png' });
        console.log('Screenshot taken: menu_screenshot.png');

    } catch (e) {
        console.error('Test failed:', e);
    } finally {
        await browser.close();
        server.close();
    }
}

run();
