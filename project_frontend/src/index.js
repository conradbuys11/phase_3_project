const URL = 'http://localhost:3000/'
const top_header = () => document.querySelector('h1')
//const products_div = () => document.querySelector('div#products-div') //make sure to say products_div() when referencing this!
const product_cards = () => document.querySelector('div.index_cards')
//const product_list = () => document.querySelector('div#product-list-cards div')
const sortingDropdowns = () => document.querySelector('#sorting-dropdowns')
const review_div = () => document.querySelector('#last-purchase')
const topBarSort = () => document.querySelector('h2')

const IMG_GALLERY = [
    './imgs/photo1.jpg',
    './imgs/photo2.jpg',
    './imgs/photo3.jpg',
    './imgs/photo4.jpg',
    './imgs/photo5.jpg',
    './imgs/photo6.jpg',
    './imgs/photo7.jpg',
    './imgs/photo8.jpg',
    './imgs/photo9.jpg',
    './imgs/photo10.jpg',
    './imgs/photo11.jpg',
    './imgs/photo12.jpg',
    './imgs/photo13.jpg'
]

document.addEventListener('DOMContentLoaded', () => {

    fetch(URL + 'brands/1')
    .then(data => data.json())
    .then(brand => top_header().innerText = brand.name)

    fetch(URL + 'users')
    .then(data => data.json())
    .then(users => {
        top_header().dataset.userName = users[0].name
        top_header().dataset.userId = users[0].id
    })

    listAllProducts()

    //console.log(parseDateTime('2020-10-20 15:14:41 -0400'))
    document.addEventListener('click', onClick)
})

function onClick(e){
    if(e.target.classList.contains('purchase-button')){
        purchaseProduct(e.target.parentNode.parentNode)
    }
    // else if(e.target.classList.contains('product-switch')){
    //     fetch(URL+`products/${e.target.dataset.id}`)
    //     .then(data => data.json())
    //     .then(listProduct)
    // }
    else if(e.target.id == "new-product"){
        fetch(URL+'products/', {method: 'POST', headers: {'Content-Type': 'application/json'}})
        .then(data => data.json())
        .then(buildProductListSingle)
    }
    else if(e.target.classList.contains('sort-category')){
        //debugger
        sortingDropdowns().querySelectorAll('.sort-category').forEach(dropdown => dropdown.classList.remove('active'))
        e.target.classList.add('active')
        sortByCategoryFirst(e.target)
    }
    else if(e.target.classList.contains('show-accessory')){
        onlyShowCategory('Accessory')
    }
    else if(e.target.classList.contains('show-all')){
        showAll()
    }
    else if(e.target.classList.contains('show-shoes')){
        onlyShowCategory('Shoes')
    }
}

function listAllProducts(){
    //peep our db's products index page
    fetch(URL + 'products')
    .then(data => data.json())
    .then(products => {
        products.forEach(listProduct)
        // setUpFrontPage(products)
        // listProduct(products[0])
    })
}

// function setUpFrontPage(products){
//     frontCards = document.querySelectorAll('div.front-card')
//     //change front-cards to new thingy
//     for(let i = 0; i < 6; i++){
//         frontCards[i].querySelector('p').innerText = products[i].name
//     }
// }

function buildProductList(products){
    //debugger
    products.forEach(buildProductListSingle)
}

function buildProductListSingle(product){
    let div = document.createElement('div')
    div.classList.add('list-group-item', 'list-group-item-action', 'product-switch', 'list-card')
    div.dataset.id = `${product.id}`
    div.dataset.category = `${product.category}`
    div.dataset.price = `${product.price}`
    div.dataset.color = `${product.color_primary}`
    div.dataset.releaseDate = `${product.release_date}`

    let p = document.createElement('p')
    p.classList.add('no-bottom-margin')
    p.classList.add('product-switch')
    p.dataset.id = product.id //p data-id =
    p.dataset.butts = 'hehehe'
    //debugger
    p.innerText = product.name

    let p2 = document.createElement('p')
    p2.classList.add('little-text', 'badge', 'badge-danger', 'badge-pill')
    let date = product.release_date.split(' ')[0].split('-')
    let time = product.release_date.split(' ')[1].split(':')
    p2.innerText = `${time[0]}:${time[1]} - ${date[1]}/${date[2]}`

    product_list().append(div)
    div.append(p)
    div.append(p2)
}

// function listAllProducts(products){
//     products.forEach(listProduct)
// }

