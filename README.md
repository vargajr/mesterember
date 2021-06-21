## **Mesterember ajánló applikáció: Adminisztrátori felület - User story**
---
A Mesterember ajánló applikáció lehetőséget nyújt a felhasználóknak szolgáltatók adatait beküldeni egy kereshető adatbázisba.
A felhasználó lehet fogyasztó, de lehet olyan szolgáltató, aki ezen a fórumon szeretné hirdetni a szolgáltatásait.

Az adminisztrátori felület az applikáció adatbázisának karbantartását teszi lehetővé az adminisztátor számára.
---
---
## _**1. Főoldal és navigáció**_
---

**1. agilis felhasználói történet:**
> _Adminisztrátorként a főoldalon szeretnék látni egy listát az elérhető funkciókról_


**Elfogadási kritériumok:**  

* Az elérhető funkciók egy, max. két mondatos leírása
* A listaelem legyen aktív link a megfelelő aloldalra
* Elvárt funkciók:
  * regisztrált felhasználók atatbázisának elérése
  * Beküldött szolgáltatások atatbázisának elérése

---

**2. agilis felhasználói történet:**
> _Adminisztrátorként a főoldalon szeretnék látni egy menü sávot, ahol az egyes aloldalak közötti navigálást lehetővé tévő linkek vannak._


**Elfogadási kritériumok:**

* Mobiloptimalizált megjelenés:
  * kicsi képernyőn legördíthető menü
  * nagy képernyőn kibontott menüsáv
* A menüsáv mindig látszódjék, akkor is ha az oldal tartalmaának terjedelme miatt az oldalot görgetni kell.
* A menü linkjei rövid, de félreérthetetlen utalások legyenek az elérhető tartalomra
* A menü minden adminisztrátori feladat elvégzéséhez tartalmazzon linket

---
---
## _**2. Aloldalak és navigáció**_
---
**3. agilis felhasználói történet:**
> _Adminisztrátorként minden aloldalon szeretném elérni ugyanazt a menüsávot mint a főoldalon_


**Elfogadási kritériumok:**  

* A menü minden adminisztrátori feladat elvégzéséhez tartalmazzon linket

---
### _**2.1. Felhasználók aloldal**_
---

**4. agilis felhasználói történet:**
> _Adminisztrátorként a felhasználók aloldalra lépve szeretném látni az összes felhasználó listáját_


**Elfogadási kritériumok:**  

* A felhasználók minden adata jelenjen meg
* a tárolni kívánt adatok:
  * a felhasználó neve
  * a felhasználó e-mail címe
  * a felhasználó státusza: aktív vagy inaktív

---

**5. agilis felhasználói történet:**
> _Adminisztrátorként a felhasználók aloldalon szeretnék szűrő - kereső funkciókat használni_


**Elfogadási kritériumok:**  

* A szűrés feltételeként a felhasználók bármelyik adatát lehessen kiválasztani
* A keresés a szűrés olyan változata legyen, amikor a felhasználók listáján csak azok a felhasználók jelennek meg, amelyek adatára egy szabadon begépelhető kulcsszó ráilleszthető:
  * ki lehessen választani, hogy a keresési kulcsszót a felhasználó minden adatában keressük, vagy csak egy adott adattípusában
* a szűrés és keresés funkciók beállításai egyszerre érvényesüljenek az adatok kilistázásakor

---

**6. agilis felhasználói történet:**
> _Adminisztrátorként a felhasználók aloldalon szeretnék űj felhasználót hozzáadni a listához_


**Elfogadási kritériumok:**  

* Az adatok bevitele után a felhasználók listája töltődjön be újra automatikusan
* Az adatbevitel lehessen megszakítható
  * ebben az esetben az adatbázis ne módosuljon
  * az adatbevitel megszakításakor szintén töltődjön úrja a lista automatikusan

---

**7. agilis felhasználói történet:**
> _Adminisztrátorként a felhasználók aloldalon szeretném ha lehetőség lenne egy felhasználó adatainak szerkesztésére_


**Elfogadási kritériumok:**  

* Az adatok bevitele után a felhasználók listája töltődjön be újra automatikusan
* Az adatbevitel lehessen megszakítható
  * ebben az esetben az adatbázis ne módosuljon
  * az adatbevitel megszakításakor szintén töltődjön úrja a lista automatikusan

---

