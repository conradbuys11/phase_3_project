const URL = 'http://localhost:3000/'
const products_div = () => document.querySelector('div#products-div') //make sure to say products_div() when referencing this!
const product_card = () => document.querySelector('div.card')
const product_list = () => document.querySelector('div#product-list-cards')

document.addEventListener('DOMContentLoaded', () => {
    fetch(URL + 'brands/1')
    .then(data => data.json())
    .then(brand => document.querySelector('h1.test').innerText = brand.name)
    listAllProducts()
    console.log(parseDateTime('2020-10-20 15:14:41 -0400'))
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
}

function listAllProducts(){
    //peep our db's products index page
    fetch(URL + 'products')
    .then(data => data.json())
    .then(products => {
        buildProductList(products)
        listProduct(products[0])
    })
}

function buildProductList(products){
    products.forEach(product => {
        let p = document.createElement('p')
        //debugger
        p.classList.add('product-switch')
        p.dataset.id = product.id
        p.innerText = product.name
        product_list().append(p)
    })
}

function listProduct(product){ //make the elements ahead of time, and just update what is inside the content
    //add a li with the product name to the products div
    let div = product_card()
    // div.classList.add('product')
    // div.classList.add('card')
    div.dataset.name = product.name
    div.dataset.quantity = product.quantity
    div.dataset.id = product.id

    div.querySelector('p').textContent = `${product.name}  --  ${product.quantity} left!`
    div.querySelector('div.left').textContent = `Primary Color: ${product.color_primary}`
    div.querySelector('div.right').innerHTML = `Category: ${product.category}<br>Release Date: ${parseDateTime(product.release_date)}`
    //console.log(typeof(product.created_at))
    let button = div.querySelector('li.purchase-button')
    // button.classList.add('purchase-button')
    button.innerText = 'Purchase'

    // products_div().append(div)
    // div.append(p)
    // div.append(button)
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
            create_pck.body = JSON.stringify({product_id: productDiv.dataset.id, user_id: 0})
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