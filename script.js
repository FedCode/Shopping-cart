const sliderImage = [{
  image: ['images/slider01.jpg', 'images/baner02.jpg', 'images/banner03.png', 'images/banner04.jpg'],
}, ]
let addedProductList = JSON.parse(localStorage.getItem('CartproductList')) || [];
let cartCount = 0;
let quantity = 1;
const productContainerEl = document.getElementById('productContainer');
const cartEl = document.getElementById('cart');
const cartBtnEl = document.getElementById('cartBtn');
const cartListEl = document.getElementById('cartList');
const cartCountEl = document.getElementById('cartCount');
const apiURL = 'https://dummyjson.com/products';
async function productList() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error('No data found');
    }
    const data = await response.json();
    displayProduct(data.products);
    categorySlider(data.products);
    groceriesCategory(data.products);
    searchItemfun(data.products)
    searchAllproducts(data.products)
  } catch (error) {
    console.error(error.message);
  }
}

function displayProduct(products) {
  products.forEach(item => {
    //console.log(item);
    const card = document.createElement('div');
    card.classList.add('card');
    const headingEl = document.createElement('h3');
    headingEl.textContent = item.title;
    const paraEl = document.createElement('p');
    paraEl.textContent = `$ ${item.price}`;
    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Cart';
    addButton.className = 'addtocart';
    const createImg = document.createElement('img');
    addButton.addEventListener('click', () => {
      const exitingProduct = addedProductList.find(id => id.id == item.id);
      if (exitingProduct) {
        exitingProduct.quantity += quantity;
      } else {
        addedProductList.push({
          id: item.id,
          productname: item.title,
          category: item.category,
          stock: item.stock,
          productPrice: item.price,
          quantity: quantity
        });
      }
      showToast()
      localStorage.setItem("CartproductList", JSON.stringify(addedProductList));
      cartProductList();
    })
    // Get current Index of image
    let currentIndex = 0;
    const imageIndex = item.images.length

    function updateImage(index) {
      createImg.src = item.images[index]
    }
    if (imageIndex > 1) {
      // Create next Previous button only if there is more then 1 image
      const prevButton = document.createElement('button');
      prevButton.className = 'prev-btn';
      prevButton.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
      const nextButton = document.createElement('button');
      nextButton.className = 'next-btn';
      nextButton.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1 + item.images.length) % item.images.length;
        updateImage(currentIndex)
      })
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + item.images.length) % item.images.length;
        updateImage(currentIndex);
      })
      card.append(prevButton, nextButton)
    }
    item.images.splice(0, 1).forEach((img, index) => {
      createImg.src = img;
      createImg.setAttribute("image-index", index)
      // console.log("index of image")
      card.append(createImg, headingEl, paraEl, addButton)
    })
    productContainerEl.appendChild(card);
  });
}
const imgCard = document.createElement('div');
imgCard.className = 'bextPrevbuttons';
imgCard.style.position = 'relative'; // For better layout control
imgCard.style.overflow = 'hidden';
const bannerImageEl = document.getElementById('bannerImage'); // Ensure this container exists in your HTML
bannerImageEl.appendChild(imgCard);
//Display Product in Cart  
function cartProductList(e) {
  cartCount = addedProductList.length;
  if (cartCount > 0) {
    cartCountEl.style.display = 'block';
    cartCountEl.textContent = `${cartCount}`;
 }
  //cartListEl
  cartListEl.innerHTML = '';
  addedProductList.forEach((item) => {
    const showQunatity = document.createElement('span')
    showQunatity.className = 'showquantity';
    showQunatity.textContent = `${item.quantity}`;
    const minusProduct = document.createElement('button');
    minusProduct.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
    minusProduct.className = 'minus-product';
    const plusProduct = document.createElement('button');
    plusProduct.innerHTML = `<i class="fa-solid fa-circle-plus"></i>`;
    plusProduct.className = 'plus-product';
    const divCardEl = document.createElement('div');
    const productImagesEl = document.createElement('img')
    divCardEl.className = 'flex-card d-flex justify-content-between';
    const headingEl = document.createElement('h4');
    const priceEl = document.createElement('p');
    priceEl.className = 'prcie-item';
    headingEl.textContent = `${item.productname}`;
    priceEl.textContent = `$ ${item.productPrice}`;
    minusProduct.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Use slice and spread to remove the item
        // addedProductList = [
        //     ...addedProductList.slice(0, index), // All items before the current one
        //     ...addedProductList.slice(index + 1) // All items after the current one
        // ];
        addedProductList = addedProductList.filter((p) => p.id !== item.id); //using filter
        //addedProductList.splice(index, 1)//using splice
        alert('Item Deleted from the cart')
      }
      updateLocalStorage();
      cartProductList()
    });
    plusProduct.addEventListener('click', () => {
      item.quantity += 1;
      updateLocalStorage();
      cartProductList()
    });
    divCardEl.append(headingEl, priceEl, plusProduct, showQunatity, minusProduct);
    cartListEl.appendChild(divCardEl);
  })
  let totalPrice = addedProductList.reduce((sum, product) => {
    if (product.quantity > 0) {
      return sum + (product.quantity * product.productPrice);
    }
    return sum
  }, 0)
  const cartfooterEl = document.createElement('div');
  const cartseconEl = document.createElement('div');
  cartseconEl.className = 'd-flex cuponCode'
  cartfooterEl.className = "cartFooter d-flex algin-items-center";
  const cartTotalEl = document.createElement('div');
  cartTotalEl.className = 'carttotlaprice';
  cartTotalEl.innerHTML = `<p><strong>Total Price:</strong> <span class="colorweight"> $ ${parseFloat(totalPrice).toFixed(2)}</span></p>`
  const buynowEl = document.createElement('button');
  const inputboxEl = document.createElement('input');
  inputboxEl.setAttribute("type", "number");
  inputboxEl.className = 'cuponCodeinput'
  inputboxEl.placeholder = "% Enter your Code";
  const cuponcodeEl = document.createElement('button');
  const downloadProducts = document.createElement('button');
  downloadProducts.innerHTML = `<i class="fa-solid fa-file-arrow-down"></i> PDF`;
  downloadProducts.className = 'getpdf';
  cuponcodeEl.textContent = 'Apply Cupon';
  cuponcodeEl.setAttribute("id", "getcupon");
  cuponcodeEl.className = 'cuponCodebuton';
  buynowEl.className = 'buyNow';
  buynowEl.textContent = 'Buy Now';
  cuponcodeEl.addEventListener("click", () => {
    const discountPrice = Number(inputboxEl.value);
    if (!isNaN(discountPrice) && discountPrice > 0) {
      const afterApplyDiscount = (discountPrice / 100) * totalPrice;
      totalPrice = totalPrice - afterApplyDiscount;
      cartTotalEl.innerHTML = `<p><strong>Total Price:</strong> <span class="colorweight"> $ ${parseFloat(totalPrice).toFixed(2)}</span></p>`
      inputboxEl.value = "";
    } else {
      alert("Invalid coupon code");
    }
  })
  downloadProducts.addEventListener("click", downloadCartAsPDF);
  cartseconEl.append(inputboxEl, cuponcodeEl);
  // cartfooterEl.append(buynowEl);
  cartListEl.append(cartseconEl, cartfooterEl);
  cartfooterEl.append(cartTotalEl, buynowEl, downloadProducts);
}

