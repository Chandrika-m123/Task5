const products = [
    {
        id: 1,
        name: "Titan Watch",
        image: "image1.jpg",
        price: "Rs.5000",
        description: "Stylish and elegant Titan watch."
    },
    {
        id: 2,
        name: "Fastrack Watch",
        image: "image2.jpg",
        price: "Rs.3000",
        description: "Trendy and youthful Fastrack watch."
    },
    {
        id: 3,
        name: "Sonata Watch",
        image: "image3.jpg",
        price: "Rs.4000",
        description: "Classic Sonata watch for all occasions."
    },
 {
        id: 4,
        name: "Analog Watch",
        image: "image4.jpg",
        price: "Rs.3000",
        description: "Traditional analog watch with a modern twist."
    },
    {
        id: 5,
        name: "Smart Watch",
        image: "image5.jpg",
        price: "Rs.2500",
        description: "Feature-rich smart watch for tech enthusiasts."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-image" data-product-id="${product.id}">
                <p>Price: ${product.price}</p>
                <button class="add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}" data-product-image="${product.image}" data-product-price="${product.price}" data-product-description="${product.description}">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });

        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-product-id');
                const productName = event.target.getAttribute('data-product-name');
                const productImage = event.target.getAttribute('data-product-image');
                const productPrice = event.target.getAttribute('data-product-price');
                const productDescription = event.target.getAttribute('data-product-description');
                addToCart(productId, productName, productImage, productPrice, productDescription);
            });
        });

        const images = document.querySelectorAll('.product-image');
        images.forEach(image => {
            image.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-product-id');
                const product = products.find(p => p.id == productId);
                displayWatchDetails(product);
            });
        });
    }

    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
});

let cart = [];

function addToCart(id, name, image, price, description) {
    const product = { id, name, image, price, description };
    cart.push(product);
    alert(`${name} has been added to your cart!`);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <p>Price: ${item.price}</p>
        `;
        cartContainer.appendChild(itemDiv);
    });
}

function displayWatchDetails(product) {
    document.getElementById('watch-image').src = product.image;
    document.getElementById('watch-image').style.display = 'block';
    document.getElementById('watch-name').innerText = product.name;
    document.getElementById('watch-price').innerText = `Price: ${product.price}`;
    document.getElementById('watch-description').innerText = product.description;
    const addToCartButton = document.getElementById('add-to-cart-button');
    addToCartButton.style.display = 'block';
    addToCartButton.onclick = () => addToCart(product.id, product.name, product.image, product.price, product.description);
}