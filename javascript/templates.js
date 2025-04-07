function getTemplateBurger(indexBurger) {
    return`<div class="menu-item">
                        <h3>${burgers[indexBurger].name}</h3>
                        <p>${burgers[indexBurger].description}</p>
                        <span class="menu-item-price">${burgers[indexBurger].price.toFixed(2).replace(".", ",")} €</span>
                        <img onclick="addToShoppinglist(${indexBurger})" class="menu-item-add" src="./img/assets/plus.png" alt="plus symbol">
                    </div>`
}

function getTemplateSide(indexSide) {
    return `<div class="menu-item">
                <h3>${sides[indexSide].name}</h3>
                <p>${sides[indexSide].description}</p>
                <span class="menu-item-price">${sides[indexSide].price.toFixed(2).replace(".", ",")} €</span>
                <img onclick="addToShoppinglistSides(${indexSide})" class="menu-item-add" src="./img/assets/plus.png" alt="plus symbol">
            </div>`;
}

function getTemplateDip(indexDip) {
    return `<div class="menu-item">
                <h3>${dips[indexDip].name}</h3>
                <p>${dips[indexDip].description}</p>
                <span class="menu-item-price">${dips[indexDip].price.toFixed(2).replace(".", ",")} €</span>
                <img onclick="addToShoppinglistDips(${indexDip})" class="menu-item-add" src="./img/assets/plus.png" alt="plus symbol">
            </div>`;
}


function getTemplateDrink(indexDrink) {
    return `<div class="menu-item">
                <h3>${drinks[indexDrink].name}</h3>
                <p>${drinks[indexDrink].description}</p>
                <span class="menu-item-price">${drinks[indexDrink].price.toFixed(2).replace(".", ",")} €</span>
                <img onclick="addToShoppinglistDrinks(${indexDrink})" class="menu-item-add" src="./img/assets/plus.png" alt="plus symbol">
            </div>`;
}

function getTemplateDessert(indexDessert) {
    return `<div  class="menu-item">
                <h3>${desserts[indexDessert].name}</h3>
                <p>${desserts[indexDessert].description}</p>
                <span class="menu-item-price">${desserts[indexDessert].price.toFixed(2).replace(".", ",")} €</span>
                <img onclick="addToShoppinglistDesserts(${indexDessert})" class="menu-item-add" src="./img/assets/plus.png" alt="plus symbol">
            </div>`;
}

function getShoppinglistTemplate(indexMyList) {
    return `<div class="shopping-container">
                    <h3>${myList[indexMyList].name}</h3>
                    <div class="shopping-element">
                        <div class="shopping-amount">
                            <img onclick="removeAmount(${indexMyList})" src="./img/assets/minus.png" alt="minus symbol">
                            <span id="shoppinglist${indexMyList}ammount">${myList[indexMyList].ammount}x</span>
                            <img onclick="addAmount(${indexMyList})" src="./img/assets/plus.png" alt="plus symbol">
                        </div>
                        <div class="shopping-price">
                            <span id="shoppinglist${indexMyList}price">${(myList[indexMyList].price * myList[indexMyList].ammount).toFixed(2).replace(".", ",")} €</span>
                            <img onclick="deleteShoppingElement(${indexMyList})" class="trashcan" src="./img/assets/trashcan.png" alt="trashcan">
                        </div>
                    </div>
                </div>`
}