function updateLocalStorage() {
  localStorage.setItem("CartproductList", JSON.stringify(addedProductList));
}

function nextPerviousImage() {
  let curIndex = 0;
  const nextIconEl = document.createElement('button');
  nextIconEl.className = 'nextIcon';
  const prevIconEl = document.createElement('button');
  prevIconEl.className = 'prevIcon';
  nextIconEl.innerHTML = '<i class="fa-solid fa-chevron-right"></i>'; // Button text for clarity
  prevIconEl.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
  const imageLength = sliderImage[0].image.length; // Assuming a single slider object for now

  setInterval(() => {
     curIndex = (curIndex + 1) % imageLength;
      sliderImageFun(curIndex);
  }, 2000)
  //   setInterval(() => {
  //   curIndex = (curIndex - 1 + imageLength) % imageLength; // Move to the previous image
  //   sliderImageFun(curIndex);
  // }, 1000)
  
  // nextIconEl.addEventListener('click', () => {
  //   curIndex = (curIndex + 1) % imageLength; // Move to the next image
  //   sliderImageFun(curIndex);
  // });
  // prevIconEl.addEventListener('click', () => {
  //   curIndex = (curIndex - 1 + imageLength) % imageLength; // Move to the previous image
  //   sliderImageFun(curIndex);
  // });
  imgCard.append(prevIconEl, nextIconEl);
}

function sliderImageFun(index) {
  // Clear previous images
  imgCard.querySelectorAll('img').forEach((img) => img.remove());
  // Add the current image
  const imgContEl = document.createElement('img');
  imgContEl.src = sliderImage[0].image[index];
  imgContEl.style.width = '100%';
  imgContEl.style.display = 'block';
  imgCard.appendChild(imgContEl);
}

function showToast() {
  const toastEl = document.getElementById('myToast');
  const toast = new bootstrap.Toast(toastEl, {
    animation: true, // Enables fade-in/out animation
    autohide: true, // Automatically hides after the delay
    delay: 2000
  });
  toast.show();
}
cartBtnEl.addEventListener('click', () => {
  if (cartCount > 0) {
    cartEl.classList.toggle('show');
  } else {
    alert('Please add Some item to see the cart')
  }
});
document.getElementById('closeDrawer').addEventListener('click', (e) => {
  cartEl.classList.remove('show');
});

