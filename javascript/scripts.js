// 
// Bewertungssystem
// 

// Startbewertung und Anzahl der Bewertungen
let rating = 4.5;
let reviews = 200;
let liked = false; // Speichert, ob der Stern aktiv ist

// Funktion zum Umschalten der Bewertung
function toggleRating() {
    if (!liked) {
        // Bewertung erhöhen (Stern aktiv)
        reviews++;
        rating = ((rating * (reviews - 1)) + 5) / reviews; 
    } else {
        // Bewertung verringern (Stern inaktiv)
        rating = ((rating * reviews) - 5) / (reviews - 1);
        reviews--;
    }

    liked = !liked; // Zustand umkehren

    // Elemente aktualisieren
    document.getElementById("rating").textContent = rating.toFixed(1);
    document.getElementById("reviews").textContent = `(${reviews} Bewertungen)`;

    // Stern-Farbe ändern
    let star = document.getElementById("star");
    star.style.color = liked ? "#FFD700" : "#999"; // Gelb für aktiv, Grau für inaktiv
}


//
// Rendering der Speisekategorien
// 

function render() {
    renderBurgers()
    renderSides();
    renderDips();
    renderDrinks();
    renderDesserts();
}

function renderBurgers() {
    let burgersRef = document.getElementById("burgers");
    burgersRef.innerHTML = "";

    for (let indexBurger = 0; indexBurger < burgers.length; indexBurger++) {
        burgersRef.innerHTML += getTemplateBurger(indexBurger);
    }
}

function renderSides() {
    let sidesRef = document.getElementById("sides");
    sidesRef.innerHTML = "";

    for (let indexSide = 0; indexSide < sides.length; indexSide++) {
        sidesRef.innerHTML += getTemplateSide(indexSide);
    }
}

function renderDips() {
    let dipsRef = document.getElementById("dips");
    dipsRef.innerHTML = "";

    for (let indexDip = 0; indexDip < dips.length; indexDip++) {
        dipsRef.innerHTML += getTemplateDip(indexDip);
    }
}

function renderDrinks() {
    let drinksRef = document.getElementById("drinks");
    drinksRef.innerHTML = "";

    for (let indexDrink = 0; indexDrink < drinks.length; indexDrink++) {
        drinksRef.innerHTML += getTemplateDrink(indexDrink);
    }
}

function renderDesserts() {
    let dessertsRef = document.getElementById("desserts");
    dessertsRef.innerHTML = "";

    for (let indexDessert = 0; indexDessert < desserts.length; indexDessert++) {
        dessertsRef.innerHTML += getTemplateDessert(indexDessert);
    }
}


// 
// Produkte zum Warenkorb hinzufügen
// 

function addToShoppinglist(indexBurger) {
    let checkShoppingList = myList.findIndex((listElement) => listElement["name"] == burgers[indexBurger].name);
    let emptyCart = document.getElementById("shopping-cart-empty");
    let orderAcceptedRef = document.getElementById("order-confirmation");
    orderAcceptedRef.classList.add("d_none");
    emptyCart.classList.add("d_none");

    if (checkShoppingList < 0) {
        burgers[indexBurger].ammount = 1;
        myList.push(burgers[indexBurger]);
        renderShoppinglist();
    } else {
        myList[checkShoppingList].ammount++;
        newAmmount(checkShoppingList);
    }
}

function addToShoppinglistSides(indexSide) {
    let checkShoppingList = myList.findIndex((listElement) => listElement["name"] == sides[indexSide].name);
    let emptyCart = document.getElementById("shopping-cart-empty");
    let orderAcceptedRef = document.getElementById("order-confirmation");
    orderAcceptedRef.classList.add("d_none");
    emptyCart.classList.add("d_none");

    if (checkShoppingList < 0) {
        sides[indexSide].ammount = 1;
        myList.push(sides[indexSide]);
        renderShoppinglist();
    } else {
        myList[checkShoppingList].ammount++;
        newAmmount(checkShoppingList);
    }
}

function addToShoppinglistDips(indexDip) {
    let checkShoppingList = myList.findIndex((listElement) => listElement["name"] == dips[indexDip].name);
    let emptyCart = document.getElementById("shopping-cart-empty");
    let orderAcceptedRef = document.getElementById("order-confirmation");
    orderAcceptedRef.classList.add("d_none");
    emptyCart.classList.add("d_none");

    if (checkShoppingList < 0) {
        dips[indexDip].ammount = 1;
        myList.push(dips[indexDip]);
        renderShoppinglist();
    } else {
        myList[checkShoppingList].ammount++;
        newAmmount(checkShoppingList);
    }
}

function addToShoppinglistDrinks(indexDrink) {
    let checkShoppingList = myList.findIndex((listElement) => listElement["name"] == drinks[indexDrink].name);
    let emptyCart = document.getElementById("shopping-cart-empty");
    let orderAcceptedRef = document.getElementById("order-confirmation");
    orderAcceptedRef.classList.add("d_none");
    emptyCart.classList.add("d_none");

    if (checkShoppingList < 0) {
        drinks[indexDrink].ammount = 1;
        myList.push(drinks[indexDrink]);
        renderShoppinglist();
    } else {
        myList[checkShoppingList].ammount++;
        newAmmount(checkShoppingList);
    }
}

