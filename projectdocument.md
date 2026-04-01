# 📄 Projectdocument – Middenbeemster XGrid

## 1. 🧭 Projectoverzicht
**Projectnaam:** Middenbeemster-XGrid  
**Versie:** 1.0  
**Projectdatum:** 18-03-2026  
**Documentdatum:** 20-03-2026  

**Auteurs:**  
Mateusz, Mats, Aryan, Jarno, Mehdi  

**Korte beschrijving:**  
Dit project richt zich op het ontwikkelen van een interactieve 3D-ervaring binnen een website, waarin gebruikers vrij kunnen rondlopen door de Middenbeemster. Gebruikers kunnen locaties bezoeken, gebouwen betreden en informatie ontdekken over erfgoed. Daarnaast bevat de ervaring een “wat-als” simulatie waarbij de omgeving overstroomt, inclusief visuele effecten zoals water en vissen. De applicatie is geschikt voor alle leeftijden (PEGI 3) en volledig toegankelijk via het web zonder herladen van pagina’s.

---

## 2. 🎯 Doel van het project
**Hoofddoel:**  
Het ontwikkelen van een websitegebaseerde 3D-ervaring van de Middenbeemster inclusief een interactieve overstromingssimulatie.

**Subdoelen:**  
- Implementeren van een interactieve kaart (top-down view)  
- Ontwikkelen van een navigatiesysteem tussen locaties  
- Toevoegen van informatieve content (weetjes, erfgoed)  
- Mogelijke uitbreiding met extra simulaties  

**Succescriteria:**  
- Werkende 3D-ervaring in de browser  
- Werkende overstromingssimulatie  
- Gebruiker kan vrij rondlopen (hoogte: 1.60m)  
- Directe teleportatie tussen locaties  
- Gebruiksvriendelijke interface voor alle leeftijden  

---

## 3. 📌 Scope
**In scope:**  
- 3D ervaring in browser  
- Overstromingssimulatie  
- Top-down map met navigatie  
- Gebouwen betreden  
- Informatiebubbels en weetjes  
- Meertaligheid (basis)  

**Out of scope:**  
- Volledig realistische physics simulatie  
- Multiplayer functionaliteit  
- Mobile app (native)  

---

## 4. 👥 Stakeholders

| Naam     | Rol                | Belang |
|----------|-------------------|--------|
| Mateusz  | Front-end / Unity | Hoog   |
| Mats     | Back-end / Unity  | Hoog   |
| Aryan    | Front-end / Unity | Hoog   |
| Jarno    | Unity             | Hoog   |
| Mehdi    | Back-end / Unity  | Hoog   |
| Jasper   | Eigenaar          | Hoog   |
| Arno     | Toezichthouder    | Hoog   |
| Randy    | Developer         | Hoog   |
| Twoine   | Mede Eigenaar     | Hoog   |

---

## 5. 🛠️ Aanpak / Werkwijze
**Methodiek:** Scrum  
**Sprints:** 10 weken → 10 sprints  
**Sprint meeting:** Elke woensdag om de 2 weken om 14:30  
**Standup:** Elke dag om 09:30  

**Tools:**  
- GitHub  
- Figma  
- Unity  
- Vue  
- MariaDB  
- Sam  

**Workflow:**  
1. Taken worden aangemaakt in GitHub (issues)  
2. Taken worden verdeeld per sprint  
3. Ontwikkeling in Unity + web  
4. Testen en feedback verwerken  
5. Opleveren per sprint (increment)  

---

## 6. 🧱 Functionele eisen
- Gebruiker kan rondlopen in 3D omgeving  
- Gebruiker kan locaties selecteren via map  
- Gebruiker kan gebouwen betreden  
- Overstromingssimulatie activeren via knop  
- Informatie bekijken via interactieve punten  
- Top-down drone view beschikbaar  
- Navigatie zonder page reloads  
- Welkomstpagina met uitleg en kaarten  

---

