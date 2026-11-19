import { menuArray } from "./data/data.js"
import { findItemById } from "./utils/findItemById.js"

const itemsCtn = document.getElementById("items-ctn")
const orderProcess = document.getElementById("order-process")
const payForm = document.getElementById("pay-form")
const payCtn = document.getElementById("pay-ctn")


let ordersArr = []
let totalPrice = 0


document.addEventListener('click', function(e){
    const clickedElement = e.target
    if(clickedElement.id === "item-add-btn"){
        addItemToOrderArr(clickedElement.dataset.id)
    }
    else if(clickedElement.id === "complete-order-btn"){
        payCtn.classList.add("active")
    }
})

payForm.addEventListener('submit', function(e){
    e.preventDefault()
    payForOrders()
})

renderMenu()





function generateMenu(){
    return menuArray.map((item, i) => 
        `
            <div class="item" data-id="${item.id}">
                <!-- Desc -->
                <div class="item-description">
                    <div class="item-emoji">
                        <span>${item.emoji}</span>
                    </div>
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>${item.ingredients.join(", ")}</p>
                        <span>$${item.price}</span>
                    </div>
                </div>
                <!-- Add Btn -->
                <div class="item-add-btn-ctn">
                    <button class="item-add-btn" id="item-add-btn" data-id="${item.id}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
            ${i + 1 < menuArray.length ? `<hr class="item-divide" />` : ""}
        `
    ).join("")
}

function renderMenu(){
    itemsCtn.innerHTML = generateMenu()
}


function addItemToOrderArr(itemId){
    const selectedItem = findItemById(itemId, menuArray)
    
    const orderArrHasItem = ordersArr.some( item => item.id === selectedItem.id )
    
    if(orderArrHasItem){
        alert(`${selectedItem.name} already in cart!`)
    } else{
        ordersArr.push(selectedItem)
        processOrder(ordersArr)
    }
}

function processOrder(ordersArr){
    
    const listOfOrders = generateOrders(ordersArr)
    calculateTotalPrice()

    const orderProcessHtmlString = `
        <div class="order">
                <div class="order-details">
                    <h2>Your Order</h2>
                    <div class="orders-selected">
                        ${listOfOrders}
                    </div>
                    <hr />
                    <div class="order-total">
                        <h3>Order Total</h3>
                        <span>$${totalPrice}</span>
                    </div>
                </div>

                <button class="complete-order-btn" id="complete-order-btn">
                    Complete Order
                </button>
            </div>
    `
    orderProcess.innerHTML = orderProcessHtmlString
}


function generateOrders(ordersArr){
    return ordersArr.map( order => `
        <div class="selected-order">
            <p>${order.name}</p>
            <span>
                $${order.price}
            </span>
        </div>
    `).join(' ')
}

function payForOrders(){
    payCtn.classList.remove("active")
    orderProcess.innerHTML = `
        <div class="order-message">
            <p>Thank you for shopping with us, Your Order is on it's way </p>
        </div>
    `

    setTimeout(() => {
        orderProcess.innerHTML = ""
    }, 2000)
}

function calculateTotalPrice(){
    totalPrice = ordersArr.reduce((total, curr) => total + curr.price , 0)
}


