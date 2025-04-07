function getTemplate(index, category) {
    const item = menuItems[category][index]; 

    return `
        <div class="menu-item">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="menu-item-price">${item.price.toFixed(2).replace(".", ",")} €</span>
            <img onclick="addToShoppinglist(${index}, '${category}')" class="menu-item-add" src="./img/assets/plus.png" alt="plus symbol">
        </div>
    `;
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
     