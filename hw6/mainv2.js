window.addEventListener('load', function() {
  const productListContainer = document.getElementById('product-list-container');
  const productDetailsContainer = document.getElementById('product-details-container');
  if (productListContainer) {
    productListContainer.classList.remove('hidden');
  }
  if (productDetailsContainer) {
    productDetailsContainer.classList.add('hidden');
  }
  const products = document.querySelectorAll('.product');
  if (products && products.length > 0) {
    for(let i = 0; i < products.length ; i++) {
      const item = products[i];
      item.addEventListener('click',function(e) {
        let showDetails = false;
        let roll;
        if (e.currentTarget) {
          const tag = e.currentTarget.getAttribute('data-tag');
          if (tag) {
            showDetails = true;
            roll = BunBuns.find(x => x.id === tag);
          }
        }
        if (showDetails) {
          if (productListContainer) {
            productListContainer.classList.add('hidden');
          }
          if (productDetailsContainer) {
            productDetailsContainer.classList.remove('hidden');
          }
          if (roll) {
            const nameElement = document.getElementById('product-details-name');
            if (nameElement) {
              nameElement.innerHTML = roll.name;
            }
            const choices = document.querySelectorAll('.flavour-choice');
            if (choices && choices.length > 0) {
              for(let j = 0; j < choices.length ; j++) {
                choices[j].classList.remove('chosenChoices');
                choices[j].classList.add('hoverableChoices');
                const flavour = choices[j].getAttribute('data-choice');
                if (flavour && flavour === roll.id) {
                  choices[j].classList.add('chosenChoices');
                  choices[j].classList.remove('hoverableChoices');
                }
              }
            }
          }
        }
      },true);
    }
  }
  const choices = document.querySelectorAll('.flavour-choice');
  if (choices && choices.length > 0) {
    for(let j = 0; j < choices.length ; j++) {
      // ADD LISTENR HERE
    }
  }
})
