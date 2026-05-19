#!/usr/bin/env python3
"""Gera OG image (1200x630) para a landing Dedo Magnetico via Gemini Nano Banana Pro.
Estilo: Ariana Mystic adaptado ao tema de relacionamentos/transformacao feminina.
Output: public/og-dedo-magnetico.jpg
"""
from __future__ import annotations
import base64
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og-dedo-magnetico.jpg"


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


PROMPT = """Generate a high-end 1200x630 (16:9) Open Graph social media image for an Instagram-ready spiritual & psychology brand "Instituto Ariana Borges".

PRODUCT: "DEDO MAGNÉTICO®" — an online course for women about breaking unconscious patterns in relationships and building healthy, conscious love.

VISUAL CONCEPT: feminine magnetism, inner transformation, self-love, emotional awareness. Soft and intimate atmosphere — NOT romantic-cliche, NOT cosmic. Think editorial portrait magazine quality with warm twilight light.

STYLE — Ariana Mystic adapted for feminine psychology:
- Background: deep moody darkness with warm undertones, gradient from #2C2C2C (charcoal warm-black) to #1a1820 (deep aubergine-black)
- Subtle warm glow on the right side: dusty rose / champagne gold halo (suggesting magnetic warmth)
- Primary highlight: warm metallic gold #D4AF37 for the registered trademark symbol ® and decorative line accents
- Secondary highlight: soft lilac/dusty mauve #6A4BB8 used very subtly for atmospheric glow

COMPOSITION (centered, clean editorial layout):
- Tiny uppercase tracked eyebrow at top: "INSTITUTO ARIANA BORGES" in soft gold #D4AF37, letter-spacing wide
- Decorative ornament line or single star ✦ in gold (small, elegant)
- MAIN TITLE (huge, centered): "DEDO MAGNÉTICO®" in elegant Playfair Display serif, warm off-white #F9F7F2, breathable letter spacing — the ® symbol must be in gold #D4AF37
- Below title: italic single-line subtitle "Pare de atrair relações que machucam." in soft warm off-white, Cormorant Garamond italic, smaller
- Below subtitle: small tracked tagline "Curso online com Ariana Borges" in gold #D4AF37, uppercase, refined
- Bottom-right corner: tiny "@institutoarianaborges" in white at 50% opacity

DO NOT INCLUDE: photos of people, hearts, magnet illustrations literal, cliché romantic imagery, neon, 3D glass cards, tech aesthetic, hands, body parts. NO stock-photo couples. NO emoji symbols rendered as graphics.

PURELY: editorial elegance, contemplative and intimate, magazine-cover quality, with warm candlelit atmosphere that feels like a psychotherapy book cover — minimal, sophisticated, brand-driven.

Aspect ratio: 16:9 (1200x630 landscape). 8K rendering quality, photorealistic moody lighting."""


def main() -> None:
    env = load_env()
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        sys.exit("pip install google-genai")

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
                OUT.write_bytes(data)
                print(f"  OK  {OUT.name} ({len(data)//1024}KB)")
                return
        sys.exit("  ERRO  nenhuma imagem retornada")
    except Exception as e:
        sys.exit(f"  ERRO  {e}")


if __name__ == "__main__":
    main()
