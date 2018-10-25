/*** Variables storing useful information ***/

var arrayImgsrc=["original.jpg","gf.jpg","blackberry.jpg",
"pumpkin.jpg","walnut.jpg","caramelPecan.jpg"];
var arrayNames=["Original","Original (GF)","Blackberry",
"Pumpkin","Walnut","Caramel Pecan"];
var arrayGlazing=["None","Sugar Milk","Vanilla Milk","Double Chocolate"];
var arrayPrice=["$3.99","$3.99","$4.99",
"$4.19","$4.19","$5.49"];
var arrayDescription=" flavored cinnamon roll that is soft and filled with fruity sweetness. Made with butter, sugar, flour, and cinnamon. Baked with love."
var cartCount=0;
var savedBun = 0;
var hasBun = false;

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
function bun(selection, glazing, quantity) {
  this.name = arrayNames[selection];
  this.glazing = arrayGlazing[glazing];
  this.imgsrc = arrayImgsrc[selection];
  this.price = arrayPrice[selection];
  this.quantity = quantity;
}

$(document).ready(function(){

  var bunNode = document.getElementById("cartItem");

  if (hasBun){
    var list = document.getElementById("item-list");
    for(i=0;i<localStorage.length;i++){
      var addBun = localStorage.getItem(i);
      console.log(addBun);
      list.append("<button class='delete-item'>X</button>"+bunNode);
      $("#cartItemImg").attr("src",addBun.imgsrc);
    }
  }

  $("#addToCartButton").click(function(){
    var selection = $('.active').attr("data-flavor");
    var glazing = $('.glazeActive').attr("data-glazing");
    var quantity = parseInt($('.quantActive').attr("data-quantity"));

    cartCount = cartCount+quantity;
    $("#cartCount").html(cartCount);

    myBun = new bun(selection, glazing, quantity);
    localStorage.setItem(savedBun,JSON.stringify(myBun));
    savedBun = savedBun+1;
    hasBun = true;
  })

})
