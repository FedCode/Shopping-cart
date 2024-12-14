
// Using the HTML code given in the scaffold, implement a fully functional online shopping which should
//use an API for all the products.
// Requirements:-
// 1- Fetch all the products using the following API: Link
// 2- The JSON you get from the API contain detail of each product, such as
//title, price, rating, images, etc.

// 3- Each product fetched from the API should be displayed on the screen.

// 4- The API gives you more than one image for each product. The product should be displayed in such a
// way that it should have the option to toggle the images to the next or previous images.

// 5- Each product should have the corresponding "Add to Cart" option, which
//should be able to add the corresponding product to the cart.

// 6- There should be a cart button at the top page on click, of which the content of the page could be toggled from the
// cart section to all product sections and vice - versa.

// 7- The cart section should display all the products that have been added by the user with the quantity.

// 8- There should be an option to decrease the quantity of the product or remove the product from the cart.

// 9- In the cart section, there should be a "checkout" button on click of which an alert should
// be shown with the total price to be paid by the user.

//https://dummyjson.com/products



// Essential Features for an eCommerce Portfolio Website
// 1. User Authentication (Login/Signup)

//     Login/Signup Forms: Allow users to create accounts and log in using email or social media accounts (e.g., Google or Facebook).
//     Password Recovery: Provide a way for users to reset their passwords if forgotten.

// Why: Basic authentication shows that you understand how to manage user data and handle security.
// 2. Product Pages

//     Product Listings: Display products in grid or list format with images, names, and prices.
//     Product Detail Pages: Include detailed information, multiple images, descriptions, price, and an "Add to Cart" button.
//     Product Categories: Allow users to filter products by categories (e.g., "Clothing", "Electronics").
//     Product Reviews: Allow customers to leave reviews and ratings for products.


// 4. Checkout Process

//     Guest Checkout: Allow users to check out without creating an account (optional but user-friendly).
//     Shipping Information: Let users input delivery details (address, phone number, etc.).
//     Payment Integration: Use a basic payment gateway like PayPal, Stripe, or a mock payment system to simulate real transactions.
//     Order Confirmation: After a successful purchase, display a confirmation page and send an order confirmation email.


// 5. Search Functionality

//     Product Search: Implement a search bar where users can search for products by name or category.
//     Advanced Filters: Let users filter search results by price, rating, or other attributes (like size, color).




    // Admin Dashboard: Build a simple admin panel where the website owner can manage:
    //     Orders
    //     Products (add/edit/delete)
    //     Customers
    //     Product categories
    // Order Status: Admins can update order statuses (e.g., "Processing", "Shipped", "Delivered").

// 15. Ratings and Reviews

//     Product Reviews: Allow customers to rate products and leave feedback.
//     Average Rating: Show the average product rating based on customer feedback.




// const sliderImage = [
//     {
//         image: ['images/slider01.jpg', 'images/baner02.jpg', 'images/banner03.png', 'images/banner04.jpg'],
//     },
// ];

// let addedProductList = [];
// let cartCount = 0;
// let quantity = 1;

// const productContainerEl = document.getElementById('productContainer');
// const cartEl = document.getElementById('cart');
// const cartBtnEl = document.getElementById('cartBtn');
// const cartListEl = document.getElementById('cartList');
// const cartCountEl = document.getElementById('cartCount');

// const apiURL = 'https://dummyjson.com/products';

// async function productList() {
//     try {
//         const response = await fetch(apiURL);
//         if (!response.ok) {
//             throw new Error('No data found');
//         }
//         const data = await response.json();
//         displayProduct(data.products); // Pass the 'products' array to the function
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// function displayProduct(products) {
//     products.forEach(item => {
//         const card = document.createElement('div');
//         card.classList.add('card');
        
//         const headingEl = document.createElement('h3');
//         headingEl.textContent = item.title;
        
//         const paraEl = document.createElement('p');
//         paraEl.textContent = `$ ${item.price}`;
        
//         const addButton = document.createElement('button');
//         addButton.textContent = 'Add to Cart';
//         addButton.className = 'addtocart';
        
//         addButton.addEventListener('click', () => {
//             const existingProduct = addedProductList.find(p => p.id === item.id);

//             if (existingProduct) {
//                 // If the product already exists in the cart, just increase the quantity
//                 existingProduct.quantity += quantity;
//             } else {
//                 // Otherwise, add the product with the initial quantity
//                 addedProductList.push({
//                     id: item.id,
//                     productname: item.title,
//                     category: item.category,
//                     stock: item.stock,
//                     productPrice: item.price,
//                     quantity: quantity
//                 });
//             }
            
//             updateCart();
//         });

//         let currentIndex = 0;
//         const imageIndex = item.images.length;
        
//         const createImg = document.createElement('img');
        
//         function updateImage(index) {
//             createImg.src = item.images[index];
//         }

//         if (imageIndex > 1) {
//             const prevButton = document.createElement('button');
//             prevButton.className = 'prev-btn';
//             prevButton.textContent = '<<';
            
//             const nextButton = document.createElement('button');
//             nextButton.className = 'next-btn';
//             nextButton.textContent = '>>';

//             nextButton.addEventListener('click', () => {
//                 currentIndex = (currentIndex + 1 + item.images.length) % item.images.length;
//                 updateImage(currentIndex);
//             });
            
//             prevButton.addEventListener('click', () => {
//                 currentIndex = (currentIndex - 1 + item.images.length) % item.images.length;
//                 updateImage(currentIndex);
//             });