**8. agilis felhasználói történet:**
> _Adminisztrátorként a felhasználók aloldalon szeretném ha lehetőség lenne egy felhasználó adatainak törlésére a listából_


**Elfogadási kritériumok:**  

* Az adatok törlése után a felhasználók listája töltődjön be újra automatikusan
* Az törlés lehessen megszakítható
  * ebben az esetben az adatbázis ne módosuljon

---
---
### _**2.2. Szolgáltatások aloldal**_
---

**9. agilis felhasználói történet:**
> _Adminisztrátorként a szolgáltatások aloldalra lépve szeretném látni az összes szolgáltatás listáját_


**Elfogadási kritériumok:**  

* A szolgáltatások minden adata jelenjen meg
* a tárolni kívánt adatok:
  * a szolgáltató neve (cég vagy vállalkozó)
  * a szolgáltatás típusa: csak kulcsszavak
  * a szolgáltatás rövid leírása, jellemzése
  * elérhetőségek - lehet többet is megani - a szükséges adatok:
    * elérhetőség típusa (tel., e-mail, személyes)
    * a kapcsolattartó személy neve
    * az elérhetőség időpontja
  * melyik felhasználó rögzítette az adatokat az adatbázisban
  * az adat státusza: aktív = publikálható a felhasználók számára, vagy inaktív = a megjelenítés a felhasználók számára le van tiltva

---

**10. agilis felhasználói történet:**
> _Adminisztrátorként a szolgáltatások aloldalon szeretnék szűrő - kereső funkciókat használni_


**Elfogadási kritériumok:**  

* A szűrés feltételeként a szolgáltatások bármelyik adatát lehessen kiválasztani
* A keresés a szűrés olyan változata legyen, amikor a szolgáltatások listáján csak azok a szolgáltatások jelennek meg, amelyek adatára egy szabadon begépelhető kulcsszó ráilleszthető:
  * ki lehessen választani, hogy a keresési kulcsszót a szolgáltatás minden adatában keressük, vagy csak egy adott adattíusában
* a szűrés és keresés funkciók beállításai egyszerre érvényesüljenek az adatok szelektálásakor

---

**11. agilis felhasználói történet:**
> _Adminisztrátorként a szolgáltatások aloldalon szeretnék új szolgáltatást hozzáadni a listához_


**Elfogadási kritériumok:**  

* Az adatok bevitele után a szolgáltatások listája töltődjön be újra automatikusan
* Az adatbevitel lehessen megszakítható
  * ebben az esetben az adatbázis ne módosuljon
  * az adatbevitel megszakításakor szintén töltődjön úrja a lista automatikusan

---

**12. agilis felhasználói történet:**
> _Adminisztrátorként a szolgáltatások aloldalon szeretném ha lehetőség lenne egy szolgáltatás adatainak szerkesztésére_


**Elfogadási kritériumok:**  

* Az adatok bevitele után a szolgáltatások listája töltődjön be újra automatikusan
* Az adatbevitel lehessen megszakítható
  * ebben az esetben az adatbázis ne módosuljon
  * az adatbevitel megszakításakor szintén töltődjön úrja a lista automatikusan

---

**13. agilis felhasználói történet:**
> _Adminisztrátorként a szolgáltatások aloldalon szeretném ha lehetőség lenne egy szolgáltatás adatainak törlésére a listából_


**Elfogadási kritériumok:**  

* Az adatok törlése után a szolgáltatások listája töltődjön be újra automatikusan
* Az törlés lehessen megszakítható
  * ebben az esetben az adatbázis ne módosuljon

---
---
## _**3. A projekt egyéb adatai**_
---
**A felhasználói felület:**  
- mobiltelefon kijelzőjére optimalizát megjelenés
- Nagyobb kijelzőkre reszponzív megjelenés

**Prioritás:**  
magas

**Megvalósítás időtartama:**  
4 hét

**További fejlesztési lehetőségek:**  
- Az egyes szolgáltatásokhoz lehessen referencia munkákat megadni
- Lehessen fényképeket feltölteni
- Az egyes szolgáltatásokhoz lehessen felhasználói véleményeket megadni
- Hibaüzenetek megjelenítése (validálás)
- Az egyes aloldalakon statisztikák, kimutatások készítése a legfontosabb adatokból.
- Az adatokat listázó aloldalon lapozó készítése.
