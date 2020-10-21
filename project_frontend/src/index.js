const URL = 'http://localhost:3000/'
const products_div = () => document.querySelector('div#products-div') //make sure to say products_div() when referencing this!
const product_card = () => document.querySelector('div.card')
const product_list = () => document.querySelector('div#product-list-cards div')
const review_div = () => document.querySelector('#last-purchase')
const sorting_buttons = () => document.querySelector('h2')

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
    .then(brand => document.querySelector('h1.test').innerText = brand.name)
    listAllProducts()

    //console.log(parseDateTime('2020-10-20 15:14:41 -0400'))
    document.addEventListener('click', onClick)
})

function onClick(e){
    if(e.target.classList.contains('purchase-button')){
        purchaseProduct(e.target.parentNode)
    }
    else if(e.target.classList.contains('product-switch')){
        fetch(URL+`products/${e.target.dataset.id}`)
        .then(data => data.json())
        .then(listProduct)
    }
    else if(e.target.id == "new-product"){
        fetch(URL+'products/', {method: 'POST', headers: {'Content-Type': 'application/json'}})
        .then(data => data.json())
        .then(buildProductListSingle)
    }
    else if(e.target.classList.contains('sort-accessory')){
        sortByCategoryFirst('Accessory')
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
        buildProductList(products)
        setUpFrontPage(products)
        // listProduct(products[0])
    })
}

function setUpFrontPage(products){
    frontCards = document.querySelectorAll('div.front-card')
    for(let i = 0; i < 6; i++){
        frontCards[i].querySelector('p').innerText = products[i].name
    }
}

function buildProductList(products){
    //debugger
    products.forEach(buildProductListSingle)
}

function buildProductListSingle(product){
    let div = document.createElement('div')
    div.classList.add('product-switch')
    div.classList.add('list-card')
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
    p2.classList.add('little-text')
    let date = product.release_date.split(' ')[0].split('-')
    let time = product.release_date.split(' ')[1].split(':')
    p2.innerText = `${time[0]}:${time[1]} - ${date[1]}/${date[2]}`

    product_list().append(div)
    div.append(p)
    div.append(p2)
}

function listProduct(product){ //make the elements ahead of time, and just update what is inside the content
    //add a li with the product name to the products div
    document.querySelector('.front-page-cards').style.display = 'none';
    document.querySelector('.card').style.display = 'block';
    let div = product_card()
    // div.classList.add('product')
    // div.classList.add('card')
    div.dataset.name = product.name
    div.dataset.quantity = product.quantity
    div.dataset.id = product.id

    //div.querySelector('img').src = IMG_GALLERY[Math.floor(Math.random() * IMG_GALLERY.length)]
    div.querySelector('img').src = IMG_GALLERY[product.photo_id]

    div.querySelector('p').textContent = `${product.name}  --  ${product.quantity} left!`
    div.querySelector('div.left').textContent = `Primary Color: ${product.color_primary}`
    div.querySelector('div.right').innerHTML = `Category: ${product.category}<br>Release Date: ${parseDateTime(product.release_date)}`
    //console.log(typeof(product.created_at))
    // let button = div.querySelector('button.purchase-button')
    // // button.classList.add('purchase-button')
    // button.innerText = 'Purchase'

    // // products_div().append(div)
    // // div.append(p)
    // // div.append(button)

    review_div().querySelector('p').innerText = ''
    //console.log(product.purchases[Object.keys(product.purchases)[Object.keys(product.purchases).length - 1]].user_id)
    //fetch(product.purchases)
}

function updateProduct(productDiv){
    productDiv.querySelector('p').textContent = `${productDiv.dataset.name}  --  ${productDiv.dataset.quantity} left!`
}

function purchaseProduct(productDiv){
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
            create_pck.body = JSON.stringify({product_id: productDiv.dataset.id, user_id: 13})
            fetch(URL + 'purchases', create_pck)
            .then(data => data.json())
            .then(console.log('We did it!'))
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
    let dt = dateTime.split(' ') //2020-10-20, 15:14:41, -0400
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

function sortByCategoryFirst(category){
    //debugger
    let topDivs = product_list().querySelectorAll(`div [data-category='${category}']`)
    topDivs.forEach(div => {
        div.parentNode.insertBefore(div, div.parentNode.childNodes[0])
    })
}

function onlyShowCategory(category){
    product_list().querySelectorAll('div').forEach(product => {
        if(product.dataset.category != category){
            product.style = 'display: none;'
        }
    })
}

function showAll(){
    product_list().querySelectorAll('div').forEach(product => {
        product.style = 'display: inline;'
    })
}