function addToShoppinglistDesserts(indexDessert) {
    let checkShoppingList = myList.findIndex((listElement) => listElement["name"] == desserts[indexDessert].name);
    let emptyCart = document.getElementById("shopping-cart-empty");
    let orderAcceptedRef = document.getElementById("order-confirmation");
    orderAcceptedRef.classList.add("d_none");
    emptyCart.classList.add("d_none");

    if (checkShoppingList < 0) {
        desserts[indexDessert].ammount = 1;
        myList.push(desserts[indexDessert]);
        renderShoppinglist();
    } else {
        myList[checkShoppingList].ammount++;
        newAmmount(checkShoppingList);
    }
}


// 
// Warenkorb & Preisberechnung
// 

function renderShoppinglist() {
    let shoppingListRef = document.getElementById("shopping-list");
    let sumPriceContainerRef = document.getElementById("shopping-cart-price-summary");
    shoppingListRef.innerHTML = "";

    if (myList.length != 0) {
        for (let indexMyList = 0; indexMyList < myList.length; indexMyList++) {
            shoppingListRef.innerHTML += getShoppinglistTemplate(indexMyList);
        }
        sumPriceContainerRef.classList.remove("d_none");
        renderSum();
    }
}

function renderSum() {
    let subTotalRef = document.getElementById("subtotal");
    let deliveryCostRef = document.getElementById("delivery-cost");
    let sumPriceRef = document.getElementById("total-price");

    let subTotal = 0;
    let deliveryCost = isPickup ? 0 : 3.99;
    let sumPrice = 0;

    subTotalRef.innerHTML = "";

    for (let indexSubTotal = 0; indexSubTotal < myList.length; indexSubTotal++) {
        subTotal += (myList[indexSubTotal].price * myList[indexSubTotal].ammount);
    }

    subTotalRef.innerHTML = subTotal.toFixed(2).replace(".", ",") + " €";
    deliveryCostRef.innerHTML = deliveryCost.toFixed(2).replace(".", ",") + " €";
    sumPrice = deliveryCost + subTotal;
    sumPriceRef.innerHTML = sumPrice.toFixed(2).replace(".", ",") + " €";
}


// 
// Mengensteuerung im Warenkorb
// 

function addAmount(indexMyList) {
    myList[indexMyList].ammount++;
    newAmmount(indexMyList);
}

function newAmmount(indexMyList) {
    let shoppingListAmmount = document.getElementById("shoppinglist" + indexMyList + "ammount");
    let shoppingListPrice = document.getElementById("shoppinglist" + indexMyList + "price");
    let newAmmount = myList[indexMyList].ammount;
    let newPrice = (myList[indexMyList].price * myList[indexMyList].ammount).toFixed(2).replace(".", ",");

    shoppingListAmmount.innerHTML = newAmmount + "x";
    shoppingListPrice.innerHTML = newPrice + " €";

    renderSum();
}

function removeAmount(indexMyList) {
    if (myList[indexMyList].ammount >= 2) {
        myList[indexMyList].ammount--;
        newAmmount(indexMyList);
    } else {
        deleteShoppingElement(indexMyList);
    }
}

function deleteShoppingElement(indexMyList) {
    let emptyCart = document.getElementById("shopping-cart-empty");
    let sumPriceContainerRef = document.getElementById("shopping-cart-price-summary");

    myList.splice(indexMyList, 1);
    renderShoppinglist();

    if (myList.length == 0) {
        emptyCart.classList.remove("d_none");
        sumPriceContainerRef.classList.add("d_none");
    }
}


// 
// Abholung oder Lieferung auswählen
// 

let isPickup = true;

function toggleDeliveryOption(option) {
    isPickup = option === 'pickup';

    document.getElementById('pickup-btn').classList.toggle('active', isPickup);
    document.getElementById('delivery-btn').classList.toggle('active', !isPickup);

    renderSum();
}


// 
// Warenkorb anzeigen / verstecken (mobil)
// 

function showShoppingCart() {
    let shoopingCart = document.getElementById("shopping-cart");
    let shoppingBtn = document.getElementById("shopping-cart");
    let bodyScrollOff = document.getElementById("body");
    let headerFixed = document.getElementById("header");

    headerFixed.classList.toggle("header-mobile");
    shoopingCart.classList.toggle("shopping-cart-slide");
    shoppingBtn.classList.toggle("mobile-overflow");
    bodyScrollOff.classList.toggle("body-scroll-off");
}


// 
// Bestellung abschließen & zurücksetzen
// 

function order() {
    myList = [];
    renderShoppinglist();

    let sumPriceContainerRef = document.getElementById("shopping-cart-price-summary");
    sumPriceContainerRef.classList.add("d_none");

    let orderAcceptedRef = document.getElementById("order-confirmation");
    orderAcceptedRef.classList.remove("d_none");

    let emptyCart = document.getElementById("shopping-cart-empty");
    emptyCart.classList.add("d_none");

    let shoppingListRef = document.getElementById("shopping-list");
    shoppingListRef.innerHTML = ""; 
}

function newOrder() {
    let orderAcceptedRef = document.getElementById("order-confirmation");
    orderAcceptedRef.classList.add("d_none");

    let emptyCart = document.getElementById("shopping-cart-empty");
    emptyCart.classList.remove("d_none");

    myList = [];
    renderShoppinglist();
    renderSum();

    if (myList.length === 0) {
        emptyCart.classList.remove("d_none");
    }
}
