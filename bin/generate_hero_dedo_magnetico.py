#!/usr/bin/env python3
"""Gera hero image (1376x768 16:9) para a landing Dedo Magnetico via Gemini Nano Banana Pro.
Tema: casal apaixonado em momento intimo e consciente — estilo Ariana Mystic editorial.
Output: public/dedo-magnetico/hero-background.webp (convertido via Pillow)
"""
from __future__ import annotations
import base64
import io
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "dedo-magnetico"
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT = OUT_DIR / "hero-background.webp"


def load_env() -> dict:
    env = dict(os.environ)
    for fn in (".env", ".env.local"):
        p = ROOT / fn
        if p.exists():
            for line in p.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                env.setdefault(k.strip(), v.strip().strip('"').strip("'"))
    if not env.get("GEMINI_API_KEY"):
        sys.exit("GEMINI_API_KEY missing")
    return env


PROMPT = """Generate a 1376x768 (16:9) editorial photograph for a women's psychology landing page about healthy, conscious relationships.

SCENE: An intimate, calm moment between a couple in love. Soft embrace with foreheads gently touching OR hands intertwined close to faces OR couple resting heads together in stillness. The composition emphasizes emotional safety, presence and conscious connection — NOT passion, NOT romance-cliche, NOT kisses.

STYLE — Ariana Mystic, editorial fine art photography:
- Deep moody warm-dark background (gradient from #2C2C2C charcoal to #1a1820 deep aubergine-black)
- Warm dusty rose / champagne gold halo of light bathing the subjects (suggesting magnetic warmth and intimacy)
- Couple in low-key chiaroscuro lighting — silhouettes or partial profiles, faces SOFTLY OBSCURED in shadow, never sharp stock-photo portraits
- Soft focus, shallow depth of field, photorealistic with cinematic moody twilight light
- Magazine-cover quality, contemplative and sacred atmosphere
- Mostly empty negative space on top and sides (image will be used as a hero background with text overlay)

DO NOT INCLUDE: explicit faces, smiling portraits, kisses, eye contact with the camera, neon, tech aesthetic, 3D rendering, hands in literal heart-shape, beach sunsets, wedding rings, white couples or specific ethnicities (keep silhouettes ambiguous), modern interiors visible, clothes in bright colors.

PURELY: contemplative, intimate, magnetic, magazine-editorial photographic quality with warm twilight tones — feels like a psychotherapy book cover about conscious love.

Aspect ratio: 16:9 (1376x768 landscape). 8K rendering quality, photorealistic moody candlelit lighting."""


def main() -> None:
    env = load_env()
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        sys.exit("pip install google-genai")

    try:
        from PIL import Image
    except ImportError:
        sys.exit("pip install Pillow")

    client = genai.Client(api_key=env["GEMINI_API_KEY"])
    print(f"Gerando {OUT.name}...")

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=PROMPT,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE"],
                image_config=types.ImageConfig(aspect_ratio="16:9"),
            ),
        )
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                data = part.inline_data.data
                if isinstance(data, str):
                    data = base64.b64decode(data)
                img = Image.open(io.BytesIO(data)).convert("RGB")
                img.save(OUT, "WEBP", quality=85, method=6)
                kb = OUT.stat().st_size // 1024
                print(f"  OK  {OUT.relative_to(ROOT)} ({img.size[0]}x{img.size[1]}, {kb}KB)")
                return
        sys.exit("  ERRO  nenhuma imagem retornada")
    except Exception as e:
        sys.exit(f"  ERRO  {e}")


if __name__ == "__main__":
    main()
