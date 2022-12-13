if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  const deleteButton = document.querySelectorAll(".btn-danger");
  for (var i = 0; i < deleteButton.length; i++) {
    var button = deleteButton[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInput = document.querySelectorAll(".cart-quantity-input");

  quantityInput.forEach((qi) => {
    qi.addEventListener("change", changeInput());
  });

  const addToCart = document.querySelectorAll(".shop-item-button");

  addToCart.forEach((atc) => {
    atc.addEventListener("click", (e) => {
      const button = e.target;
      const shopItem = e.target.parentElement.parentElement;

      const title = shopItem.querySelector(".shop-item-title").innerText;

      const price = parseFloat(
        shopItem.querySelector(".shop-item-price").innerText.replace("$", " ")
      );

      const image = shopItem.querySelector(".shop-item-image").src;

      addCart(title, price, image);

      updateCartTotal();
    });
  });
}

const totalOutput = (e) => {
  // const buttonClick = e.target;

  alert("Cart item will be shipped");

  const cartItems = document.querySelector(".cart-items");

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  updateCartTotal();
};
const btnPurchase = document.querySelector(".btn-purchase");

btnPurchase.addEventListener("click", totalOutput);

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function changeInput() {
  return (e) => {
    let input = parseInt(e.target.value);

    if (isNaN(input) || input <= 0) {
      input = 1;
    }
    updateCartTotal();
  };
}

function addCart(title, price, image) {
  const cartItem = document.createElement("div");

  cartItem.className = "cart-row";
  // cartItem.innerText = title;

  const cartItemsName = document.querySelectorAll(".cart-item-title");

  for (ct of cartItemsName) {
    if (ct.innerText == title) {
      alert("Item added already");
      return;
    }
  }

  cartItem.innerHTML = ` 
          <div class="cart-item cart-column">
            <img class="cart-item-image" src=${image} width="100" height="100">
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">$${price}</span>
          <div class="cart-quantity cart-column">
            <input  class="cart-quantity-input" type="number" value="1" min="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>
`;

  const cartItems = document.querySelector(".cart-items");

  cartItems.append(cartItem);
  cartItems.addEventListener("click", (e) => {
    // console.log("delete");
    if (e.target.classList.contains("btn-danger")) {
      e.target.parentElement.parentElement.remove();
      updateCartTotal();
    }
    if (e.target.classList.contains("cart-quantity-input")) {
      let input = parseInt(e.target.value);

      if (isNaN(input) || input <= 0) {
        input = 1;
      }
      updateCartTotal();
    }
  });
}

function updateCartTotal() {
  const carItemContainer = document.querySelectorAll(".cart-row");

  let total = 0;

  for (cartItem of carItemContainer) {
    // console.log(cartItem);
    const price = parseFloat(
      cartItem.querySelector(".cart-price").innerText.replace("$", "")
    );

    const quantity = parseFloat(
      cartItem.querySelector(".cart-quantity-input").value
    );

    total += price * quantity;

    total = Math.round(total * 100) / 100;
  }
  document.querySelector(".cart-total-price").innerText = `$ ${total}`;
}
