# **Vizsgaremek: Mesterember applikáció adminisztrációs kiszolgáló**

## Tartalom
  1. Megjegyzések az oktatóknak
  2. Használatba vétel
  3. Egyéb dokumentációk
  4. Tesztelés

## 1. Megjegyzésk az oktatóknak
  - A .env fájl fel lett töltve, nem kell foglalkozni a pótlásával.
  - Az adatbázist a program minden indításakor törli és ugyanazokkal a "mock" adatokkal feltölti.
  - A mock adatok a "backend/src/seed mappában vannak.
  - Működő admin felhasználó: **admin@test.com - admin_pw**

## 2. Használatba vétel

  - Az alkalmazás docker konténerbe csomagolva futtatható.
    - a frontend rész Angular keretrendszer segítségével készült, fel lett építve és a megfelelő fájlok a /backend/public mappában találhatók - a szerver ezeket a  fájlokat használja a webes alkalmazás frontend oldali kiszolgálására.
    - a backend egy REST API szerver, ami NodeJs futtatókörnyezetben futtathtó. A NodeJs express csomag segítségével készült.
  - Az alkalmazás konténerizációjához és konténerben futtatásához a /backend mappába belpve az alábbi parancsok kiadásával lehetséges:
    > npm run docker:build

A parancs futtatásakor létrejön egy koténer a legfrissebb NodeJs futtatókörnyezettel és bele másolva az alkalmazással, és egy másik konténer egy MongoDb adatbázissal, amit az alkalmazás az adatok tárolására használ.
    > npm run docker-compose:up

A parancs futtatásakor elindul az alkalmazás a docker konténerben.

A webes alkalmazás a http://127.0.0.1:3000 (vagy http://localhost:3000) címen szolgálja ki a kéréseket, amit egy webböngésző segítségével lehet indítani.

  - Az alkalmazás futtatásának előfeltételei:
    - docker futtatókörnezet
    - Az alkalmazás szerkesztéséhez, tesztek futtatásához: NodeJs futtatókörnyezet

## 3. Egyéb dokumentációk

* User story: USERSTORY.md
* A REST API OpenApi (swagger) dokumentációja a /api-docs útvonalon érhető el (a frontend alkalmazás drekt linket tartalmaz)
* A REST API-ról tofábbi infók a /backend/README.md fájlban olvashatók.

## 4. Tesztelés

* A REST API egység és integrációs tesztjeit a /backend mappában kiadott npm run test paranccsal lehet futtatni.
* Az Angular frontend részhez nem készültek tesztek.