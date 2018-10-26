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
var savedBun = 0;
var addBun;
var tableNeedsUpdate = true;

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
  $(".glazing").click(function(){
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
  var cell_delete = row.insertCell(0);
  var cell_img = row.insertCell(1);
  var cell_text = row.insertCell(2);
  var cell_quant = row.insertCell(3);
  var cell_total = row.insertCell(4);

  var deleteButton = document.createElement('button');
  deleteButton.setAttribute("id", "deleteButton");
  deleteButton.setAttribute("onclick","deleteRow(this)")
  deleteButton.setAttribute("index",bunInfo.index);
  deleteButton.innerHTML = "X";
  cell_delete.appendChild(deleteButton);
  cell_delete.style.width="5%";

  var bunImg = document.createElement('img');
  bunImg.src = bunInfo.imgsrc;
  bunImg.style.width = "150px";
  bunImg.style.height = "100px";
  cell_img.appendChild(bunImg);
  cell_img.style.width="30%";

  cell_text.innerHTML = bunInfo.name+" Cinnamon Bun<br />Glazing: "+bunInfo.glazing
  +"<br /><br />"+bunInfo.price;
  cell_text.style.width="35%";

  cell_quant.setAttribute("class","itemQuant");
  cell_quant.setAttribute("data-quant",bunInfo.quantity);
  cell_quant.innerHTML = "Qty: "+bunInfo.quantity;
  cell_quant.style.width="15%";

  cell_total.setAttribute("class","itemTotalPrice");
  cell_total.setAttribute("data-price",bunInfo.priceNum*bunInfo.quantity);
  var totalCellPrice = bunInfo.priceNum*bunInfo.quantity;
  totalCellPrice = totalCellPrice.toFixed(2);
  cell_total.innerHTML = "$"+totalCellPrice;
  cell_total.style.width="15%";
}

function updatePage(){
  var totalPrice = 0;
  var listPrice = document.getElementsByClassName("itemTotalPrice");
  for (var i = 0; i < listPrice.length; i++ ){
    totalPrice += parseFloat(listPrice[i].getAttribute("data-price"));
  }
  totalPrice = totalPrice.toFixed(2);

  var totalCount = 0;
  for(i=0;i<localStorage.length;i++){
    indivBun = JSON.parse(localStorage.getItem(i));
    if(indivBun != null){
      totalCount = totalCount + indivBun.quantity;
    }
  }

  $("#cartPrice").html("$"+totalPrice);
  $("#totalPrice").html("$"+totalPrice);
  $("#cartCount").html(totalCount);
}

/** The function that runs all the functions! **/
$(document).ready(function(){
  updatePage();
  var cartItemsTable = document.getElementById("cartItems");
  var tableExist = !(cartItemsTable === null);
  console.log(tableExist);
  if(localStorage.length<=2){
    $("#emptyMessage").removeClass("cartInactive");
  }
  if (localStorage.length>2 && tableExist){
    $("#emptyMessage").addClass("cartInactive");
    for(i=0;i<localStorage.length;i++){
      addBun = JSON.parse(localStorage.getItem(i));
      if (addBun != null) {
        createItemRow(cartItemsTable, addBun);
      }
    }
    updatePage();
    tableNeedsUpdate = false;
  }

  $("#addToCartButton").click(function(){
    var selection = $('.active').attr("data-flavor");
    var glazing = $('.glazeActive').attr("data-glazing");
    var quantity = parseInt($('.quantActive').attr("data-quantity"));
    var index = savedBun;

    myBun = new bun(selection, glazing, quantity, index);
    i = localStorage.getItem("savedAmount");
    if (i != null) { savedBun = i; }
    localStorage.setItem(savedBun,JSON.stringify(myBun));
    savedBun = parseInt(savedBun)+1;
    localStorage.setItem("savedAmount",savedBun);

    updatePage();
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