function listProduct(product){
    // <div class="product index_card" style="display: none;">
        // <img class="card-img-top" src=''> <!-- width="250px" height="250px" -->
        // <div class='card-body'>
        //     <p class='card-text'></p>
        //     <div class='left'></div><div class='right'></div>
        //     <button type="button" class='purchase-button btn btn-primary mt-3'>Purchase</button>
        // </div>
    // </div>
    //document.querySelector('.front-page-cards').style.display = 'none';
    let card = document.createElement('div')
    card.classList.add('product', 'index_card')
    // div.classList.add('product')
    // div.classList.add('card')
    card.dataset.name = product.name
    card.dataset.quantity = product.quantity
    card.dataset.id = product.id
    card.dataset.category = product.category
    card.dataset.price = product.price
    card.dataset.color_primary = product.color_primary

    let img = document.createElement('img')
    img.classList.add('card-img-top')
    img.src = IMG_GALLERY[product.photo_id]
    img.style = 'height: 50%'

    let body = document.createElement('div')
    body.classList.add('card-body')

    let p = document.createElement('p')
    p.classList.add('card-body')
    p.textContent = `${product.name}  --  ${product.quantity} left!`

    let left = document.createElement('div')
    left.classList.add('left')
    left.innerHTML = `Primary Color: ${product.color_primary}<br>Price: ${numAsPrice(product.price)}`

    let right = document.createElement('div')
    right.classList.add('right')
    right.innerHTML =  `Category: ${product.category}<br>Release Date: ${parseDateTime(product.release_date)}`

    let purchase = document.createElement('button')
    purchase.type = 'button'
    purchase.classList.add('purchase-button', 'btn', 'btn-primary', 'mt-3')
    purchase.innerText = 'Purchase'

    product_cards().append(card)
    card.append(img, body)
    body.append(p, left, right, purchase)
    //console.log(typeof(product.created_at))
    // let button = div.querySelector('button.purchase-button')
    // // button.classList.add('purchase-button')
    // button.innerText = 'Purchase'

    // // products_div().append(div)
    // // div.append(p)
    // // div.append(button)

    //review_div().querySelector('p').innerText = ''
    //console.log(product.purchases[Object.keys(product.purchases)[Object.keys(product.purchases).length - 1]].user_id)
    //fetch(product.purchases)
}

function numAsPrice(price){
    let newPrice = '$' + price
    if(newPrice.split(/\./)[1].length < 2){
        newPrice += '0'
    }
    return newPrice
}

function updateProduct(productDiv){
    debugger
    productDiv.querySelector('.card-body .card-text').textContent = `${productDiv.dataset.name}  --  ${productDiv.dataset.quantity} left!`
}

function purchaseProduct(productDiv){
    //debugger
    //
    if(productDiv.dataset.quantity > 0){
        let pck = {}
        pck.method = 'PATCH'
        pck.headers = {'Content-Type': 'application/json'}
        pck.body = JSON.stringify({quantity: productDiv.dataset.quantity - 1})

        //console.log(pck.body) //returns {"quantity":4}
        
        fetch(URL + `products/${productDiv.dataset.id}`, pck)
        .then(data => data.json())
        .then(updatedProduct => {
            productDiv.dataset.quantity = updatedProduct.quantity
            updateProduct(productDiv)
            let create_pck = {}
            create_pck.method = 'POST'
            create_pck.headers = {'Content-Type': 'application/json'}
            create_pck.body = JSON.stringify({product_id: productDiv.dataset.id, user_id: top_header().dataset.userId})
            fetch(URL + 'purchases', create_pck)
            .then(data => data.json())
            .then(purchase => {
                console.log(purchase.created_at)
                review_div().querySelector('p').innerText = `${top_header().dataset.userName} bought ${updatedProduct.name} on ${parseDateTime(purchase.created_at)}`
            })
        })
    }
    else{
        console.log('no')
    }
}

function parseDateTime(dateTime){
    //2020-10-20 15:14:41 -0400
    //Wednesday, September 4 @ 8:03 AM
    //debugger
    let dt = dateTime.split(/[\s.TZ]/) //2020-10-20, 15:14:41, -0400 //or 2020-10-20, 15:14:41, 049238
    let time = dt[1].split(':') //15, 14, 41
    let date = dt[0].split('-') //2020, 10, 20
    let month;
    switch(date[1]){
        case '01':
            month = "January"
            break;
        case '02':
            month = "February"
            break;
        case '03':
            month = "March"
            break;
        case '04':
            month = "April"
            break;
        case '05':
            month = "May"
            break;
        case '06':
            month = "June"
            break;
        case '07':
            month = "July"
            break;
        case '08':
            month = "August"
            break;
        case '09':
            month = "September"
            break;
        case '10':
            month = "October"
            break;
        case '11':
            month = "November"
            break;
        case '12':
            month = "December"
            break;
        default:
            month = "Buttuary"
            break;
    }
    return `${month} ${date[2]} @ ${time[0]}:${time[1]}`
}

function sortByCategoryFirst(categorySpan){
    //debugger
    let category = categorySpan.dataset.id
    let topDivs = product_cards().querySelectorAll(`div [data-category='${category}']`)
    topDivs.forEach(div => {
        div.parentNode.insertBefore(div, div.parentNode.childNodes[0])
    })
}

function onlyShowCategory(category){
    //to be refactored
    product_list().querySelectorAll('div').forEach(product => {
        if(product.dataset.category != category){
            product.style.display = 'none'
        }
        else{
            product.style.display = ''
        }
    })
}

function sortByReleaseDay(){
    orderedList = []

}

function showAll(){
    product_list().querySelectorAll('div').forEach(product => {
        product.style.display = ''
    })
}