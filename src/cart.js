let basket = JSON.parse(localStorage.getItem('data')) || [];
const calculation = ()=>{
    let cartAmount = document.getElementById('cartAmount');
    
    let total = basket.map((item)=>{
    return item.item
  }).reduce((x,y)=>{
    return x+y
  },0);
  cartAmount.innerHTML=total;
}
calculation();
const head = document.querySelector('.head');
const totalB = document.querySelector('.totalB');
const label = document.getElementById('label');
const cart = document.getElementById('cartA');
const generateCart = ()=>{
    if (basket.length !== 0) {
        cart.innerHTML =  basket.map((x)=>{
          let search = shopItemsData.find((y)=>{
        return y.id == x.id
        });
        console.log(search)
        return  `
            <div class='carts'>
            <img width='100' src=${search.img} alt="">
          <div class="details">
              <div class="name-price-x">
              <div class='np'>
              <h4 class="pname">${search.name}</h4>
              <h5 class="pprice">$ ${search.price}</h5>
              </div>
              <button onclick="empty('${x.id}')" class="x"><i class="bi bi-x-circle"></i></button>
          </div>
          <div class="plus-amount">
               <div class="buttons">
          <i onclick="decrement(${search.id})" class="bi bi-dash-square-fill"></i>
          <div id=${search.id} class="amount">${x.item}</div>
          <i onclick="increment(${search.id})" class="bi bi-plus-square-fill"></i>
        </div>
          </div>
          <div class='total'>$ ${x.item * search.price}</div>
          </div>
          </div>
        `
      }).join('')
    }
    else {
        cart.innerHTML = ``
        head.innerHTML = ``
        label.innerHTML = `
          <h2>Cart is empty.</h2>
          <a href="index.html"><button>Back to Home.</button></a>
        `

    }
}
generateCart();
let increment = (id)=>{ 
  let selectedItem = id;
  
  let search = basket.find((item)=>{
    return item.id == selectedItem.id;
  });
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    });
  }
  else{
    search.item+=1
  }
  localStorage.setItem('data', JSON.stringify(basket));
  update(selectedItem.id);
  calculation();
}


const decrement = (id)=>{
  let selectedItem = id;
  
  let search = basket.find((item)=>{
    return item.id == selectedItem.id;
  });
  if (search == undefined) return
  else if (search.item===0) {
    return
  }
  else{
    search.item -= 1
  }
  update(selectedItem.id);
  basket = basket.filter((x)=>{
    return x.item !==0
  })
  
  calculation();
  localStorage.setItem('data', JSON.stringify(basket)); 
  generateCart()
}
const update = (id)=>{
  let search = basket.find((item)=>{
    return item.id == id;
  });
  localStorage.setItem('data', JSON.stringify(basket));
  generateCart();
  const elem = document.getElementById(id).innerHTML=search.item;
  total()
}
const total = ()=>{
  let total = basket.map((x)=>{
    let search = shopItemsData.find((y)=>{
      return y.id == x.id
    });
    return search.price * x.item
  }).reduce((x,y)=>{
     return x+y
  },0);
  totalB.innerHTML = `<h2>Total bill: $ ${total} </h2>`

}
total();

const clearCart = ()=>{
  basket = [];
  localStorage.setItem('data', JSON.stringify(basket));
  generateCart();
  calculation()

}
const empty = (id)=>{
    basket = basket.filter((x)=>{
    return x.id !== id
  });
  localStorage.setItem('data', JSON.stringify(basket));
  generateCart();
  calculation();
  total()

}