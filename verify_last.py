
import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={"width": 1024, "height": 768})
        page = await context.new_page()

        try:
            await page.goto("http://localhost:8000")
            await asyncio.sleep(2)
            await page.screenshot(path="/home/jules/verification/v_final_menu.png")

            # Click START
            await page.mouse.click(512, 384)
            await asyncio.sleep(1)
            await page.screenshot(path="/home/jules/verification/v_final_levels.png")

        except Exception as e:
            print(f"Test failed: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    os.makedirs("/home/jules/verification", exist_ok=True)
    asyncio.run(run())
