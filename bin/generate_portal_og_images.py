#!/usr/bin/env python3
"""Gera 12 OG images (1200x630) para os portais usando Gemini Nano Banana Pro.
Estilo: Ariana Mystic (dark cosmic + gold + Playfair).
Output: public/og-portal-{id}.png
"""
from __future__ import annotations
import base64
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PORTALS_JSON = ROOT / "src/data/portals.json"
OUT_DIR = ROOT / "public"
OUT_DIR.mkdir(exist_ok=True)


def load_env():
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
        # fallback: check skill .env
        skill_env = Path.home() / ".claude/skills/ppt-generator/.env"
        if skill_env.exists():
            for line in skill_env.read_text().splitlines():
                if line.startswith("GEMINI_API_KEY="):
                    env["GEMINI_API_KEY"] = line.split("=", 1)[1].strip().strip('"')
                    break
    if not env.get("GEMINI_API_KEY"):
        sys.exit("GEMINI_API_KEY missing")
    return env


def build_prompt(portal: dict) -> str:
    return f"""Generate a high-end 1200x630 (16:9) Open Graph social media image for an Instagram-ready spiritual brand "Instituto Ariana Borges".

Theme: {portal['title']} — {portal['subtitle']}
Visual concept: {portal['ogImageHint']}

STYLE — Ariana Mystic (STRICT):
- Background: deep cosmic darkness, gradient from #0b0916 (near-black with purple) to #12102b (midnight blue-violet)
- Primary highlight: warm metallic gold #D4AF37 used for accents, dividers, key text, decorative elements
- Soft warm gold horizon glow at bottom, candlelit atmosphere
- Optional: subtle starfield, nebula textures, sacred geometry hints (very subtle)
- TEXT (large, centered): "{portal['title']}" in elegant Playfair Display serif, warm off-white #F9F7F2, breathable letter spacing
- Below title: italic subtitle "{portal['displayDate']} · {portal['displayTime']} · {portal['format']}" in soft gold, smaller
- Above title: tiny uppercase tracked eyebrow "INSTITUTO ARIANA BORGES" in gold
- Decorative star symbol ✦ in gold above the title
- Bottom-right corner: "@institutoarianaborges" in tiny refined text, white at 60% opacity

DO NOT INCLUDE: 3D futuristic objects, neon glow, glass morphism cards, tech aesthetic, cluttered composition.

PURELY: mystical/spiritual elegance, editorial magazine quality, sacred and contemplative atmosphere — like a high-end ceremonial space at twilight. Photorealistic with cinematic moody lighting.

Aspect ratio: 16:9 (1200x630 landscape). 8K rendering quality."""


def generate_one(env: dict, portal: dict) -> bool:
    out = OUT_DIR / f"og-portal-{portal['id']}.png"
    if out.exists():
        print(f"  [SKIP] {out.name} já existe")
        return True
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        sys.exit("pip install google-genai")

    client = genai.Client(api_key=env["GEMINI_API_KEY"])
    prompt = build_prompt(portal)
    print(f"  Gerando {out.name} ({portal['title']})...")
    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=prompt,
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
                out.write_bytes(data)
                print(f"  ✓ {out.name} ({len(data)//1024}KB)")
                return True
        print(f"  ✗ {out.name} — nenhuma imagem retornada")
        return False
    except Exception as e:
        print(f"  ✗ {out.name} — erro: {e}")
        return False


def main():
    env = load_env()
    portals = json.loads(PORTALS_JSON.read_text(encoding="utf-8"))
    print(f"Gerando {len(portals)} OG images em {OUT_DIR}")
    print()
    for portal in portals:
        generate_one(env, portal)
    print()
    print(f"Pronto. Arquivos em public/og-portal-XX-XX.png")


if __name__ == "__main__":
    main()
