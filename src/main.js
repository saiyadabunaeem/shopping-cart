let shopItemsData = [
    {
      id: "jfhgbvnscs",
      name: "Casual Shirt",
      price: 45,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-1.jpg",
    },
    {
      id: "ioytrhndcv",
      name: "Office Shirt",
      price: 100,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-2.jpg",
    },
    {
      id: "wuefbncxbsn",
      name: "T Shirt",
      price: 25,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-3.jpg",
    },
    {
      id: "thyfhcbcv",
      name: "Mens Suit",
      price: 300,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-4.jpg",
    },
  ];
  const shop = document.getElementById('shop');
  const generateShop = ()=> {
    
    return (shopItemsData.map((item)=>{
        return `<div id='item-id-${item.id}' class="item">
    <img width="220" src="${item.img}" alt="Shirt">
    <div class="details">
      <h2>${item.name}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      <div class="priceQuantity">
        <h2>$ ${item.price}</h2>
        <div class="buttons">
          <i onclick="decrement(${item.id})" class="bi bi-dash-square-fill"></i>
          <div id=${item.id} class="amount">0</div>
          <i onclick="increment(${item.id})" class="bi bi-plus-square-fill"></i>
        </div>
      </div>
    </div>
  </div>`
    })

    ).join('')
  }
  shop.innerHTML= generateShop();
  let basket = JSON.parse(localStorage.getItem('data')) || [];
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
  console.log(basket);

  const decrement = (id)=>{
    let selectedItem = id;
    
    let search = basket.find((item)=>{
      return item.id == selectedItem.id;
    });
    if (search.item===0) {
      return
    }
    else{
      search.item -= 1
    }
    localStorage.setItem('data', JSON.stringify(basket));
    update(selectedItem.id);
    calculation();
  }
  const update = (id)=>{
    let search = basket.find((item)=>{
      return item.id == id;
    });
    const elem = document.getElementById(id).innerHTML=search.item;
  }
  const calculation = ()=>{
      let cartAmount = document.getElementById('cartAmount');
      
      let total = basket.map((item)=>{
      return item.item
    }).reduce((x,y)=>{
      return x+y
    });
    cartAmount.innerHTML=total;
  }
 