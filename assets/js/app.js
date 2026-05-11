const searchIndex = [
  {
    "period": "Periode 1",
    "week": "Week 1",
    "title": "PHP Basics",
    "url": "/periode-1/week-01.html",
    "text": "Week 1 – PHP Basics PHP draait op de server en maakt HTML dynamisch. De browser ziet alleen het resultaat (HTML), nooit jouw PHP code. Wat moet je kennen (samenvatting) Wat server side betekent Verschil tussen PHP (server side) en JavaScript (client side) Variabelen maken met $ Output tonen met echo en Werken met if / else Boolean waarden ( true / false ) Verschil tussen = en === date(\"Y\") gebruiken 1. Server side vs Client side Uitleg PHP wordt uitgevoerd op de server. De browser ontvangt alleen de gegenereerde HTML. Een voorbeeld van een taal die wél direct in de browser draait is JavaScript, daarom kan je ook de code inspecteren via Inspect Element. Wat moet je kennen Server side = code draait op server Client side = code draait in browser PHP code zelf is niet te zien in de browser (alleen de HTML output) Voorbeeld Wat de browser ontvangt: Onthoud: De PHP code wordt op de server uitgevoerd. Alleen het resultaat (HTML) wordt naar de client gestuurd, dus de PHP code zelf zie je niet in de browser. 2. Variabelen & Output Uitleg Om in PHP een waarde te laten zien in het scherm van de client typ je: Maar omdat het vaak gebeurt dat je even PHP wilt openen en direct weer wilt sluiten om 1 waarde te tonen, is er een eenvoudigere manier gemaakt, namelijk: Wat moet je kennen $variabele = echo (korte echo) Voorbeelden of Onthoud: = wijst toe, maar toont niets. Om iets te tonen gebruik je echo of de korte vorm . 3. If / Else Uitleg Met een if statement bepaal je welke output wordt getoond. Wat moet je kennen if else Boolean: true / false Vergelijken met === Voorbeeld Onthoud: = is toekennen, === is vergelijken. 4. Dynamische datum Uitleg Met date(\"Y\") toon je automatisch het huidige jaar. Wat moet je kennen date(\"Y\") Voorbeeld Veelgemaakte fouten (kort) 1. = gebruiken in een if ❌ ✅ of 2. Denken dat PHP zichtbaar is in de browser De PHP code draait op de server. De browser ontvangt alleen de HTML output. 3. Echo vergeten Een variabele zonder echo toont niets. Uitzondering: als je de korte vorm gebruikt, zoals , dan wordt het wél direct getoond. Video Uitleg volgt hier."
  },
  {
    "period": "Periode 1",
    "week": "Week 2",
    "title": "Projectstructuur & Includes",
    "url": "/periode-1/week-02.html",
    "text": "Week 2 – Projectstructuur & Includes In week 2 zorg je dat je project overzichtelijk en professioneel wordt opgezet. Je leert code hergebruiken en data gestructureerd opslaan. Wat moet je kennen (samenvatting) Scheiding van layout en logica Werken met een includes/ map include en require Associative arrays ( 'key' = 'value' ) Verschil tussen gewone arrays en associative arrays Data uitlezen met $array['key'] Vooruitblik: fetch(PDO::FETCH ASSOC) 1. Scheiding van layout en logica Uitleg Grote projecten worden onoverzichtelijk als alles in één bestand staat. Daarom splits je herbruikbare onderdelen (header, nav, footer) uit in aparte bestanden. Wat moet je kennen HTML hergebruiken via includes PHP bovenaan, HTML daaronder Logische mappenstructuur Voorbeeld Onthoud: Structuur bespaart tijd en voorkomt fouten. 2. include vs require Uitleg Beide voegen een bestand toe. require stopt het script als het bestand ontbreekt. include geeft alleen een waarschuwing en gaat door. Wat moet je kennen include require Relatieve paden Voorbeeld Onthoud: Gebruik require voor essentiële bestanden (zoals je database connectie). 3. Associative arrays Uitleg Een gewone (reguliere) array gebruikt nummers als index: $kleuren = [\"rood\", \"blauw\"]; Een associative array gebruikt namen (keys) in plaats van nummers. Dit maakt je data duidelijk en leesbaar. Wat moet je kennen Verschil tussen $array[0] en $array['key'] 'key' = 'value' Meerdere key value paren Voorbeeld Onthoud: Keys zijn labels voor je data. 4. Vooruitblik: fetch(PDO::FETCH ASSOC) Uitleg Wanneer je data uit de database haalt kan je die op verschillende manieren terugkrijgen. Elke manier heeft een voor én nadeel. Omdat jij nu net geleerd hebt wat een associative array is, gaan we de database vragen om het op deze manier naar ons project terug te sturen. Daarom gebruiken we PDO::FETCH ASSOC . Wat moet je kennen fetch(PDO::FETCH ASSOC) fetchAll(PDO::FETCH ASSOC) Voorbeeld Veelgemaakte fouten (kort) 1. Verkeerd pad bij include ❌ ✅ 2. Associative array lezen met index ❌ ✅ 3. Alles in één bestand zetten ❌ Header, SQL en HTML door elkaar in index.php ✅ Gebruik aparte bestanden in includes/ Video Uitleg volgt hier."
  },
  {
    "period": "Periode 1",
    "week": "Week 3",
    "title": "Database & READ",
    "url": "/periode-1/week-03.html",
    "text": "Week 3 – Database & READ In week 3 leer je hoe je data ophaalt uit een database en toont op je pagina. Dit is de READ kant van je mini applicatie. Wat moet je kennen (samenvatting) PDO connectie maken Databaseconnectie in een apart bestand zetten SELECT query uitvoeren fetchAll(PDO::FETCH ASSOC) gebruiken Resultaten opslaan in een array Resultaten tonen met foreach Data en HTML combineren 1. PDO connectie Uitleg Met PDO maak je een verbinding met je database. Deze connectie gebruik je om queries uit te voeren. In een echt project zet je deze connectie in een apart bestand (bijv. includes/db.php ) en laad je die in met require . Wat moet je kennen new PDO(...) Charset utf8mb4 Error mode instellen require 'includes/db.php'; Voorbeeld (includes/db.php) Voorbeeld (index.php) Onthoud: Zet je databaseconnectie in één bestand en hergebruik die. 2. SELECT query uitvoeren Uitleg Met een SELECT query haal je data op uit je database. Eerst zorg je dat je connectie beschikbaar is via require , daarna voer je de query uit. Wat moet je kennen $pdo query() Resultaat opslaan in $stmt fetchAll(PDO::FETCH ASSOC) Voorbeeld (index.php) Onthoud: PDO::FETCH ASSOC zorgt dat je nette keys krijgt zoals 'title' . 3. Resultaten tonen met foreach Uitleg De opgehaalde resultaten zitten in een array. Met foreach loop je erdoorheen en maak je HTML. Wat moet je kennen foreach ($items as $item) $item['title'] gebruiken Voorbeeld Onthoud: Database → array → HTML. Veelgemaakte fouten (kort) 1. Geen FETCH ASSOC gebruiken ❌ ✅ 2. foreach verkeerd gebruiken ❌ ✅ 3. Connectie niet apart zetten ❌ Databasecode in elk bestand herhalen ✅ Eén keer in includes/db.php zetten en require gebruiken Video Uitleg volgt hier."
  },
  {
    "period": "Periode 1",
    "week": "Week 4",
    "title": "Forms (GET & POST)",
    "url": "/periode-1/week-04.html",
    "text": "Week 4 – Forms (GET & POST) In week 4 leer je hoe gebruikers data naar jouw applicatie sturen. Je leert het verschil tussen GET en POST en hoe je formulierdata verwerkt. Wat moet je kennen (samenvatting) Verschil tussen GET en POST $ GET en $ POST Formulier maken met method en action Het belang van name in inputvelden Data veilig uitlezen met ?? '' 1. GET vs POST Uitleg GET zet data in de URL. POST verstuurt data via de request body. GET gebruik je vaak voor filters of id’s. POST gebruik je voor formulieren. Wat moet je kennen GET = zichtbaar in URL POST = niet zichtbaar in URL $ GET $ POST Voorbeeld (GET) URL: Onthoud: Alles wat in GET zit, is zichtbaar in de URL. 2. Formulier met POST Uitleg Met een HTML formulier stuur je data naar een ander PHP bestand. Wat moet je kennen name attribuut is verplicht $ POST['veldnaam'] Voorbeeld Onthoud: Zonder name wordt er niets verstuurd. 3. Data veilig uitlezen Uitleg Als een veld niet bestaat, krijg je een foutmelding. Met ?? '' voorkom je warnings. Wat moet je kennen Null coalescing operator ?? Fouten voorkomen Voorbeeld ❌ ✅ Veelgemaakte fouten (kort) 1. name vergeten ❌ ✅ 2. GET gebruiken voor gevoelige data ❌ /login.php?password=1234 ✅ Gebruik POST voor formulieren met gevoelige input. 3. $ POST gebruiken zonder method=\"POST\" ❌ Form gebruikt GET maar je leest $ POST ✅ Zorg dat method en superglobal overeenkomen. Video Uitleg volgt hier."
  },
  {
    "period": "Periode 1",
    "week": "Week 5",
    "title": "Backend Validatie",
    "url": "/periode-1/week-05.html",
    "text": "Week 5 – Backend Validatie In week 5 zorg je dat gebruikersinvoer gecontroleerd wordt op de server. Je vertrouwt nooit alleen op HTML validatie. Wat moet je kennen (samenvatting) Waarom backend validatie nodig is trim() gebruiken empty() controleren strlen() gebruiken voor minimale lengte is numeric() gebruiken voor getallen exit; gebruiken om uitvoering te stoppen 1. Waarom backend validatie? Uitleg HTML validatie (zoals required ) kan worden omzeild. Daarom controleer je invoer altijd opnieuw in PHP. Wat moet je kennen Frontend validatie is niet genoeg Server controleert altijd Foute invoer moet worden gestopt Onthoud: De server beslist. Niet de browser. 2. Lege velden controleren Uitleg Met empty() controleer je of een veld leeg is. Met trim() verwijder je spaties aan het begin en einde. Wat moet je kennen trim() empty() exit; Voorbeeld Onthoud: Eerst opschonen ( trim() ), daarna controleren. 3. Minimale lengte controleren Uitleg Soms moet invoer een minimale lengte hebben. Bijvoorbeeld: minimaal 3 karakters. Wat moet je kennen strlen() Vergelijken met Uitleg Als een veld een getal moet zijn (bijv. leeftijd), controleer je dit expliciet. Wat moet je kennen is numeric() Negatie met ! Voorbeeld Onthoud: Vertrouw nooit blind op invoer. Veelgemaakte fouten (kort) 1. Alleen HTML validatie gebruiken ❌ Alleen required in je form zetten ✅ Altijd ook controleren in PHP 2. trim vergeten ❌ ✅ 3. Geen exit gebruiken ❌ Script gaat door na foutmelding ✅ Gebruik exit; om verdere uitvoering te stoppen Video Uitleg volgt hier."
  },
  {
    "period": "Periode 1",
    "week": "Week 6",
    "title": "INSERT & Redirect (PRG)",
    "url": "/periode-1/week-06.html",
    "text": "Week 6 – INSERT & Redirect (PRG) In week 6 voeg je data toe aan je database. Je leert veilig INSERT queries uitvoeren en dubbele invoer voorkomen met een redirect. Wat moet je kennen (samenvatting) prepare() gebruiken execute() uitvoeren Named placeholders ( :title ) Waarom prepared statements veilig zijn Redirect na POST header(\"Location: ...\") exit; na header 1. Prepared statements (veilig INSERT) Uitleg Je plaatst nooit variabelen direct in je SQL string. Met prepared statements scheid je SQL en data. Dat voorkomt SQL injectie. Wat moet je kennen $pdo prepare() $stmt execute() :placeholder Associatieve array meegeven aan execute Voorbeeld Onthoud: SQL en data blijven gescheiden. 2. Waarom geen variabelen direct in SQL? Uitleg Als je variabelen direct in je query zet, kan een gebruiker je query manipuleren. Fout voorbeeld ❌ Goed voorbeeld ✅ 3. Redirect na POST (PRG pattern) Uitleg Na een POST request redirect je naar een andere pagina. Zo voorkom je dat een refresh opnieuw een INSERT uitvoert. Wat moet je kennen header(\"Location: index.php\") exit; POST → Redirect → GET Voorbeeld Onthoud: POST → INSERT → redirect → klaar. Veelgemaakte fouten (kort) 1. Geen prepared statement gebruiken ❌ Variabele direct in SQL string zetten ✅ Gebruik altijd prepare() en execute() 2. Geen redirect gebruiken ❌ Refresh = dubbele insert ✅ Altijd redirect na succesvolle INSERT 3. exit vergeten na header() ❌ ✅ Video Uitleg volgt hier."
  },
  {
    "period": "Periode 1",
    "week": "Week 7",
    "title": "Sessions & Feedback",
    "url": "/periode-1/week-07.html",
    "text": "Week 7 – Sessions & Feedback In week 7 leer je hoe je tijdelijk data opslaat tussen pagina’s. HTTP is stateless: elke request staat op zichzelf. Sessions lossen dat op. Wat moet je kennen (samenvatting) Wat stateless betekent session start() bovenaan je bestand Data opslaan in $ SESSION isset() controleren unset() opruimen Flash messages (set → redirect → show → unset) 1. Wat is stateless? Uitleg HTTP onthoudt niets tussen requests. Zonder sessions weet je applicatie niet wat er eerder is gebeurd. Wat moet je kennen Elke pagina is een nieuwe request Data gaat verloren zonder opslag Sessions onthouden tijdelijk data Onthoud: Zonder session start() bestaat $ SESSION niet. 2. Session starten Uitleg Je moet een session starten voordat je $ SESSION gebruikt. Dit doe je helemaal bovenaan je PHP bestand. Wat moet je kennen session start(); Geen output vóór session start() Voorbeeld Onthoud: session start() komt vóór alle HTML. 3. Flash message tonen Uitleg Een flash message is een tijdelijke melding. Je toont hem één keer en verwijdert hem daarna. Wat moet je kennen isset() unset() Melding tonen in HTML Voorbeeld Onthoud: set → redirect → show → unset. Veelgemaakte fouten (kort) 1. session start vergeten ❌ ✅ 2. session start onder HTML zetten ❌ ✅ 3. unset vergeten ❌ Melding blijft steeds terugkomen ✅ Na tonen meteen unset($ SESSION['success']); Video Uitleg volgt hier."
  },
  {
    "period": "Periode 1",
    "week": "Week 8",
    "title": "Overzicht & Uitleggen",
    "url": "/periode-1/week-08.html",
    "text": "Week 8 – Overzicht & Uitleggen In week 8 breng je alles samen. Je moet niet alleen kunnen bouwen, maar ook kunnen uitleggen wat je doet en waarom. Wat moet je kennen (samenvatting) Hoe de volledige flow van je applicatie werkt PDO connectie SELECT + foreach (READ) INSERT + prepared statements (CREATE) Backend validatie Sessions voor feedback Redirect (PRG pattern) Werken met includes voor structuur 1. De complete applicatie flow Uitleg Je mini app heeft nu een vaste structuur. Elke actie volgt een logische volgorde. Flow overzicht Onthoud: Elke stap heeft een duidelijke taak. 2. Structuur van je project Uitleg Een professioneel project is logisch opgebouwd. Je verdeelt verantwoordelijkheden over meerdere bestanden. Wat moet je kennen includes/header.php includes/footer.php includes/db.php Scheiding van logica en HTML Voorbeeld Onthoud: Structuur maakt je project onderhoudbaar. 3. Studenten moeten kunnen uitleggen Je moet mondeling kunnen uitleggen: Wat PDO is en waarom we het gebruiken Waarom prepared statements belangrijk zijn Waarom backend validatie nodig is Waarom we redirect na POST gebruiken Waarom sessions nodig zijn Waarom we includes gebruiken Veelgemaakte fouten (kort) 1. Alles in één bestand zetten ❌ SQL, HTML, validatie en sessions in één groot index.php bestand ✅ Verdeel je code logisch over meerdere bestanden 2. exit vergeten na header() ❌ ✅ 3. Geen duidelijke flow begrijpen ❌ Losse stukjes code zonder samenhang ✅ Begrijpen hoe alle onderdelen samenwerken Video Uitleg volgt hier."
  },
  {
    "period": "Periode 2",
    "week": "Week 1",
    "title": "Edit pagina & een item ophalen",
    "url": "/periode-2/week-01.html",
    "text": "Weekschema: Week 1 – Edit pagina & één item ophalen Wat leer je deze week? In periode 1 kon je al meerdere items uit de database ophalen en tonen op een pagina. Deze week ga je een stap verder: je haalt één specifiek item op. Dat heb je nodig voor een editpagina, want voordat je iets kunt aanpassen, moet je eerst weten welk item je gaat aanpassen. Kernconcepten (in normale mensentaal) Een editpagina werkt eigenlijk als een formulier dat al is ingevuld. Stel: je hebt een lijst met huiswerkopdrachten. Als je op “bewerken” klikt bij één opdracht, moet PHP weten welke opdracht je bedoelt. Daarom geef je het id van dat item mee in de URL. Bijvoorbeeld: PHP leest dat id , zoekt in de database naar item 3 en vult daarna het formulier met de bestaande data. De flow is dus: Wat moet je kennen? 1. GET parameters uitlezen Uitleg GET data staat in de URL. Je gebruikt dit bijvoorbeeld om een id mee te sturen naar een detailpagina of editpagina. Wat moet je kennen $ GET query string met ?id=3 veilig uitlezen met ?? '' Voorbeeld URL: PHP: Onthoud: GET data is zichtbaar in de URL. Gebruik het dus niet voor wachtwoorden of geheime informatie. 2. Een editlink maken Uitleg Op je overzichtspagina toon je meerdere items. Bij elk item maak je een link naar de editpagina en stuur je het juiste id mee. Wat moet je kennen link maken met id uit een database array gebruiken ?id=... toevoegen aan de URL Voorbeeld Onthoud: Zonder id weet de editpagina niet welk item aangepast moet worden. 3. Eén item ophalen met SELECT WHERE Uitleg In periode 1 gebruikte je SELECT om meerdere items op te halen. Nu wil je één specifiek item ophalen. Daarvoor gebruik je WHERE . Wat moet je kennen SELECT FROM WHERE id = ? prepare() execute() fetch(PDO::FETCH ASSOC) Voorbeeld Onthoud: WHERE filtert je query. Je zegt eigenlijk: geef mij alleen de rij waarvan het id klopt. 4. fetch() gebruiken voor één resultaat Uitleg Als je meerdere items ophaalt, gebruik je fetchAll() . Als je één item ophaalt, gebruik je fetch() . Wat moet je kennen fetch(PDO::FETCH ASSOC) verschil tussen één rij en meerdere rijen associative array uitlezen Voorbeeld Onthoud: fetch() geeft één associative array terug. Je hoeft hier dus geen foreach voor te gebruiken. 5. Een formulier vooraf invullen Uitleg Op een editpagina wil je dat de bestaande data alvast in het formulier staat. Dat doe je met het value attribuut. Wat moet je kennen value=\"\" PHP shorthand data uit een associative array tonen Voorbeeld Onthoud: Je haalt data uit de database en zet die terug in het formulier. Veelgemaakte fouten (met voorbeelden) 1. Het id niet meesturen in de link Als je geen id meestuurt, weet edit.php niet welk item opgehaald moet worden. ❌ Fout ✅ Beter 2. $ GET['id'] gebruiken zonder fallback Als id niet in de URL staat, krijg je een warning. ❌ Fout ✅ Beter 3. Alle items ophalen in plaats van één item Voor een editpagina wil je niet de hele tabel ophalen. Je wil alleen het item dat bij het id hoort. ❌ Fout ✅ Beter 4. fetchAll() gebruiken voor één item fetchAll() geeft een lijst met resultaten terug. Voor een editpagina wil je juist één resultaat. ❌ Fout ✅ Beter 5. Vergeten om bestaande data in het formulier te tonen Dan ziet de gebruiker een leeg formulier en weet die niet wat er aangepast wordt. ❌ Fout ✅ Beter Snippets ID uitlezen uit de URL Editlink maken Eén item ophalen Data tonen in een formulier Controleren of er een item gevonden is Video (coming soon)"
  },
  {
    "period": "Periode 2",
    "week": "Week 2",
    "title": "UPDATE queries",
    "url": "/periode-2/week-02.html",
    "text": "Weekschema: Week 2 – UPDATE queries Wat leer je deze week? Vorige week kon je al één specifiek item ophalen uit de database. Deze week maak je jouw editpagina echt werkend: je gaat bestaande data aanpassen met een UPDATE query. Je leert hoe formulierdata terug naar de database gaat en waarom een WHERE in een UPDATE query super belangrijk is. Kernconcepten (in normale mensentaal) Een UPDATE query werkt eigenlijk als “overschrijven”. Stel: je hebt een huiswerkapp. Een gebruiker verandert een opdracht van: naar: Dan wil je niet een nieuw item maken. Je wil het bestaande item aanpassen. Daarom gebeurt de flow ongeveer zo: Wat moet je kennen? 1. Formulierdata ontvangen met POST Uitleg De gebruiker past data aan in een formulier. Daarna wordt die nieuwe data verstuurd via POST. Wat moet je kennen $ POST method=\"POST\" veilig uitlezen met ?? '' Voorbeeld Onthoud: POST gebruik je voor data die iets verandert in je applicatie. 2. Hidden inputs gebruiken Uitleg De gebruiker hoeft het id niet te zien, maar PHP heeft het wel nodig om te weten welk item aangepast moet worden. Daarom gebruik je een hidden input. Wat moet je kennen type=\"hidden\" id meesturen in een formulier data uit een associative array gebruiken Voorbeeld Onthoud: Hidden betekent alleen onzichtbaar in de pagina. De waarde wordt nog steeds meegestuurd. 3. Een UPDATE query schrijven Uitleg Met UPDATE pas je bestaande data aan in de database. Wat moet je kennen UPDATE SET WHERE prepared statements placeholders ? Voorbeeld Onthoud: SET bepaalt wat aangepast wordt. WHERE bepaalt WELKE rij aangepast wordt. 4. Waarom WHERE zo belangrijk is Uitleg Zonder WHERE weet de database niet welke rij aangepast moet worden. Dat betekent dat ALLE rijen aangepast kunnen worden. Ja. Echt allemaal 😭 Voorbeeld ❌ Zonder WHERE Resultaat: ✅ Met WHERE Resultaat: Onthoud: Een UPDATE zonder WHERE is gevaarlijk. 5. Redirect gebruiken na UPDATE Uitleg Na een succesvolle update stuur je de gebruiker meestal terug naar het overzicht. Wat moet je kennen header() exit redirect flow Voorbeeld Onthoud: Zonder redirect kan een refresh dezelfde update opnieuw uitvoeren. Veelgemaakte fouten (met voorbeelden) 1. WHERE vergeten in de UPDATE query Dit is waarschijnlijk de gevaarlijkste fout van deze week. ❌ Fout ✅ Beter 2. Het id niet meesturen in het formulier Dan weet PHP niet welk item aangepast moet worden. ❌ Fout ✅ Beter 3. POST gebruiken zonder fallback Als een veld ontbreekt, krijg je warnings. ❌ Fout ✅ Beter 4. De placeholders in verkeerde volgorde zetten De volgorde van de array moet overeenkomen met de query. ❌ Fout ✅ Beter 5. Geen redirect gebruiken na UPDATE Dan kan een refresh dezelfde query opnieuw uitvoeren. ❌ Fout ✅ Beter Snippets POST data uitlezen Hidden input maken UPDATE query uitvoeren Redirect gebruiken Controleren of formulier verstuurd is Video (coming soon)"
  },
  {
    "period": "Periode 2",
    "week": "Week 3",
    "title": "DELETE",
    "url": "/periode-2/week-03.html",
    "text": "Weekschema: Week 3 – DELETE Wat leer je deze week? In periode 1 kon je items toevoegen en tonen. In week 2 leerde je hoe je bestaande items aanpast. Deze week maak je jouw CRUD app compleet door items te verwijderen uit de database. Je leert hoe een deleteflow werkt, waarom een WHERE super belangrijk blijft en waarom delete acties best gevaarlijk kunnen zijn. Kernconcepten (in normale mensentaal) DELETE betekent eigenlijk: “haal deze rij weg uit de database.” Stel: iemand heeft per ongeluk een dubbele huiswerkopdracht toegevoegd. Dan wil je dat item kunnen verwijderen. Dat werkt meestal zo: Belangrijk: een DELETE query verwijdert data echt uit de database. Dus: geen undo knop geen prullenbak gone = gone 😭 Wat moet je kennen? 1. Een delete link maken Uitleg Op je overzichtspagina toon je meerdere items. Bij elk item maak je een link waarmee je het juiste id meestuurt. Wat moet je kennen ?id=... associative arrays uitlezen Voorbeeld Onthoud: Zonder id weet PHP niet welk item verwijderd moet worden. 2. Het id uitlezen met GET Uitleg Het id komt binnen via de URL. PHP leest dit uit met $ GET . Wat moet je kennen $ GET ?? '' query strings Voorbeeld Onthoud: GET data staat in de URL en is zichtbaar voor de gebruiker. 3. Een DELETE query schrijven Uitleg Met DELETE verwijder je een rij uit een database. Wat moet je kennen DELETE FROM WHERE prepared statements placeholders ? Voorbeeld Onthoud: WHERE bepaalt welke rij verwijderd wordt. 4. Waarom WHERE levensreddend is Uitleg Zonder WHERE verwijdert de database ALLE rijen uit de tabel. Ja. Echt alles 😭 Voorbeeld ❌ Zonder WHERE Resultaat: ✅ Met WHERE Resultaat: Onthoud: Een DELETE zonder WHERE is gevaarlijk. 5. Redirect gebruiken na DELETE Uitleg Na het verwijderen stuur je de gebruiker meestal terug naar het overzicht. Wat moet je kennen header() exit redirect flow Voorbeeld Onthoud: De gebruiker hoeft niet op een lege deletepagina te blijven hangen. Veelgemaakte fouten (met voorbeelden) 1. DELETE zonder WHERE gebruiken Dit is de grootste ramp van deze week 😭 ❌ Fout ✅ Beter 2. Het id niet meesturen in de link Dan weet PHP niet welk item verwijderd moet worden. ❌ Fout ✅ Beter 3. $ GET['id'] gebruiken zonder fallback Dan krijg je warnings als het id ontbreekt. ❌ Fout ✅ Beter 4. De query uitvoeren zonder prepare Directe queries zijn minder veilig en moeilijker uitbreidbaar. ❌ Fout ✅ Beter 5. Geen redirect gebruiken na DELETE Dan blijft de gebruiker op een losse deletepagina hangen. ❌ Fout ✅ Beter Snippets ID uitlezen uit URL Delete link maken DELETE query uitvoeren Redirect gebruiken Checken of item bestaat Video (coming soon)"
  },
  {
    "period": "Periode 2",
    "week": "Week 4",
    "title": "CRUD overzicht",
    "url": "/periode-2/week-04.html",
    "text": "Weekschema: Week 4 – CRUD overzicht Wat leer je deze week? In de afgelopen weken heb je geleerd hoe je: data toevoegt data uitleest data aanpast data verwijdert Deze week breng je alles samen in één complete CRUD app. Je gaat beter begrijpen hoe alle onderdelen samenwerken en hoe een echte webapplicatie flow heeft tussen formulieren, PHP en de database. Kernconcepten (in normale mensentaal) CRUD is eigenlijk de basis van bijna elke webapp. Denk bijvoorbeeld aan: een to do app Instagram posts Netflix profielen een webshop een agenda Bijna overal gebeurt dit: Dat noemen we CRUD. CRUD staat voor: Oftewel: iets maken iets lezen iets aanpassen iets verwijderen Deze week draait vooral om: “begrijpen hoe alles samenwerkt.” Wat moet je kennen? 1. Wat CRUD betekent Uitleg CRUD zijn de vier basisacties van een database applicatie. Wat moet je kennen Create Read Update Delete welke SQL query bij elke actie hoort Overzicht Actie SQL Betekenis Create INSERT Nieuwe data toevoegen Read SELECT Data ophalen Update UPDATE Data aanpassen Delete DELETE Data verwijderen Onthoud: Vrijwel elke database app gebruikt CRUD. 2. De flow van een CRUD app begrijpen Uitleg Een gebruiker doet iets in de browser. PHP verwerkt die actie en praat met de database. Wat moet je kennen formulieren GET en POST queries uitvoeren redirects gebruiken Voorbeeldflow Onthoud: PHP zit eigenlijk tussen de gebruiker en de database in. 3. Verschillende pagina’s gebruiken Uitleg Grote applicaties bestaan meestal uit meerdere bestanden met verschillende verantwoordelijkheden. Wat moet je kennen overzichtspagina createpagina editpagina deletepagina includes gebruiken Voorbeeldstructuur Onthoud: Een duidelijke structuur voorkomt chaos. 4. Redirects gebruiken Uitleg Na CREATE, UPDATE of DELETE stuur je de gebruiker meestal terug naar het overzicht. Wat moet je kennen header() exit redirect flow Voorbeeld Onthoud: Redirects zorgen voor een prettigere flow en voorkomen rare refresh problemen. 5. CRUD herkennen in een echte applicatie Uitleg CRUD zit letterlijk overal op internet. Voorbeelden Situatie CRUD actie Nieuwe Instagram post maken Create Posts bekijken Read Profiel aanpassen Update Bericht verwijderen Delete Onthoud: CRUD is niet alleen een schoolding. Dit is hoe echte apps werken. Veelgemaakte fouten (met voorbeelden) 1. CRUD acties door elkaar halen Soms gebruiken studenten per ongeluk de verkeerde query voor een actie. ❌ Fout om data op te halen. ✅ Beter 2. Alles in één gigantisch bestand zetten Dan wordt je project heel snel onoverzichtelijk. ❌ Fout ✅ Beter 3. Geen redirects gebruiken Dan blijven gebruikers op rare tussenpagina’s hangen. ❌ Fout ✅ Beter 4. GET en POST door elkaar halen GET gebruik je meestal voor: pagina’s openen ids meesturen POST gebruik je meestal voor: data aanpassen formulieren versturen ❌ Fout ✅ Beter 5. Geen WHERE gebruiken bij UPDATE of DELETE Dan verander of verwijder je ALLES. ❌ Fout ✅ Beter Snippets CREATE query READ query UPDATE query DELETE query Redirect gebruiken Video (coming soon)"
  },
  {
    "period": "Periode 2",
    "week": "Week 5",
    "title": "Registreren",
    "url": "/periode-2/week-05.html",
    "text": "Weekschema: Week 5 – Registreren Wat leer je deze week? Tot nu toe werkte jouw applicatie vooral met data zoals taken, notities of opdrachten. Deze week voeg je gebruikers toe aan je applicatie. Je leert hoe een registratiesysteem werkt en hoe je wachtwoorden veilig opslaat in een database. Dit is de eerste stap richting een echt login systeem. Kernconcepten (in normale mensentaal) Een registratiesysteem werkt eigenlijk als een aanmeldformulier voor jouw app. Een gebruiker: kiest een gebruikersnaam kiest een wachtwoord verstuurt het formulier PHP slaat de gebruiker op in de database Maar: wachtwoorden sla je NOOIT letterlijk op. Dus niet: Waarom niet? Als iemand toegang krijgt tot de database, kunnen alle wachtwoorden gelezen worden 😭 Daarom gebruik je hashing. Hashing verandert een wachtwoord in een soort onleesbare code. Bijvoorbeeld: PHP kan later nog steeds controleren of het wachtwoord klopt, zonder het echte wachtwoord op te slaan. Wat moet je kennen? 1. Een registratieformulier maken Uitleg Een gebruiker vult een formulier in met een gebruikersnaam en wachtwoord. Wat moet je kennen method=\"POST\" input type=\"text\" input type=\"password\" Voorbeeld Onthoud: type=\"password\" verbergt wat de gebruiker typt. 2. POST data uitlezen Uitleg PHP ontvangt de formulierdata via $ POST . Wat moet je kennen $ POST ?? '' formulierdata uitlezen Voorbeeld Onthoud: Gebruik een fallback zodat je geen warnings krijgt. 3. password hash() gebruiken Uitleg Wachtwoorden sla je nooit letterlijk op in de database. Daarom gebruik je password hash() . Wat moet je kennen password hash() PASSWORD DEFAULT hashing Voorbeeld Resultaat Onthoud: Je slaat de hash op, niet het echte wachtwoord. 4. Een gebruiker opslaan in de database Uitleg Nadat het wachtwoord gehashed is, kun je de gebruiker opslaan. Wat moet je kennen INSERT INTO prepared statements placeholders ? Voorbeeld Onthoud: De database krijgt de hash, niet het originele wachtwoord. 5. Een users tabel maken Uitleg Voor een login systeem heb je een aparte tabel nodig voor gebruikers. Wat moet je kennen CREATE TABLE VARCHAR AUTO INCREMENT PRIMARY KEY Voorbeeld Onthoud: De password kolom moet groot genoeg zijn voor hashes. Veelgemaakte fouten (met voorbeelden) 1. Het echte wachtwoord opslaan Dit is onveilig. ❌ Fout ✅ Beter 2. password hash() vergeten Dan wordt het wachtwoord leesbaar opgeslagen in de database. ❌ Fout ✅ Beter 3. type=\"text\" gebruiken voor wachtwoorden Dan kan iedereen meekijken 😭 ❌ Fout ✅ Beter 4. Geen prepared statements gebruiken Directe queries zijn minder veilig. ❌ Fout ✅ Beter 5. Een te kleine password kolom gebruiken Hashes zijn veel langer dan normale wachtwoorden. ❌ Fout ✅ Beter Snippets POST data uitlezen Wachtwoord hashen Gebruiker opslaan Redirect gebruiken Checken of formulier verstuurd is Video (coming soon)"
  },
  {
    "period": "Periode 2",
    "week": "Week 6",
    "title": "Login",
    "url": "/periode-2/week-06.html",
    "text": "Weekschema: Week 6 – Login Wat leer je deze week? Vorige week leerde je hoe je gebruikers registreert en wachtwoorden veilig opslaat. Deze week ga je gebruikers echt laten inloggen. Je leert hoe PHP controleert of een gebruikersnaam bestaat en of het wachtwoord klopt. Ook maak je kennis met sessions, zodat een gebruiker ingelogd kan blijven. Kernconcepten (in normale mensentaal) Een login systeem werkt eigenlijk als een digitale portier. Een gebruiker: vult een gebruikersnaam in vult een wachtwoord in PHP zoekt de gebruiker op in de database PHP controleert of het wachtwoord klopt als alles goed is, wordt de gebruiker “ingelogd” Maar: het wachtwoord in de database is gehashed. Dus PHP kan niet gewoon vergelijken: Dat werkt niet 😭 Daarom gebruik je: Die functie controleert: “hoort dit wachtwoord bij deze hash?” Wat moet je kennen? 1. Een loginformulier maken Uitleg De gebruiker vult een gebruikersnaam en wachtwoord in. Wat moet je kennen method=\"POST\" type=\"password\" formulierdata versturen Voorbeeld Onthoud: Het formulier verstuurt de logingegevens naar PHP. 2. POST data uitlezen Uitleg PHP ontvangt de formulierdata via $ POST . Wat moet je kennen $ POST ?? '' formulierdata uitlezen Voorbeeld Onthoud: Gebruik altijd een fallback om warnings te voorkomen. 3. Een gebruiker ophalen uit de database Uitleg PHP zoekt eerst naar de gebruiker in de database. Wat moet je kennen SELECT WHERE username = ? fetch(PDO::FETCH ASSOC) Voorbeeld Onthoud: Je zoekt één gebruiker op basis van de gebruikersnaam. 4. password verify() gebruiken Uitleg Het wachtwoord in de database is gehashed. Daarom gebruik je password verify() om te controleren of het ingevoerde wachtwoord klopt. Wat moet je kennen password verify() hashes controleren boolean resultaat ( true of false ) Voorbeeld Onthoud: password verify() vergelijkt het echte wachtwoord met de hash. 5. Een session gebruiken Uitleg Als de login klopt, wil je onthouden dat de gebruiker ingelogd is. Daarvoor gebruik je sessions. Wat moet je kennen session start() $ SESSION loginstatus opslaan Voorbeeld Onthoud: Sessions werken als tijdelijk geheugen voor PHP. 6. Redirect gebruiken na login Uitleg Na een succesvolle login stuur je de gebruiker meestal door naar het overzicht of dashboard. Wat moet je kennen header() exit redirect flow Voorbeeld Onthoud: Zonder redirect blijft de gebruiker op de loginpagina hangen. Veelgemaakte fouten (met voorbeelden) 1. Het wachtwoord vergelijken met == Dat werkt niet met hashes. ❌ Fout ✅ Beter 2. Geen gebruiker ophalen uit de database Dan bestaat $user niet. ❌ Fout ✅ Beter 3. session start() vergeten Dan werken sessions niet. ❌ Fout ✅ Beter 4. Geen fallback gebruiken bij POST data Dan krijg je warnings als velden ontbreken. ❌ Fout ✅ Beter 5. Geen redirect gebruiken na login Dan blijft de gebruiker op de loginpagina. ❌ Fout ✅ Beter Snippets POST data uitlezen Gebruiker ophalen Wachtwoord controleren Session opslaan Redirect gebruiken Video (coming soon)"
  },
  {
    "period": "Periode 2",
    "week": "Week 7",
    "title": "Loginstatus & beveiligde pagina's",
    "url": "/periode-2/week-07.html",
    "text": "Weekschema: Week 7 – Loginstatus & beveiligde pagina’s Wat leer je deze week? Vorige week kon je gebruikers laten inloggen met een loginformulier en sessions. Deze week ga je pagina’s beschermen. Niet iedereen mag zomaar overal bij kunnen. Je leert hoe PHP controleert of een gebruiker ingelogd is en hoe je bezoekers doorstuurt als dat niet zo is. Kernconcepten (in normale mensentaal) Een beveiligde pagina werkt eigenlijk als een portier bij een concert 😭 De portier kijkt: “Sta jij op de gastenlijst?” Bij een webapp doet PHP eigenlijk hetzelfde. PHP controleert: bestaat er een session? is de gebruiker ingelogd? mag deze gebruiker deze pagina zien? Als dat niet zo is: wordt de gebruiker doorgestuurd naar login.php Dus ongeveer zo: Belangrijk: de controle gebeurt server side in PHP. Dus: niet alleen een knop verbergen niet alleen CSS gebruiken PHP bepaalt uiteindelijk toegang Wat moet je kennen? 1. session start() gebruiken Uitleg Sessions werken alleen als je ze eerst start. Wat moet je kennen session start() sessions initialiseren bovenaan pagina plaatsen Voorbeeld Onthoud: session start() moet bovenaan je bestand staan, vóór HTML output. 2. Loginstatus opslaan in een session Uitleg Na een succesvolle login sla je informatie op in $ SESSION . Wat moet je kennen $ SESSION associative arrays loginstatus onthouden Voorbeeld Onthoud: Sessions werken als tijdelijk geheugen voor PHP. 3. Controleren of een gebruiker ingelogd is Uitleg Met isset() controleer je of een session bestaat. Wat moet je kennen isset() $ SESSION if statements Voorbeeld Onthoud: isset() controleert of een waarde bestaat. 4. Een pagina beveiligen Uitleg Als een gebruiker niet ingelogd is, stuur je die terug naar de loginpagina. Wat moet je kennen header() exit redirects login checks Voorbeeld Onthoud: De redirect stopt ongewenste toegang tot de pagina. 5. Uitloggen met session destroy() Uitleg Bij uitloggen verwijder je de session van de gebruiker. Wat moet je kennen session destroy() redirects sessions verwijderen Voorbeeld Onthoud: Uitloggen betekent dat de session verwijderd wordt. 6. Beschermde pagina’s herkennen Uitleg Niet elke pagina hoeft beveiligd te zijn. Voorbeelden Pagina Beveiligd? login.php Nee register.php Nee dashboard.php Ja admin.php Ja edit.php Vaak wel Onthoud: Pagina’s die data aanpassen zijn meestal beveiligd. Veelgemaakte fouten (met voorbeelden) 1. session start() vergeten Dan werken sessions niet. ❌ Fout ✅ Beter 2. HTML tonen vóór session start() Dan krijg je vaak errors. ❌ Fout ✅ Beter 3. Alleen een knop verbergen Een verborgen knop betekent niet dat een pagina beveiligd is. ❌ Fout zonder beveiliging in admin.php . ✅ Beter 4. exit vergeten na redirect Dan kan PHP soms nog verder uitvoeren. ❌ Fout ✅ Beter 5. session destroy() gebruiken zonder session start() Dan bestaat de session niet. ❌ Fout ✅ Beter Snippets Session starten Loginstatus opslaan Checken of gebruiker ingelogd is Pagina beveiligen Uitloggen Video (coming soon)"
  },
  {
    "period": "Periode 2",
    "week": "Week 8",
    "title": "Dynamisch menu",
    "url": "/periode-2/week-08.html",
    "text": "Weekschema: Week 8 – Dynamisch menu Wat leer je deze week? In de vorige weken leerde je: gebruikers registreren gebruikers laten inloggen pagina’s beveiligen met sessions Deze week maak je jouw interface slimmer. Je leert hoe PHP verschillende content kan tonen afhankelijk van de loginstatus van een gebruiker. Je menu wordt dus dynamisch. Kernconcepten (in normale mensentaal) Een dynamisch menu betekent eigenlijk: “de website verandert afhankelijk van wie je bent.” Bijvoorbeeld: een ingelogde gebruiker ziet: logout nieuw item toevoegen dashboard een bezoeker ziet: login registreren PHP controleert dus: Dat gebeurt server side met een if statement. Wat moet je kennen? 1. session start() gebruiken Uitleg Om loginstatus te controleren moet de session gestart zijn. Wat moet je kennen session start() sessions initialiseren bovenaan pagina plaatsen Voorbeeld Onthoud: Zonder session start() kun je $ SESSION niet gebruiken. 2. Controleren of een gebruiker ingelogd is Uitleg Met isset() controleer je of een session bestaat. Wat moet je kennen isset() $ SESSION boolean waarden ( true / false ) Voorbeeld Onthoud: Dit geeft true of false terug. 3. Dynamische content tonen met if statements Uitleg PHP kan verschillende HTML tonen afhankelijk van een conditie. Wat moet je kennen if else PHP combineren met HTML Voorbeeld Onthoud: PHP bepaalt welke HTML zichtbaar wordt. 4. Alternatieve PHP syntax gebruiken Uitleg Bij veel HTML is alternatieve syntax vaak overzichtelijker dan losse {} . Wat moet je kennen if(): else: endif; Voorbeeld Onthoud: Deze syntax wordt veel gebruikt in templates en views. 5. Een menu logisch opbouwen Uitleg Niet elke gebruiker hoeft dezelfde links te zien. Voorbeeld Ingelogd Niet ingelogd Logout Login Nieuw item Registreren Dashboard Home Onthoud: Het menu verandert op basis van de loginstatus. 6. Dynamische tekst tonen Uitleg Je kunt ook tekst aanpassen op basis van de gebruiker. Wat moet je kennen associative arrays sessions uitlezen Voorbeeld Onthoud: Je kunt data uit de session direct tonen in HTML. Veelgemaakte fouten (met voorbeelden) 1. session start() vergeten Dan werkt $ SESSION niet. ❌ Fout ✅ Beter 2. endif vergeten Dan krijg je syntax errors. ❌ Fout ✅ Beter 3. HTML buiten het if statement plaatsen Dan ziet iedereen alles. ❌ Fout zonder controle. ✅ Beter 4. = gebruiken in plaats van == Dan verander je per ongeluk de waarde. ❌ Fout ✅ Beter of gewoon: 5. Sessiondata tonen zonder check Dan krijg je warnings als de gebruiker niet ingelogd is. ❌ Fout ✅ Beter Snippets Session starten Loginstatus controleren Dynamisch menu Gebruikersnaam tonen Alternatieve syntax Video (coming soon)"
  }
];
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function relativeUrl(url) {
  const depth = window.location.pathname.includes("/periode-") ? "../" : "";
  return depth + url.replace(/^\//, "");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  })[char]);
}

function snippet(text, query) {
  const clean = text.replace(/\s+/g, " ").trim();
  const index = normalize(clean).indexOf(normalize(query));
  const start = Math.max(0, index - 42);
  return (start > 0 ? "..." : "") + clean.slice(start, start + 132) + (start + 132 < clean.length ? "..." : "");
}

function runSearch(query) {
  if (!searchResults) return;
  const q = query.trim();
  if (q.length < 2) {
    searchResults.classList.remove("active");
    searchResults.innerHTML = "";
    return;
  }

  const normalized = normalize(q);
  const results = searchIndex
    .filter((item) => normalize([item.period, item.week, item.title, item.text].join(" ")).includes(normalized))
    .slice(0, 8);

  if (!results.length) {
    searchResults.innerHTML = '<div class="search-result-item"><span class="search-result-title">Geen resultaten</span><span class="search-result-text">Probeer een andere term.</span></div>';
  } else {
    searchResults.innerHTML = results
      .map((item) => '<a class="search-result-item" href="' + relativeUrl(item.url) + "?q=" + encodeURIComponent(q) + '"><span class="search-result-meta">' + escapeHtml(item.period) + " · " + escapeHtml(item.week) + '</span><span class="search-result-title">' + escapeHtml(item.title) + '</span><span class="search-result-text">' + escapeHtml(snippet(item.text, q)) + "</span></a>")
      .join("");
  }

  searchResults.classList.add("active");
}

function clearHighlights(root) {
  root.querySelectorAll("mark.highlight").forEach((mark) => mark.replaceWith(document.createTextNode(mark.textContent)));
  root.normalize();
}

function escapeRegExp(value) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

function highlightOnPage(query) {
  const root = document.querySelector(".content");
  if (!root || !query || query.length < 2) return;
  clearHighlights(root);

  const regex = new RegExp("(" + escapeRegExp(query) + ")", "gi");
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("pre, code, script, style, mark")) return NodeFilter.FILTER_REJECT;
      regex.lastIndex = 0;
      return regex.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    regex.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    node.nodeValue.replace(regex, (match, _group, offset) => {
      fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, offset)));
      const mark = document.createElement("mark");
      mark.className = "highlight";
      mark.textContent = match;
      fragment.appendChild(mark);
      lastIndex = offset + match.length;
    });
    fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
    node.replaceWith(fragment);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => runSearch(event.target.value));
  searchInput.addEventListener("focus", (event) => runSearch(event.target.value));
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchResults?.classList.remove("active");
      searchInput.blur();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-container")) searchResults?.classList.remove("active");
  });
}

if (hamburger && sidebar) {
  hamburger.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });
  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
      sidebar.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

const query = new URLSearchParams(window.location.search).get("q");
if (query) {
  if (searchInput) searchInput.value = query;
  highlightOnPage(query);
}
