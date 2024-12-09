class Store{
    constructor(){
        // track how many items are in the cart and the subtotal of the items

        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0
        }

        this.menu = {

            item1: {
                id: 1,
                dish: 'jelly filled pastries',
                imgUrl: 'bake.jpg',
                alt: 'pastries filled with grape jelly',
                desc: 'freashly baked pastries filled with grape jelly',
                price: 4.00,
                qty: 0
            },
            item2: {
                id: 2,
                dish: 'ramen',
                imgUrl: 'pasta.jpg',
                alt: 'a bowl filled with ramen',
                desc: 'ramen served with meat and veggies',
                price: 8.00,
                qty: 0
            },
            item3: {
                id: 3,
                dish: 'pizza',
                imgUrl: 'pizza.jpg',
                alt: 'a cheese pizza',
                desc: 'a six sliced cheese pizza',
                price: 7.50,
                qty: 0
            },
            item4: {
                id: 4,
                dish: 'steak',
                imgUrl: 'steak.jpg',
                alt: 'a thick peice of steak',
                desc: 'a thick peice of steak',
                price: 12.00,
                qty: 0
            },
            item5: {
                id: 5,
                dish: 'hamburger',
                imgUrl: 'burger.jpg',
                alt: 'a burger topped with lettece, bacon, tomato, and pickels',
                desc: 'a burger topped with lettece, bacon, tomato, and pickels',
                price: 10.00,
                qty: 0
            },
            item6: {
                id: 6,
                dish: 'root beer',
                imgUrl: 'root-beer.jpg',
                alt: 'a bottle of rooter beer',
                desc: 'a bottle of rooter beer',
                price: 1.00,
                qty: 0
            },
            item7: {
                id: 7,
                dish: 'lemonaid',
                imgUrl: 'lemonaid.jpg',
                alt: 'a bottle of minute maid',
                desc: 'a bottle of minute maid',
                price: 1.00,
                qty: 0
            },
            item8: {
                id: 8,
                dish: 'water',
                imgUrl: 'water.jpg',
                alt: 'a bottle of water',
                desc: 'a bottle of water',
                price: 1.00,
                qty: 0
            }
        }
    }

    init(){
        // console.log('initialized')
        this.loadItems()
        this.addToCart()
        this.checkout()
    }

    loadItems(){
        // console.log('items loaded')
        const itemDiv = document.getElementById('itemDiv')
        
        /** 
         * for in loop
         * 
         * for in loop loops through properties of an object
        */

        for(const key in this.menu){
            const item = this.menu[key]
            // console.log(item)
            const product = document.createElement('div')
            product.className = 'col'
            product.setAttribute('id', `item-${item.id}`)
            
            product.innerHTML = `
            <figure class="figure item-figure">
                    <img src="${item.imgUrl}" alt="${item.alt}" class="img-fluid image item-image figure-img" />
                    <figcaption class="figure-caption item-caption">${item.dish}
                        <span class="item-price" id="itemPrice">${item.price}</span>
                    </figcaption>
                    <p class="item-desc" id="itemDesc">${item.desc}</p>
                    <button class="btn menu-btn text-capitalize" id="menuBtn" data-id="${item.id}">add to cart</button>
            </figure>
            `

            itemDiv.appendChild(product)
        }
    }

    addToCart(){
        const menuButtons = document.querySelectorAll('.menu-btn')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        let price = 0

        let subTimesQty = 0 
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        let tax = 0
        let taxRate = .07
        const deliveryValue = document.getElementById('deliveryValue')
        const checkoutItemCount = document.getElementById('checkoutItemCount')
        let deliveryFee = 6
        let total = 0
        const totalValue = document.getElementById('totalValue')

        // loop through this.menu
        for(const key in this.menu){
            const item = this.menu[key]

            // loop through buttons
            menuButtons.forEach(button => {
                button.addEventListener('click',()=>{
                    // console.log('click')
                    if(button.dataset['id'] == item.id) {
                        // console.log(item)
                        this.itemsInCart.itemCount++
                        price+= item.price
                        this.itemsInCart.subtotal = price
                        
                        item.qty++

                        subTimesQty = (item.price * item.qty).toFixed(2)
                        tax = this.itemsInCart.subtotal * taxRate
                        total = (this.itemsInCart.subtotal + tax + deliveryFee).toFixed(2)
                    }

                    // send to the DOM
                    cartItems.innerText = this.itemsInCart.itemCount
                    cartSubtotal.innerText = price.toFixed(2)
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2)
                    deliveryValue.innerText = deliveryFee.toFixed(2)
                    taxValue.innerText = tax.toFixed(2)
                    totalValue.innerText = total

                    if(this.itemsInCart.itemCount == 1){
                        checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    } else {
                        checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    }
                })
            })
        }
    }

    checkout(){
        const cartBtn = document.getElementById('cartBtn')
        const checkoutPage =  document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')
        const tableBody = document.getElementById('tbody')

        let subTimesQty = 0
        cartBtn.addEventListener('click',()=>{
            // console.log('click')
        if(menuSection.classList.contains('d-none')) return

        checkoutPage.classList.remove('d-none')
        menuSection.classList.add('d-none')

        for(const key in this.menu){
            const item = this.menu[key]

            if(item.qty > 0){
                subTimesQty = (item.qty * item.price).toFixed(2)

                const tableRow = document.createElement('tr')
                tableRow.className = 'item-checkout'

                tableRow.innerHTML+= `
                <td id="itemImg">
                    <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img" />
                </td>
                <td class="unit-price">${item.price.toFixed(2)}</td>
                <td class="item-quantity">${item.qty}</td>
                <td class="item-subtotal">${subTimesQty}</td>
                `

                tableBody.appendChild(tableRow)
            }
        }
        })
    }
}

const restaurant = new Store()

restaurant.init()