function downloadCartAsPDF() {
  // Access the cart data
  if (!addedProductList || addedProductList.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // Create a new jsPDF instance
  const {
    jsPDF
  } = window.jspdf;
  const doc = new jsPDF();
  // Set up title
  doc.setFontSize(18);
  doc.text("Cart Summary", 105, 20, null, null, "center");
  // Add table headers
  let startY = 40;
  doc.setFontSize(12);
  doc.text("Product Name", 20, startY);
  doc.text("Quantity", 100, startY);
  doc.text("Price", 150, startY);
  // Add product details
  startY += 10;
  let totalPrice = 0;
  addedProductList.forEach((item, index) => {
    doc.text(item.productname, 20, startY);
    doc.text(String(item.quantity), 100, startY);
    const itemPrice = item.quantity * item.productPrice;
    totalPrice += itemPrice;
    doc.text(`$ ${itemPrice.toFixed(2)}`, 150, startY);
    startY += 10;
  });
  // Add total price
  startY += 10;
  doc.setFontSize(14);
  doc.text(`Total Price: $ ${totalPrice.toFixed(2)}`, 20, startY);
  // Download the PDF
  doc.save("Cart_Summary.pdf");
}


function categorySlider(products) {
   const CategorySliderEl = document.getElementById('CategorySlider');
  const filterCategories = products.filter((cat) => cat.category == "beauty");
  const cardLength = filterCategories.length;
  if (cardLength === 0) {
    CategorySliderEl.innerHTML = "<p>No category Found</p>";
    return;
  }
  let currentCardIndex = 0;
  function displayCard(startIndex) {
    CategorySliderEl.innerHTML = "";
    const cardShow = [];
    for (let i = 0; i < 3; i++){
      const index = (startIndex + i) % cardLength;
      cardShow.push(filterCategories[index]);
    }

    cardShow.forEach((item, index) => {
      const card = createCard(item);
      if (index === 1) {
        card.className = "card active";
   }
      CategorySliderEl.appendChild(card);
    })
 }
  displayCard(currentCardIndex);

   setInterval(() => {
    currentCardIndex = (currentCardIndex + 3) % cardLength;
    displayCard(currentCardIndex);
   }, 10000);
  
  function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.thumbnail;
    img.alt = "Product image";
    const content = document.createElement("div");
    content.className = "card-content";
    content.innerHTML = `
      <h3>${item.title}</h3>
      <h4>${item.category}</h4>
      <p>$ ${item.price}</p>
      <button class="addtocart">Add to Cart</button>
    `;
      card.append(img, content);
    return card;
 }

}

function groceriesCategory(products) {
  const CategoryGroceriesEl = document.getElementById('CategoryGroceries');
  const filterGroceries = products.filter((gori) => gori.category == "groceries");
  const groceriesLength = filterGroceries.length;
  if (groceriesLength === 0) {
    CategoryGroceriesEl.innerHTML = "<p>No Category Found</p>";
    return;
  }
  let startIndexg = 0

  function updateGorcier(startIndex) {
    CategoryGroceriesEl.innerHTML = "";
    const georcierShow = [];

    for (let i = 0; i < 5; i++){
      const index = (startIndex + i) % groceriesLength;
      georcierShow.push(filterGroceries[index]);
    }

    georcierShow.forEach((item, index) => {
      const card = createGeroicer(item);
      if (index == 2) {
       card.className = "card grociricard active"
      }
      CategoryGroceriesEl.appendChild(card);
    })
  }

  updateGorcier(startIndexg) 
  setInterval(() => {
    startIndexg = (startIndexg + 1) % groceriesLength;
    updateGorcier(startIndexg);
  }, 3000)
  
  function createGeroicer(item) {
    const card = document.createElement("div");
    card.className = "card grociricard";
    const img = document.createElement("img");
    img.src = item.thumbnail;
    img.alt = "Product image";
    const content = document.createElement("div");
    content.className = "card-content";
    content.innerHTML = `
      <h3>${item.title}</h3>
      <h4>${item.category}</h4>
      <p>$ ${item.price}</p>
      <button class="addtocart">Add to Cart</button>
    `;
    card.append(img, content);
    return card;
  }


  
}




function searchItemfun(products) {
      const SearchButtonEl = document.getElementById('SearchButton');
      const inputSearchitemEl = document.getElementById('inputSearchitem');

      SearchButtonEl.addEventListener("click", (e) => {
        e.preventDefault();
        const searchValue = inputSearchitemEl.value.trim();
        inputSearchitemEl.value = "";
        if (!searchValue) {
          alert('Please enter a search item');
          return;
        }
        const filterData = products.filter((item) => item.category.toLowerCase() === searchValue.toLowerCase());
        
        //console.log('Filtered Data:', filterData);

        if (filterData.length > 0) {
          localStorage.setItem('SearcResult', JSON.stringify(filterData));
          window.location.href = `search.html?query=${encodeURIComponent(searchValue)}`;
          
        } else {
          alert('No matching products found. Please try again.');
        }
      });
    }
// function searchAllproducts(products) {
//   const selectOp = document.getElementById('select')

//                 const searchAll = products.filter((cat) => cat.category === products.category);
//                 console.log(searchAll);
//             }


//             document.addEventListener("DOMContentLoaded", () => {
//                 searchAllproducts();
//             });
function Main() {
  
}

nextPerviousImage();
sliderImageFun(0);
productList();
cartProductList();