//             card.append(prevButton, nextButton);
//         }

//         item.images.slice(0, 1).forEach((img, index) => {
//             createImg.src = img;
//             createImg.setAttribute("image-index", index);
//             card.append(createImg, headingEl, paraEl, addButton);
//         });

//         productContainerEl.appendChild(card);
//     });
// }

// function updateCart() {
//     cartCount = addedProductList.length;
    
//     cartCountEl.textContent = `${cartCount}`;
//     cartCountEl.style.display = cartCount > 0 ? 'block' : 'none';
    
//     cartListEl.innerHTML = ''; // Clear the cart before re-rendering

//     addedProductList.forEach(item => {
//         const divCardEl = document.createElement('div');
//         divCardEl.className = 'flex-card d-flex justify-content-between';

//         const headingEl = document.createElement('h4');
//         const priceEl = document.createElement('p');
//         priceEl.className = 'price-item';

//         headingEl.textContent = `${item.productname}`;
//         priceEl.textContent = `$ ${item.productPrice}`;
        
//         const showQuantity = document.createElement('span');
//         showQuantity.className = 'showquantity';
//         showQuantity.textContent = `${item.quantity}`;
        
//         const minusProduct = document.createElement('button');
//         minusProduct.textContent = '-';
//         minusProduct.className = 'minus-product';
        
//         const plusProduct = document.createElement('button');
//         plusProduct.textContent = '+';
//         plusProduct.className = 'plus-product';

//         minusProduct.addEventListener('click', () => {
//             if (item.quantity > 1) {
//                 item.quantity -= 1;
//             }
//             updateCart();
//         });

//         plusProduct.addEventListener('click', () => {
//             item.quantity += 1;
//             updateCart();
//         });

//         divCardEl.append(headingEl, priceEl, plusProduct, showQuantity, minusProduct);
//         cartListEl.appendChild(divCardEl);
//     });
// }

// cartBtnEl.addEventListener('click', () => {
//     cartEl.classList.toggle('show');
// });

// document.getElementById('closeDrawer').addEventListener('click', () => {
//     cartEl.classList.remove('show');
// });

// productList(); // Load products from API


function cartProductList(e) {
    cartCount = addedProductList.length;
    if (cartCount > 0) {
        cartCountEl.style.display = 'block';
        cartCountEl.textContent = `${cartCount}`;
    }

    // Clear previous cart list
    cartListEl.innerHTML = '';

    // Display cart items
    addedProductList.forEach((item, index) => {
        const showQunatity = document.createElement('span');
        showQunatity.className = 'showquantity';
        showQunatity.textContent = `${item.quantity}`;

        const minusProduct = document.createElement('button');
        minusProduct.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
        minusProduct.className = 'minus-product';

        const plusProduct = document.createElement('button');
        plusProduct.innerHTML = `<i class="fa-solid fa-circle-plus"></i>`;
        plusProduct.className = 'plus-product';

        const divCardEl = document.createElement('div');
        divCardEl.className = 'flex-card d-flex justify-content-between';

        const headingEl = document.createElement('h4');
        const priceEl = document.createElement('p');
        priceEl.className = 'prcie-item';

        headingEl.textContent = `${item.productname}`;
        priceEl.textContent = `$ ${item.productPrice}`;

        // Add event listeners for quantity buttons
        minusProduct.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                addedProductList = addedProductList.filter((p) => p.id !== item.id);
                alert('Item Deleted from the cart');
            }
            updateLocalStorage();
            cartProductList();
        });

        plusProduct.addEventListener('click', () => {
            item.quantity += 1;
            updateLocalStorage();
            cartProductList();
        });

        divCardEl.append(headingEl, priceEl, plusProduct, showQunatity, minusProduct);
        cartListEl.appendChild(divCardEl);
    });

    // Calculate total price
    let totalPrice = addedProductList.reduce((sum, product) => {
        return sum + product.quantity * product.productPrice;
    }, 0);

    // Render total price
    const cartfooterEl = document.createElement('div');
    cartfooterEl.className = "cartFooter d-flex align-items-center";
    const cartTotalEl = document.createElement('div');
    cartTotalEl.className = 'carttotlaprice';

    cartTotalEl.innerHTML = `<p><strong>Total Price:</strong> <span class="colorweight"> $ ${parseFloat(totalPrice).toFixed(2)}</span></p>`;

    // Coupon logic
    const inputboxEl = document.createElement('input');
    inputboxEl.setAttribute("type", "number");
    inputboxEl.className = 'cuponCodeinput';
    inputboxEl.placeholder = "% Enter your Code";

    const cuponcodeEl = document.createElement('button');
    cuponcodeEl.textContent = 'Apply Coupon';
    cuponcodeEl.className = 'cuponCodebuton';

    cuponcodeEl.addEventListener("click", () => {
        const discountPercent = Number(inputboxEl.value);
        if (!isNaN(discountPercent) && discountPercent > 0) {
            const afterDiscount = (discountPercent / 100) * totalPrice;
            const discountedTotal = totalPrice - afterDiscount;
            cartTotalEl.innerHTML = `<p><strong>Total Price:</strong> <span class="colorweight"> $ ${parseFloat(discountedTotal).toFixed(2)}</span></p>`;
        } else {
            alert("Invalid coupon code");
        }
    });

    cartfooterEl.append(cartTotalEl, inputboxEl, cuponcodeEl);
    cartListEl.appendChild(cartfooterEl);
}

