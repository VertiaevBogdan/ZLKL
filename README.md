# ZLKL
Testové zadání pro ZLKL. 
Vertiaev Bogdan

## JSDoc

Pokud chcete prohlídnout dokumentaci v HTML formátu: 
```bash
npm i
```

Generátor dokumentace JSDoc je již uveden v `devDependencies`. Pro jeho samostatnou instalaci nebo přidání do projektu použijte:

```bash
npm i --save-dev jsdoc
```

## HTML dokumentace JSDoc

Vygenerujte dokumentaci z komentářů ve zdrojových souborech:

```bash
npx jsdoc -r src -d docs/api
```

## Struktura projektu

```text
ZLKL/
├── src/
│   └── types/           # JSDoc popisy datových struktur API a událostí
├── fixtures/            # Ukázka odpovědi API s vysvětlujícími komentáři
├── docs/
│   ├── api/             # Vygenerovaná HTML dokumentace JSDoc
│   └── diagrams/        # Diagramy chování aplikace a stavů vrat (PlantUML)
├── package.json         # Metadata, závislosti a npm příkazy
├── README.md
└── otázky.md           # Otázky z mailu a odpovědi na ně
```