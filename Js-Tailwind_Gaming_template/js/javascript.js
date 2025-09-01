let mainColor = localStorage.getItem("color-option");
let list = document.querySelectorAll(".color-list li");

if (mainColor) {
    document.documentElement.style.setProperty("--color-main", mainColor);

  // Remove Active Class From All Colors List Item
    list.forEach(e => {

    e.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (e.getAttribute("data-color") === mainColor) {
      // Add Active Class
        e.classList.add("active");
    }
    });
}


//Setting Box settings
document.querySelector(".gearbox").onclick = function() {
    document.querySelector(".gearbox .fa-gear").classList.toggle("fa-spin");
    document.querySelector(".settingsbox").classList.toggle("open");
} 


list.forEach((li)=>{
    li.onclick = function (e) {
        // remove "active" from all
        activeClass(e);
        let newColor = this.getAttribute("data-color");
        // update the CSS variable
        document.documentElement.style.setProperty("--color-main", newColor);

        localStorage.setItem("color-option", newColor)
    }
});

/*Background random Choice Setting Starts */
let optionBtn = document.querySelectorAll(".btnbox-option button");
let savedOption = localStorage.getItem("background-option");

if (savedOption) {
    optionBtn.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-background") === savedOption) {
            btn.classList.add("active");
        }
    });
}

let lastBg = localStorage.getItem("last-bg");
    if (lastBg) {
        document.querySelector(".landing").style.backgroundImage = `url("${lastBg}")`;
    }
optionBtn.forEach((btn) => {
    btn.onclick = function (e) {
        // remove "active" from all
        activeClass(e);

        let bgChoice = this.getAttribute("data-background");
        // save it to localStorage
        localStorage.setItem("background-option", bgChoice);

        // apply immediately
        if (bgChoice === "yes") {
            randomBG();
        } else {
            clearInterval(bgInterval);
        }
    }
});
let bulletsLocal = localStorage.getItem("bullets_display");
let bulletsDisplay = document.querySelectorAll(".bullets-option button");
let bulletsContainer = document.querySelector(".nav-bullets ")

if(bulletsLocal){
    bulletsDisplay.forEach(btn => {
        btn.classList.remove("active");
    });
    if(bulletsLocal === "block"){
            bulletsContainer.style.display = 'block';
            document.querySelector(".bullets-option .show").classList.add("active");
    }
    else{
            bulletsContainer.style.display = "none";
            document.querySelector(".bullets-option .none").classList.add("active");
    }
}


bulletsDisplay.forEach(btn => {
    btn.addEventListener("click", function(e){
        if(btn.dataset.display === "block"){
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_display", 'block');
        }
        else{
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_display", 'none');
        }
        activeClass(e)
        
    })
});
/*Background random Choice Setting Ends */
/*Toggler menu Starts */
let navMenu = document.querySelector("nav ul");
let navArrow = document.querySelector("nav .toggle-bars");

navArrow.onclick = function (e) {
     e.stopPropagation(); // prevent the document click from firing immediately
    this.classList.toggle("active");
    navMenu.classList.toggle("show");
};

document.addEventListener("click", function(e){
    if((e.target !== navMenu) && (e.target !== navArrow)){
        if (navMenu.classList.contains("show")){
            navArrow.classList.toggle("active");
            navMenu.classList.toggle("show");
        }
    }
})
/*Toggler menu Ends */

//landing page change background Starts
let imagesArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]

let preloaded = [];
imagesArray.forEach(src => {
    let img = new Image();
    img.src = "images/" + src;
    preloaded.push(img);
});

let bgInterval;
function randomBG(){
        bgInterval = setInterval(() => {
            let randomImg = Math.floor(Math.random() * imagesArray.length);
            let chosenImg = "images/" + imagesArray[randomImg];
            document.querySelector(".landing").style.backgroundImage = 'url("' + chosenImg + '")';

            // save last image to localStorage
            localStorage.setItem("last-bg", chosenImg);
        }, 1000);
}

// Select Skills Selector
let trendProduct = document.querySelector(".products");

window.onscroll = function () {
    let productsOffsetTop = trendProduct.offsetTop;

    let productsOuterHeight = trendProduct.offsetHeight;
    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (productsOffsetTop - windowHeight + productsOuterHeight / 4)) {
        let allProducts = document.querySelectorAll(".products .product-box .product-sells span");

        allProducts.forEach(product => {
            product.style.width = product.dataset.sells;
        });
    }
};

/*Game Images*/
let gamesImg = document.querySelectorAll(".games img");

gamesImg.forEach((img) => {
    img.addEventListener("click", function(){
        let overlay = document.createElement("div");
        overlay.classList.add("overlay-layer");
        document.body.appendChild(overlay);

        let popup = document.createElement("div");
        popup.classList.add("popup-box");

        if(img.alt !== null){
            let popuptitle =  document.createElement("h3");
            let popupText = document.createTextNode(img.alt);

            popuptitle.appendChild(popupText);

            popup.appendChild(popuptitle);
        }

        let popupInnerImg = document.createElement("img");
        popupInnerImg.src = img.src;

        popup.appendChild(popupInnerImg);
        document.body.appendChild(popup);

        let close = document.createElement("button");
        close.innerHTML = "X"; 
        close.classList.add("close-btn");
        popup.appendChild(close);

        let stats = document.createElement("div");
        stats.classList.add("stats"); // parent container

        // Rate
        let rate = document.createElement("div");
        rate.classList.add("rate");
        rate.innerHTML = '<i class="fa-solid fa-star"></i><p>4.8</p>';
        stats.appendChild(rate);

        // Download
        let download = document.createElement("div");
        download.classList.add("download");
        download.innerHTML = '<i class="fa-solid fa-download"></i><p>2.3M</p>';
        stats.appendChild(download);

        // Append to popup
        popup.appendChild(stats);

            })
})

document.addEventListener("click", function(e){

    if (e.target.className == 'close-btn') {
    e.target.parentNode.remove();

    document.querySelector(".overlay-layer").remove();

    }
});

let navBullets = document.querySelectorAll(".nav-bullets .bullet");
let navLinks = document.querySelectorAll(".links li a");

function navigation(distination){
    distination.forEach(element => {
        element.addEventListener("click", function(e){
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        })
    });
}

navigation(navBullets);
navigation(navLinks);

function activeClass(event) {
    event.target.parentElement.querySelectorAll(".active").forEach(element => {

    element.classList.remove("active");

    });

  // Add Active Class On Self
    event.target.classList.add("active");
}

document.querySelector(".reset").addEventListener("click", function(){
    localStorage.clear();
    window.location.reload();
    
})

