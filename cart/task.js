const cart = document.querySelector(".cart");
const products = document.querySelector(".products");
const savedCartKey = "cart";
const shotCount = 50;
const movieTime = 200;

function createCartProduct({ id, src, count }) {
  const cartProduct = document.createElement("div");
  const cartProductImage = document.createElement("img");
  const cartProductCount = document.createElement("div");
  const cartProductDel = document.createElement("div");

  cartProduct.className = "cart__product";
  cartProduct.setAttribute("data-id", `${id}`);
  cartProductImage.className = "cart__product-image";
  cartProductImage.setAttribute("src", src);
  cartProductCount.className = "cart__product-count";
  cartProductCount.textContent = `${count}`;
  cartProductDel.className = "cart__product-del";
  cartProductDel.innerHTML = "&times";

  cartProduct.appendChild(cartProductImage);
  cartProduct.appendChild(cartProductCount);
  cartProduct.appendChild(cartProductDel);

  return cartProduct;
}

// Загрузка данных из локального хранилища
function loadLocalStorage() {
  // console.log("load local storage")
  const jsonCart = localStorage.getItem(savedCartKey);
  if (jsonCart) {
    const savedCart = JSON.parse(jsonCart);
    for (let i = 0; i < savedCart.length; i++) {
      cart
        .querySelector(".cart__products")
        .appendChild(createCartProduct(savedCart[i]));
    }
    cart.setAttribute("style", "display: block");
  }
}

// Обновление локального хранилища
function updateLocalStorage() {
  // console.log("save local storage")
  const cartProduct = cart.getElementsByClassName("cart__product");
  if (cartProduct.length > 0) {
    const savedCart = [];
    for (let i = 0; i < cartProduct.length; i++) {
      const id = cartProduct[i].dataset.id;
      const src = cartProduct[i].querySelector("img").getAttribute("src");
      const count = cartProduct[i].querySelector(".cart__product-count")
        .textContent;
      savedCart[i] = { id, src, count };
    }
    const jsonCart = JSON.stringify(savedCart);
    if (jsonCart) {
      localStorage.setItem(savedCartKey, jsonCart);
    }
  } else {
    localStorage.clear();
  }
}

function shot({ element, ...params }) {
  newElement = element.cloneNode();
  element.remove();
  params.left += params.stepLeft;
  params.top += params.stepTop;
  newElement.setAttribute(
    "style",
    `position: fixed; left: ${params.left}px; top: ${params.top}px`
  );
  document.body.appendChild(newElement);
  params.shotCount -= 1;
  if (params.shotCount === 0) {
    newElement.remove();
  } else {
    setTimeout(shot, params.shotTime, { element: newElement, ...params });
  }
}

// Анимация "перелета" продукта в корзину
function showProductMoving(product, cartProduct) {
  const imgStart = product.querySelector("img");
  const rectStart = imgStart.getBoundingClientRect();
  const imgFinish = cartProduct.querySelector("img");
  const rectFinish = imgFinish.getBoundingClientRect();

  const stepLeft = (rectFinish.left - rectStart.left) / shotCount;
  const stepTop = (rectFinish.top - rectStart.top) / shotCount;
  const shotTime = movieTime / shotCount;

  newImg = imgFinish.cloneNode();
  setTimeout(shot, shotTime, {
    element: newImg,
    left: rectStart.left,
    top: rectStart.top,
    stepLeft,
    stepTop,
    shotCount,
    shotTime
  });
}

// Добавляем товар в корзину
function addProductToCart(product, cart) {
  const id = product.dataset.id;
  const quantity = parseInt(
    product.querySelector(".product__quantity-value").textContent
  );
  if (!id) {
    return;
  }
  const cartProduct = cart.getElementsByClassName("cart__product");
  let productInCart = false;
  for (let i = 0; i < cartProduct.length; i++) {
    if (cartProduct[i].dataset.id === id) {
      showProductMoving(product, cartProduct[i]);
      productInCart = true;
      const cartProductCount = cartProduct[i].querySelector(
        ".cart__product-count"
      );
      quantityCart = parseInt(cartProductCount.textContent);
      quantityCart += quantity;
      cartProductCount.textContent = `${quantityCart}`;
      break;
    }
  }
  if (!productInCart) {
    const src = product.querySelector("img").getAttribute("src");
    newCartProduct = createCartProduct({ id, src, count: quantity });
    cart.querySelector(".cart__products").appendChild(newCartProduct);
    showProductMoving(product, newCartProduct);
  }
  updateLocalStorage();
}

// Удаляем товар из корзины
function removeProductFromCart(product) {
  product.remove();
  updateLocalStorage();
}

function changeProductQuantity(element, step) {
  value = parseInt(element.textContent);
  if (!value) {
    return;
  }
  value += step;
  if (value < 1) {
    return;
  }
  element.textContent = `${value}`;
}

function productsOnClickHandler(e) {
  if (e.target.classList.contains("product__add")) {
    cart.setAttribute("style", "display: block");
    addProductToCart(e.target.parentElement.parentElement.parentElement, cart);
  } else if (e.target.classList.contains("product__quantity-control_inc")) {
    changeProductQuantity(e.target.previousElementSibling, 1);
  } else if (e.target.classList.contains("product__quantity-control_dec")) {
    changeProductQuantity(e.target.nextElementSibling, -1);
  }
}

function cartProductsOnClickHandler(e) {
  if (e.target.classList.contains("cart__product-del")) {
    removeProductFromCart(e.target.parentElement);
    if (cart.querySelectorAll(".cart__product").length === 0) {
      cart.setAttribute("style", "display: none");
    }
  }
}

products.addEventListener("click", productsOnClickHandler);
cart.addEventListener("click", cartProductsOnClickHandler);
window.addEventListener("load", loadLocalStorage);
