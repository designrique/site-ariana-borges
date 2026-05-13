#!/usr/bin/env python3
"""Gera 9 icons (1:1) pra pagina /bio (Linktree-style) usando Gemini Nano Banana.
Estilo: pequenos amuletos misticos dourados em fundo cosmico escuro.
Output: public/bio-icons/<slug>.png
"""
from __future__ import annotations
import base64
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public/bio-icons"
OUT_DIR.mkdir(parents=True, exist_ok=True)


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
        skill_env = Path.home() / ".claude/skills/ppt-generator/.env"
        if skill_env.exists():
            for line in skill_env.read_text().splitlines():
                if line.startswith("GEMINI_API_KEY="):
                    env["GEMINI_API_KEY"] = line.split("=", 1)[1].strip().strip('"')
                    break
    if not env.get("GEMINI_API_KEY"):
        sys.exit("GEMINI_API_KEY missing")
    return env


# Cada icon eh um "amuleto sagrado" — emblema dourado em fundo cosmico escuro
ICONS = [
    {
        "slug": "portal",
        "subject": "An ornate alchemical seal showing two vertical pillars of light forming a portal/gateway, with a small star above and faint sacred geometry behind. Symbolizes a mystical doorway/portal opening between dimensions.",
    },
    {
        "slug": "dna-basico",
        "subject": "An elegant DNA double helix rendered in flowing gold lines, with a small theta wave symbol or brain wave overlapping it. Symbolizes ThetaHealing's DNA Basic course.",
    },
    {
        "slug": "thetahealing",
        "subject": "Two open hands in a meditative gesture with theta brain wave pattern emerging between them. Sacred geometry circle behind. Symbolizes the ThetaHealing technique.",
    },
    {
        "slug": "terapia-individual",
        "subject": "Two minimalist figures facing each other in a contemplative therapeutic encounter, with a small heart/circle of light between them. Sacred and intimate.",
    },
    {
        "slug": "formacao",
        "subject": "A graduation laurel wreath in gold encircling a small theta wave symbol or sacred star. Symbolizes therapist certification and mastery.",
    },
    {
        "slug": "autoconhecimento-grupo",
        "subject": "Several minimalist human figures arranged in a perfect circle viewed from above, with a single point of light at the center. Symbolizes group inner-work / circle ceremony.",
    },
    {
        "slug": "blog",
        "subject": "An ornate open book with a small star or theta symbol rising from its pages, gold script-like marks suggesting wisdom. Sacred manuscript aesthetic.",
    },
    {
        "slug": "sobre",
        "subject": "A serene feminine silhouette in profile from the shoulders up, with a small sacred geometry mandala behind the head suggesting wisdom and presence.",
    },
    {
        "slug": "whatsapp",
        "subject": "A minimalist speech bubble or chat bubble with a small heart inside, rendered in elegant flowing lines. Direct, warm, conversational.",
    },
    {
        "slug": "encontro-deusas",
        "subject": "A crescent moon embraced by feminine flowing lines and floral motifs, with three small stars representing divine feminine wisdom. Sacred goddess emblem with art nouveau elegance.",
    },
]


def build_prompt(subject: str) -> str:
    return f"""Create a square 1:1 mystical icon for a spiritual brand "Instituto Ariana Borges".

SUBJECT: {subject}

STYLE — STRICT requirements:
- Aesthetic: ornamental sacred amulet / alchemical medallion / mystical seal
- Background: deep cosmic darkness (#0b0916 to #12102b gradient, with subtle starfield)
- Foreground/icon: warm metallic gold (#D4AF37), elegant gold lines and shapes
- Optional: very subtle nebula glow, soft sacred geometry hints behind the main subject
- The icon should be CENTERED, occupying ~70% of the canvas
- Style: minimalist, line-art-inspired, ornamental, sacred — NOT photorealistic, NOT 3D, NOT cartoonish
- Inspired by: alchemical engravings, art nouveau sacred motifs, medieval esoteric seals
- Color palette: only gold + deep dark cosmic + subtle starlight white accents
- NO TEXT, NO LABELS, NO LETTERS, NO NUMBERS — pure symbolic icon
- Final feel: a precious mystical amulet that could be engraved on a coin

RENDERING: 8K resolution, sharp gold lines, elegant ceremonial atmosphere, like a high-end spiritual brand emblem."""


def generate_one(env: dict, icon: dict) -> bool:
    out = OUT_DIR / f"{icon['slug']}.png"
    if out.exists():
        print(f"  [SKIP] {out.name} ja existe")
        return True
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        sys.exit("pip install google-genai")

    client = genai.Client(api_key=env["GEMINI_API_KEY"])
    prompt = build_prompt(icon["subject"])
    print(f"  Gerando {out.name}...")
    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE"],
                image_config=types.ImageConfig(aspect_ratio="1:1"),
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
        print(f"  ✗ {out.name} — nada retornado")
        return False
    except Exception as e:
        print(f"  ✗ {out.name} — erro: {e}")
        return False


def main():
    env = load_env()
    print(f"Gerando {len(ICONS)} icons em {OUT_DIR}")
    print()
    for icon in ICONS:
        generate_one(env, icon)
    print()
    print(f"Pronto. Arquivos em public/bio-icons/<slug>.png")


if __name__ == "__main__":
    main()
