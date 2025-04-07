let rating = 4.5;
let reviews = 200;
let liked = false;
let isPickup = true;

function toggleRating() {
    if (!liked) {
        reviews++;
        rating = ((rating * (reviews - 1)) + 5) / reviews;
    } else {
        rating = ((rating * reviews) - 5) / (reviews - 1);
        reviews--;
    }

    liked = !liked;

    document.getElementById("rating").textContent = rating.toFixed(1);
    document.getElementById("reviews").textContent = `(${reviews} Bewertungen)`;

    let star = document.getElementById("star");
    star.style.color = liked ? "#FFD700" : "#999";
}

function render() {
    renderAllItems();
    renderShoppinglist();
    renderSum();
}

function renderAllItems() {
    renderCategoryItems('burgers');
    renderCategoryItems('sides');
    renderCategoryItems('dips');
    renderCategoryItems('drinks');
    renderCategoryItems('desserts');
}

function renderCategoryItems(category) {
    let categoryRef = document.getElementById(category);
    categoryRef.innerHTML = "";

    if (menuItems[category]) {
        for (let index = 0; index < menuItems[category].length; index++) {
            categoryRef.innerHTML += getTemplate(index, category);
        }
    }
}

function renderShoppinglist() {
    let shoppingListRef = document.getElementById("shopping-list");
    let sumPriceContainerRef = document.getElementById("shopping-cart-price-summary");
    let emptyCartMessage = document.getElementById("shopping-cart-empty");

    shoppingListRef.innerHTML = "";

    if (myList.length > 0) {
        for (let index = 0; index < myList.length; index++) {
            shoppingListRef.innerHTML += getShoppinglistTemplate(index);
        }
        sumPriceContainerRef.classList.remove("d_none");
        emptyCartMessage.classList.add("d_none");
        renderSum();
    } else {
        sumPriceContainerRef.classList.add("d_none");
        emptyCartMessage.classList.remove("d_none");
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

function addToShoppinglist(index, category) {
    const item = menuItems[category][index];
    let checkShoppingList = myList.findIndex(listElement => listElement.name === item.name);

    if (checkShoppingList < 0) {
        let newItem = { name: item.name, price: item.price, description: item.description, ammount: 1 };
        myList.push(newItem);
    } else {
        myList[checkShoppingList].ammount++;
    }
    renderShoppinglist();
}

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

function toggleDeliveryOption(option) {
    isPickup = option === 'pickup';
    document.getElementById('pickup-btn').classList.toggle('active', isPickup);
    document.getElementById('delivery-btn').classList.toggle('active', !isPickup);
    renderSum();
}

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

