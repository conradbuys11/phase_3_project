const URL = 'http://localhost:3000/'
const products_div = () => document.querySelector('div#products-div') //make sure to say products_div() when referencing this!

document.addEventListener('DOMContentLoaded', () => {
    fetch(URL + 'brands/1')
    .then(data => data.json())
    .then(brand => document.querySelector('div.test').innerText = brand.name)
    listAllProducts()
})

function listAllProducts(){
    //peep our db's products index page
    fetch(URL + 'products')
    .then(data => data.json())
    .then(products => products.forEach(listProduct))
}

function listProduct(product){
    //add a li with the product name to the products div
    let li = document.createElement('li')
    li.classList.add('product')
    li.innerText = product.name

    let button = document.createElement('li')
    button.classList.add('purchase-button')
    button.innerText = 'Purchase'
    
    products_div().append(li)
    li.append(button)
}