## **1. Az alkalmazás célja**

Az alkalmazás feladata, hogy egy futárszolgálat fuvarjainak, partnereinek, úticéljainak és járműveinek adatait
nyilvántartsa és kezelje.

## **2. Az alkalmazás telepítése**

- Forkolni kell az adott GitHub repository tartalmát:

  `https://github.com/MarkFazekas/vizsgaremek`

- A célgépre le kell klónozni az adott GitHub repository tartalmát.

  `git clone https://github.com/MarkFazekas/vizsgaremek`

- Telepíteni kell az alkalmazás függőségeit:

    - Backend

        - A terminálon be kell lépni a /backend mappába és futtatni az `npm i` parancsot.

    - Frontend

        - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.

## **3. Az alkalmazás indítása**

A megadott Docker container indítása és inicializálása:

- El kell indítani a Docker Desktop alkalmazást.
- A terminálon be kell lépni a /backend mappába és futtatni az `npm run deploy` parancsot.   
  (Ha szükséges, a /frontend mappába belépve a terminálban az `npm start` paranccsal indítható a frontend.)

A belépéshez egy érvényes e-mail-cím és jelszó:

- E-mail: kgasparro0@prnewswire.com
- Jelszó: Atl++0CXeYwScsBg3HNWrEBdGLqWUuLtgVYrZ4En0wiF4c07Mib4S2WOfggYccVL

## **4. A végpontok dokumentációja**

Swagger

- Az alábbi URL-t kell beírni a böngészőbe: https://localhost:3000/api-docs
