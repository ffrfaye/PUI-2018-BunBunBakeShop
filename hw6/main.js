/*** Variables storing useful information ***/

var arrayImgsrc=["original.jpg","gf.jpg","blackberry.jpg",
"pumpkin.jpg","walnut.jpg","caramelPecan.jpg"];
var arrayNames=["Original","Original (GF)","Blackberry",
"Pumpkin","Walnut","Caramel Pecan"];
var arrayGlazing=["None","Sugar Milk","Vanilla Milk","Double Chocolate"];
var arrayPrice=["$3.99","$3.99","$4.99",
"$4.19","$4.19","$5.49"];
var arrayPriceNum=[3.99,3.99,4.99,4.19,4.19,5.49];
var arrayDescription=" flavored cinnamon roll that is soft and filled with fruity sweetness. Made with butter, sugar, flour, and cinnamon. Baked with love."
var cartCount=0;
var savedBun = 0;
var hasBun = false;
var addBun;

/*** Fn - select customization options in prod detail ***/

$(document).ready(function(){
  $(".flavor").click(function(){
  	$(".flavor").removeClass("active");
  	$(this).toggleClass("active");
    var selection = $(this).attr("data-flavor");
    $("#bunImg").attr("src",arrayImgsrc[selection]);
    $("#bunName").html(arrayNames[selection]+" Cinnamon Bun");
    $("#bunPrice").html(arrayPrice[selection]);
    $("#bunDescription").html("Delicious "+arrayNames[selection]+arrayDescription);
  });
});

$(document).ready(function(){
  $(".glaze").click(function(){
  	$(".glazeActive").removeClass("glazeActive");
  	$(this).toggleClass("glazeActive");
  });
});

$(document).ready(function(){
  $(".quant").click(function(){
  	$(".quantActive").removeClass("quantActive");
  	$(this).toggleClass("quantActive");
  });
});

/*** Shopping cart functions ***/

/** Object constructor **/
function bun(selection, glazing, quantity, index) {
  this.name = arrayNames[selection];
  this.glazing = arrayGlazing[glazing];
  this.imgsrc = arrayImgsrc[selection];
  this.price = arrayPrice[selection];
  this.priceNum = arrayPriceNum[selection];
  this.quantity = quantity;
  this.index = index;
}

function createItemRow(myTable, bunInfo){
  var row = myTable.insertRow(-1);
  var deleteCell = row.insertCell(0);
  var imageCell = row.insertCell(1);
  var textCell = row.insertCell(2);
  var quantityCell = row.insertCell(3);
  var totalCell = row.insertCell(4);

  var deleteButton = document.createElement('button');
  deleteButton.setAttribute("id", "deleteButton");
  deleteButton.setAttribute("onclick","deleteRow(this)")
  deleteButton.setAttribute("index",bunInfo.index);
  deleteButton.innerHTML = "X";
  deleteCell.appendChild(deleteButton);
  deleteCell.style.width="5%";

  var bunImg = document.createElement('img');
  bunImg.src = bunInfo.imgsrc;
  bunImg.style.width = "150px";
  bunImg.style.height = "100px";
  imageCell.appendChild(bunImg);
  imageCell.style.width="30%";

  textCell.innerHTML = bunInfo.name+" Cinnamon Bun<br />Glazing: "+bunInfo.glazing
  +"<br /><br />"+bunInfo.price;
  textCell.style.width="35%";

  quantityCell.setAttribute("class","itemQuant");
  quantityCell.setAttribute("data-quant",bunInfo.quantity);
  quantityCell.innerHTML = "Qty: "+bunInfo.quantity;
  quantityCell.style.width="15%";

  totalCell.setAttribute("class","itemTotalPrice");
  totalCell.setAttribute("data-price",bunInfo.priceNum*bunInfo.quantity);
  totalCell.innerHTML = "$"+bunInfo.priceNum*bunInfo.quantity;
  totalCell.style.width="15%";

}

function updatePage(){
  var totalPrice = 0;
  var listPrice = document.getElementsByClassName("itemTotalPrice");
  console.log(listPrice)
  for (var i = 0; i < listPrice.length; i++ ){
    totalPrice += parseInt(listPrice[i].getAttribute("data-price"));
  }

  var totalCount = 0;
  var listCount = document.getElementsByClassName("itemQuant");
  for (var i = 0; i < listCount.length; i++ ){
    totalCount += parseInt(listCount[i].getAttribute("data-quant"));
  }

  $("#cartPrice").html("$"+totalPrice);
  $("#totalPrice").html("$"+totalPrice);
  $("#cartCount").html(totalCount);
}

/** The function that runs all the functions! **/
$(document).ready(function(){

  var cartItemsTable = document.getElementById("cartItems");

  if (localStorage.length>0){
    for(i=0;i<localStorage.length;i++){
      addBun = JSON.parse(localStorage.getItem(i));
      createItemRow(cartItemsTable, addBun);
    }
    updatePage();
  }

  $("#addToCartButton").click(function(){
    var selection = $('.active').attr("data-flavor");
    var glazing = $('.glazeActive').attr("data-glazing");
    var quantity = parseInt($('.quantActive').attr("data-quantity"));
    var index = savedBun;

    cartCount = cartCount+quantity;
    $("#cartCount").html(cartCount);

    myBun = new bun(selection, glazing, quantity, index);
    localStorage.setItem(savedBun,JSON.stringify(myBun));
    savedBun = savedBun+1;
    hasBun = true;
  })
})

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    var index = $(r).attr("index");
    console.log(index);
    document.getElementById("cartItems").deleteRow(i);
    localStorage.removeItem(index);
    updatePage();
}
