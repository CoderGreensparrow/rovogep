# Rovógép
Egy weboldal, amelyen magyar szöveget a Unicode által kódolt székely-magyar rovásírássá lehet átalakítani.<br>
A website where one can convert Hungarian text to Old Hungarian runes, as defined by Unicode.

## Magyar leírás
A Unicode Szabvány – amely jelenleg a világ elsődleges karakterkódoló szabványa – 2015-ös, 8.0-ás verziójában hozzáadta karakterkészletéhez a székely-magyar rovásírást az új „Old Hungarian” (vagyis „Ómagyar”) Unicode-blokkba. Ezek használata viszont még jelenthet egy kis nehézséget, ezért ennek a projektnek az a célja, hogy létrejöjjön egy olyan egyszerűen működő weboldal, ami egy magyar nyelvű szöveget a Unicode által definiált rovásjelekre fordít.

### Használati útmutató

Egyszerűen csak be kell írni a magyar szöveget balra, a jobb oldali szövegmezőben meg megjelenik az átirat.
Minden szám is át lesz írva rovás számokra.
A központozás, ahol szükséges, tükrözve lesz (ezek is speciális karakterek, mint maga a rovás). A zárójeleket szögletes zárójelre cseréli a rendszer, hogy ne keveredhessen a rovás N betű a ) zárójellel.
Hogy más programban is megjelenhessenek a karakterek, egy betűtípus letöltésére lehet szükség.
**Ajánlott egyszerűen letölthető betűtípus (font): [Noto Sans Old Hungarian](https://fonts.google.com/share?selection.family=Noto+Sans+Old+Hungarian)**

Ha valahol a program eltévesztené az átrovást, pl. a "házszám" esetében, amit "házs-zám"-nak olvas, be lehet rakni a megfelelő elválasztás helyére egy *aposztrófot* (vagyis ' ). Az aposztróf csak a programnak szolgál jelzésül a megfelelő elválasztáshoz, és nem fog megjelenni az átrovásban. Így lesz a "ház'szám"-ból rendesen átrótt "ház-szám".

Az idegen eredetű latin betűket magyar betűkkel írja át a program, ilyenformán: (a jobb oldalon szereplő betűk rovásírásnak értendők)
- Q → KU
- W → VV
- X → KSZ
- Y → I
Ha a Q, W, X vagy Y betűk nagyok, akkor minden hozzájuk tartozó átrovás is nagy lesz, pl. "Xilofon" → "KSZilofon" (utóbbi KSZilofon rovásnak értendő). Továbbá rovásból latin betűkre alakításnál a program sose alakít Q, W, X vagy Y betűkre. Így visszafele alakításnál is latin betűvel az utóbb felsorolt formában lesz: KSZilofon.
Ha kicsik a latin betűk, akkor természetesen kicsik lesznek a rovás betűk is.

### Technikai információk
Az egész lényegi program, vagyis a konvertáló rovógép, JavaScriptben van írva, és lokálisan fut a böngészőben. Nincs szükség háttérszerverre a konvertáláshoz.

Konvertálási folyamat:

Karakterenként lépkedve a bemeneti szövegláncban, egy mohó algoritmus minél több – de csakis a lehetséges és szükséges mennyiségű – sorban következő karaktert próbál megadott karaktermintákhoz egyeztetni. Ezek a minták a modern magyar ábécé betűi, hosszú betűi, illetve bármi más kivételes kombináció, ha ilyen szükséges a mohó algoritmus sikeres alkalmazásához. Ilyenek a „dzs”, a „ggy”, a „ddzs”, a „sz”, a „v”, az „á”; az összes betű felsorolva. Ezek a minták egy asszociatív tömbben vannak tárolva, és kulcsokként szerepelnek; a hozzájuk tartozó értékek pedig a rovásírássá alakított formák. Ilyen módon – reményeim szerint a legeslegtöbb esetben – helyesen fogja az algoritmus „átróni” a szavakat. A kimenet egyszerűen másolható, viszont megjelenítéséhez egy speciális betűtípusra (fontra) van szükség a legtöbb esetben.

Az átalakítás az ellentétes irányba is elvégezhető – rovásírásból modern magyar írásba.

Számok átrovása is lehetséges, ennek folyamata kicsit összetettebb, de hasonlít a római számok kezelésére. (Viszont, mivel a JavaScript olyan, amilyen, ezért a U+FFFF kódpont feletti rovásírásbeli számok nem egy, hanem két karakternek vannak számolva naiv megoldást használva. Ez a probléma megoldásra került egy kicsit fura módszerrel.) Mivel ennek a folyamata komplikáltabb, ezért ebbe nem megyek itt bele.

Továbbá van még egy rendszer a két-három karakteres betűk nagy- és kisbetűsségének javítására (csak rovás → latin módban, a latinra alkalmazva). Ennek részletei a kódban vannak.

## English description (TODO Update)
The Unicode Standard—which is currently the primary character encoding standard in the world—extended its character set with the Old Hungarian script, also called Hungarian runes, in a new Unicode block titled "Old Hungarian" in its 8.0 version in 2015. However, the usage of these characters can still pose a bit of a challenge, and so the goal of this project is to create a simple website that converts Hungarian texts to Hungarian runes, as defined by the Unicode Standard.

### Technical information
The main component of the program, which means the "rune carver machine" that does the conversion, is written in JavaScript and runs locally in the browser. There is no backend server required for the conversion process.

Conversion process:

Stepping through the input string character-by-character, a greedy algorithm tries to match as many characters one after another, starting from the current one—but only the useful and required amount at maximum—to predefined patterns of characters. These patterns consist of the letters of the modern Hungarian alphabet, the geminated (long) letters of this alphabet, and any other exceptions, should they be required for the correct application of the greedy algorithm. Examples include "dzs", "ddzs", "sz", "v", "á"; the whole alphabet. These are stored in a map as keys; the values associated with them are their runic forms. This way—in most cases, hopefully—the algorithm will "carve the runes" correctly. The output shall be easy to copy, but there is a special font required to display it in most cases.

**Recommended easy-to-download font: [Noto Sans Old Hungarian](https://fonts.google.com/share?selection.family=Noto+Sans+Old+Hungarian)**

Conversion is also possible in reverse—from runes to modern Hungarian writing.
