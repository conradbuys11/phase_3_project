const URL = 'http://localhost:3000/'
const products_div = () => document.querySelector('div#products-div') //make sure to say products_div() when referencing this!
const product_card = () => document.querySelector('div.card')
const product_list = () => document.querySelector('div#product-list-cards')

document.addEventListener('DOMContentLoaded', () => {
    fetch(URL + 'brands/1')
    .then(data => data.json())
    .then(brand => document.querySelector('h1.test').innerText = brand.name)
    listAllProducts()
    document.addEventListener('click', onClick)
})

function onClick(e){
    if(e.target.classList.contains('purchase-button')){
        purchaseProduct(e.target.parentNode)
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

    let p = div.querySelector('p')
    p.textContent = `${product.name}  --  ${product.quantity} left!`

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
        })
    }
    else{
        console.log('no')
    }
}