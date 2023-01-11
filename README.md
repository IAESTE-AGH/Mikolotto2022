# mikolotto
Projekt internetowej loterii mikołajkowej dla Komitetu Lokalnego IAESTE AGH.
## Aktualne możliwości
Frontend Reactowy. Umożliwia użytkownikowi wysłanie listu do św. Mikołaja po wypełnieniu podanego na stronie formularza. Musi to zrobić przy pomocy swojego e-maila @iaeste.pl. Dzięki temu mamy pewność, że osoba jest z IAESTE. Weryfikacja odbywa się zarówno po stronie front- jak i backendu. 
Backend stworzony za pomocą node.js express. Obsługuje tylko metodę POST (tylko to jest potrzebne w projekcie). Weryfikuje (żeby nie tworzył pustych oiektów do JSONa) i zapisuje do pliku JSON, składającego się z tablicy życzeń ("wishes"), obiekt zawierający e-mail osoby wysyłającej list ("email"), jej list ("wish") oraz email osoby, którą wylosowała ("santaMail"), które na początku jest puste. Po wypełnieniu formularza użytkownik dostaje e-maila potwierdzającego. Za pomocą odpowiedniego wypełnienia formularza, określonego w warunku na uruchomienie loterii, można uruchomić losowanie. Funkcja przydziela każdej osobie e-mail osoby, którą ma obdarować i wysyła maila z jej życzeniem.
## Co zmienić/dodać w następnej wersji
- sprawdzenie, czy podany e-mail należy do członka komitetu przy AGH
- countdown do końca rejestracji (?)
- ulepszenie weryfikacji na frontendzie
- zapisywanie danych do bazy danych (np. MongoDB)
- system logowania i rejestracji użytkownika (?)
- możliwość wypisania się z loterii!
# instrukcja
- Aktualizacja dat/zasad na froncie i w tekstach mail'i
- Tworzymy projekt i webappa w firebase
- przez terminal w VSC instalujemy toole do firebase’a (npm install firebase), 
- Logowanie (firebase login)
- Uzgadniamy backend/functions/index.js (funkcja mailsender), tak żeby się zgadzało z kluczami/ID otrzymanymi w firebase podczas twozenia webappa, później w ustawieniach, 
  to samo robimy dla backend/service-account.json
- Inicjalizujemy projekt (firebase init), całkiem sensownie jest to opisane tutaj: https://www.youtube.com/watch?v=4h0PgaX8A1I&ab_channel=LearnWithSajib
- Deploy projektu (firebase deploy)