## 7. ⚙️ Niet-functionele eisen
- Snelle laadtijden  
- Directe teleportatie zonder vertraging  
- Gebruiksvriendelijk voor jong en oud  
- Web-based (geen installatie nodig)  
- Performance stabiel in browser  
- PEGI 3 geschikt  

---

## 8. 🏗️ Technische beschrijving
**Technologieën:**  
- Frontend: Vue, JavaScript  
- Backend: Node / server-side logic  
- 3D Engine: Unity (C#)  
- Database: MariaDB  
- Hosting: Web server  

**Architectuur (globaal):**  
- Client (browser) ↔ Vue frontend  
- Unity WebGL build geïntegreerd in website  
- Backend voor data en content  
- Database voor opslag van informatie  

---

## 9. 📅 Planning (globaal)

| Fase | Omschrijving | Deadline |
|------|-------------|----------|
| 1 | Onderzoek & ontwerp | Week 1–2 |
| 2 | Basis 3D omgeving | Week 3–4 |
| 3 | Navigatie & map | Week 5–6 |
| 4 | Overstromingssimulatie | Week 7–8 |
| 5 | Optimalisatie & testen | Week 9 |
| 6 | Oplevering en overdracht voor nieuwe studenten | 11 juni 2026 |

---

## 10. ⚠️ Risico’s

| Risico | Impact | Kans | Oplossing |
|--------|--------|------|-----------|
| Unity WebGL performance | Hoog | Middel | Optimalisatie |
| Integratie web + Unity | Hoog | Middel | Vroege testing |
| Tijdgebrek | Hoog | Middel | Strakke sprintplanning |
| Bugs in simulatie | Middel | Hoog | Iteratief testen |

---

## 11. 📖 User Stories

**Algemene navigatie**
- Als gebruiker wil ik vrij kunnen rondlopen in de 3D-wereld, zodat ik de omgeving kan verkennen.  
  **Priority:** High  
- Als gebruiker wil ik via een kaart locaties kunnen selecteren, zodat ik snel kan navigeren.  
  **Priority:** High  
- Als gebruiker wil ik kunnen teleporteren tussen locaties, zodat ik tijd bespaar.  
  **Priority:** High  

**Interactie & beleving**
- Als gebruiker wil ik gebouwen kunnen betreden, zodat ik meer details kan ontdekken.  
  **Priority:** Medium  
- Als gebruiker wil ik interactieve informatiepunten zien, zodat ik meer leer over erfgoed.  
  **Priority:** High  
- Als gebruiker wil ik een drone/top-down view kunnen gebruiken, zodat ik overzicht heb.  
  **Priority:** Medium  

**Simulatie**
- Als gebruiker wil ik een overstromingssimulatie kunnen starten, zodat ik de impact kan zien.  
  **Priority:** High  
- Als gebruiker wil ik visuele effecten zoals water en vissen zien, zodat de ervaring realistischer is.  
  **Priority:** Medium  

**Gebruiksvriendelijkheid**
- Als gebruiker wil ik de website zonder installatie kunnen gebruiken, zodat deze toegankelijk is.  
  **Priority:** High  
- Als gebruiker wil ik een duidelijke interface, zodat ik makkelijk mijn weg vind.  
  **Priority:** High  
- Als gebruiker wil ik dat de applicatie geschikt is voor alle leeftijden, zodat iedereen het kan gebruiken.  
  **Priority:** Medium  

---

## 12. ✅ Deliverables
- Werkende website  
- 3D experience (Unity WebGL)  
- Overstromingssimulatie  
- Navigatie + map  
- Informatieve content (erfgoed)  
- GitHub repository  
- README documentatie  
- Scrum board  

---

## 13. 📊 Evaluatie
Het project is geslaagd wanneer:  
- Alle functionaliteiten werken zoals beschreven  
- De 3D experience soepel draait in de browser  
- Gebruikers eenvoudig kunnen navigeren  
- De simulatie correct functioneert  
- Het project voldoet aan de gestelde eisen  
