
import os

def write_svg(filename, content):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w') as f:
        f.write(content.strip())

# Player frames
write_svg('assets/images/player_idle.svg', '<svg width="32" height="48" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="24" height="32" fill="#fff" /><rect x="8" y="0" width="16" height="16" fill="#fcc" /><rect x="6" y="16" width="20" height="4" fill="#00f" /></svg>')
write_svg('assets/images/player_walk1.svg', '<svg width="32" height="48" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="24" height="32" fill="#fff" /><rect x="8" y="0" width="16" height="16" fill="#fcc" /><rect x="2" y="32" width="10" height="8" fill="#000" /></svg>')
write_svg('assets/images/player_walk2.svg', '<svg width="32" height="48" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="24" height="32" fill="#fff" /><rect x="8" y="0" width="16" height="16" fill="#fcc" /><rect x="20" y="32" width="10" height="8" fill="#000" /></svg>')
write_svg('assets/images/player_jump.svg', '<svg width="32" height="48" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="24" height="32" fill="#fff" /><rect x="8" y="0" width="16" height="16" fill="#fcc" /><rect x="4" y="36" width="8" height="8" fill="#000" /><rect x="20" y="36" width="8" height="8" fill="#000" /></svg>')
write_svg('assets/images/player_celebrate.svg', '<svg width="32" height="48" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="24" height="32" fill="#fff" /><rect x="8" y="0" width="16" height="16" fill="#fcc" /><rect x="0" y="8" width="8" height="8" fill="#fcc" /><rect x="24" y="8" width="8" height="8" fill="#fcc" /></svg>')

# Backgrounds
write_svg('assets/images/bg_sky.svg', '<svg width="1024" height="768" xmlns="http://www.w3.org/2000/svg"><rect width="1024" height="768" fill="#000033" /><circle cx="100" cy="100" r="2" fill="#fff" /><circle cx="500" cy="200" r="1.5" fill="#fff" /><circle cx="800" cy="50" r="1" fill="#fff" /></svg>')
write_svg('assets/images/bg_manama.svg', '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><path d="M200 600 L250 150 L300 600 Z" fill="#222" /><path d="M320 600 L370 150 L420 600 Z" fill="#222" /><rect x="500" y="300" width="100" height="300" fill="#111" /></svg>')
write_svg('assets/images/bg_souq.svg', '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="400" width="200" height="200" fill="#422" /><rect x="150" y="350" width="100" height="50" fill="#a22" /><circle cx="200" cy="300" r="20" fill="#fa0" /></svg>')
write_svg('assets/images/bg_amwaj.svg', '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="500" width="800" height="100" fill="#0af" /><circle cx="100" cy="400" r="50" fill="#0f0" opacity="0.5" /></svg>')
write_svg('assets/images/bg_desert.svg', '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><path d="M0 600 Q200 400 400 600 T800 600" fill="#da2" /><rect x="500" y="400" width="100" height="20" fill="#888" /></svg>')
write_svg('assets/images/bg_vision.svg', '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#001" /><circle cx="400" cy="300" r="200" stroke="#0ff" fill="none" opacity="0.1" /></svg>')

# Items & Others
write_svg('assets/images/pearl.svg', '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12" fill="#fff" stroke="#0ff" stroke-width="2" /></svg>')
write_svg('assets/images/date.svg', '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="16" rx="12" ry="8" fill="#630" /></svg>')
write_svg('assets/images/drone.svg', '<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="32" height="8" rx="4" fill="#444" /><circle cx="12" cy="10" r="6" fill="#f00" /><circle cx="36" cy="10" r="6" fill="#f00" /></svg>')
write_svg('assets/images/sprite.svg', '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#aaa" opacity="0.6" /><circle cx="10" cy="12" r="2" fill="#fff" /><circle cx="22" cy="12" r="2" fill="#fff" /></svg>')
write_svg('assets/images/sandbot.svg', '<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="32" height="32" fill="#888" /><rect x="12" y="8" width="24" height="8" fill="#ff0" /></svg>')
write_svg('assets/images/shield.svg', '<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="none" stroke="#0ff" stroke-width="4" /></svg>')
write_svg('assets/images/speed.svg', '<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><path d="M10 24 L25 10 L25 20 L40 20 L25 40 L25 30 Z" fill="#ff0" /></svg>')
write_svg('assets/images/doublejump.svg', '<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><path d="M10 30 L24 10 L38 30 M10 40 L24 20 L38 40" fill="none" stroke="#f0f" stroke-width="4" /></svg>')
write_svg('assets/images/goal.svg', '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="0" width="32" height="64" rx="16" fill="none" stroke="#0f0" stroke-width="4" /><circle cx="32" cy="32" r="10" fill="#0f0" opacity="0.5" /></svg>')
write_svg('assets/images/key.svg', '<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="none" stroke="#fa0" stroke-width="4" /><rect x="25" y="10" width="20" height="10" fill="#fa0" /></svg>')
write_svg('assets/images/ground.svg', '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#333" /><rect width="64" height="8" fill="#0ff" opacity="0.5" /></svg>')

print("SVG assets generated.")
