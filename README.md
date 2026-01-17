# Bahrain Quest 2026

Bahrain Quest 2026 is a 2D side-scrolling platformer web game built with Phaser 3. It celebrates Bahrain's culture and futuristic vision, following the journey of Faris, a young explorer.

## AI Disclaimer
This project was created 100% by AI.
- The initial concept and requirements were provided by a user via Microsoft Copilot.
- The entire implementation, including code, asset generation (SVGs), and logic, was performed by **Jules** (an AI software engineer from Google).

## Features
- **5 Unique Levels**: From the Manama Skyline to the Vision Hub 2026.
- **Original Assets**: All visual assets are original SVGs designed to capture Bahraini culture and futuristic innovation.
- **Responsive Design**: Playable on both desktop (Keyboard) and mobile (Touch controls).
- **Progress Saving**: Your level progress and high scores are saved locally in your browser.

## Future To-Do List
- [ ] **Global Leaderboard**: Implement a backend to support worldwide player rankings.
- [ ] **Multiplayer Mode**: Add real-time or asynchronous multiplayer racing/competition.
- [ ] **Additional Characters**: Unlock more playable characters with unique abilities.
- [ ] **Narrative Cutscenes**: Add story elements between levels to deepen the lore.

## How to Play
- **Desktop**: Use Arrow Keys to move and Space to jump.
- **Mobile**: Use the on-screen virtual joystick and buttons.
- Collect **Energy Pearls** and **Golden Dates** for points.
- Avoid drones and other obstacles!

## How to Run on Your PC (For Beginners)

If you want to play this game on your own computer, follow these simple steps:

### 1. Download the Code
- Click the green **Code** button at the top of this GitHub page.
- Select **Download ZIP**.
- Once downloaded, **unzip/extract** the folder to your Desktop.

### 2. Open a Terminal (Command Prompt)
- **Windows**: Press the `Start` key, type `cmd`, and press Enter.
- **Mac/Linux**: Open the `Terminal` app.

### 3. Navigate to the Game Folder
Type `cd` followed by a space, then drag the folder you unzipped into the terminal window. It should look something like this:
```bash
cd C:\Users\YourName\Desktop\bahrain-quest-2026
```
Press **Enter**.

### 4. Start the Game Server
Type this command and press **Enter**:
```bash
python -m http.server 8000
```
*(If that doesn't work, try `python3 -m http.server 8000`)*

### 5. Play!
Open your web browser (Chrome, Safari, or Edge) and type this in the address bar:
```text
http://localhost:8000
```
The game should now load and you can start playing!

## Tech Stack
- **Engine**: Phaser 3
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3
- **Graphics**: SVG
