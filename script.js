// Lấy danh sách các phần tử .info-items
var infoItemsList = document.querySelectorAll('.info-items');
var buttons = document.querySelectorAll('.info-items button');
var sizeElements = document.querySelectorAll('.info-items .size');
var numberElements = document.querySelectorAll('.info-items .number');

//phan chuyen dong anh
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector("img").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);

}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



 
//phan items----------------
// Lặp qua danh sách các phần tử và thêm lắng nghe sự kiện click
infoItemsList.forEach(function(infoItem) {
  infoItem.addEventListener('click', function() {
    // Thêm hoặc xóa lớp 'clicked' cho phần tử được click
    this.classList.toggle('clicked');
  });
});
var infoItems = document.querySelectorAll('.info-items');
var openedItem = null;

infoItems.forEach(function(infoItem) {
  infoItem.addEventListener('click', function() {
    if (this !== openedItem) {
      // Đóng phần tử hiện tại nếu đã có phần tử được mở
      if (openedItem) {
        openedItem.classList.remove('clicked');
      }
      
      // Mở phần tử mới và lưu vào biến openedItem
      this.classList.add('clicked');
      openedItem = this;
    } else {
      // Đóng phần tử nếu đã được clicked trước đó
      this.classList.remove('clicked');
      openedItem = null;
    }
  });
});

buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên phần tử cha
    });
  });

  sizeElements.forEach(function(sizeElement) {
    sizeElement.addEventListener('click', function(event) {
      event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên phần tử cha
    });
  });
  
  numberElements.forEach(function(numberElement) {
    numberElement.addEventListener('click', function(event) {
      event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên phần tử cha
    });
  });
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};