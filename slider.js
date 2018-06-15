window.addEventListener("DOMContentLoaded", init);

function init() {
    var kesha  = new sliderCreator(1.5, "sliders-img");

    var images = document.getElementsByClassName("images")[0];

    var imagesForSlider = document.getElementsByClassName("sliders-img");

    images.addEventListener("click", function(e){
        e.stopPropagation();
        var targetElement = e.target;
        kesha.showBlackPanel();

        for (i = 0; i <= imagesForSlider.length; i++) {
            if (imagesForSlider[i] == targetElement) {
                if (i == 0) {
                    kesha.leftSlider();
                }
                if(i > 1) {
                    for (var r = 0; r < i - 1; r++) {
                        kesha.rightSlider();
                    }
                }
            }
        }

        rightButton = document.getElementsByClassName("right-button")[0];
        rightButton.addEventListener("click", function(e) {
            e.stopPropagation();
            kesha.rightSlider();
        });

        leftButton = document.getElementsByClassName("left-button")[0];
        leftButton.addEventListener("click", function(e) {
            e.stopPropagation();
            kesha.leftSlider();
        });

        blackPanel = document.getElementsByClassName("black-background")[0];
        blackPanel.addEventListener("click", function(e) {
            e.stopPropagation();
            kesha.escape();
        });
    });
}

class sliderCreator {
    constructor (sizeCoefficient, slidersClass) {
        this.sizeCoefficient = sizeCoefficient;
        this.example = document.getElementsByClassName("sliders-img")[0];
        this.width = sizeCoefficient * parseInt(getComputedStyle(this.example).width);
        this.height = sizeCoefficient * parseInt(getComputedStyle(this.example).height);
//        this.slidersWidth = parseInt(getComputedStyle(document.getElementsByClassName("sliders-img")[0]).width);
        this.imagesForSlider = document.getElementsByClassName(slidersClass);
        this.slidersLength = this.imagesForSlider.length;
    }

    rightSlider() {
        var slider = document.getElementsByClassName("slider")[0];
        var n = this.slidersLength - 1;

        var firstSlide = document.getElementsByClassName("slider-1")[0];
        firstSlide.parentNode.removeChild(firstSlide);
        slider.appendChild(firstSlide);
        document.getElementsByClassName("slider-1")[n].style.left = this.width * (n) + 'px';

        for (var i = 0; i < this.slidersLength; i++) {
            var n = parseInt(document.getElementsByClassName("slider-1")[i].style.left) - this.width;
            document.getElementsByClassName("slider-1")[i].style.left = n + 'px';
        }
    }

    leftSlider() {
        var slider = document.getElementsByClassName("slider")[0];
        var n = this.slidersLength - 1;

        var lastSlide = document.getElementsByClassName("slider-1")[n];
        lastSlide.parentNode.removeChild(lastSlide);
        slider.insertBefore(lastSlide, slider.firstChild);
        document.getElementsByClassName("slider-1")[0].style.left = -this.width * 2 + 'px';

        for (var i = this.slidersLength - 1; i >= 0; i--) {
            var n = parseInt(document.getElementsByClassName("slider-1")[i].style.left) + this.width;
            document.getElementsByClassName("slider-1")[i].style.left = n + 'px';
        }
    }

    showBlackPanel() {
        var background = document.createElement("div");
        background.classList.add("black-background");
        var body = document.getElementsByTagName("body")[0];
        body.insertBefore(background, body.firstChild);

        var cont = document.createElement("div");
        cont.classList.add("cont");
        cont.style.width = 400 + this.width + "px";
        cont.style.height = this.height + "px";
        background = document.getElementsByClassName("black-background")[0];
        background.appendChild(cont);

        var leftButton = document.createElement("div");
        leftButton.classList.add("left-button");
        leftButton.style.top = this.height * 0.5 - 15 + "px";
        cont = document.getElementsByClassName("cont")[0];
        cont.appendChild(leftButton);

        var leftArrow = document.createElement("div");
        leftArrow.classList.add("arrow");
        leftArrow.classList.add("left");
        leftButton = document.getElementsByClassName("left-button")[0];
        leftButton.appendChild(leftArrow);

        var slider = document.createElement("div");
        slider.classList.add("slider");
        console.log(this.height);
        slider.style.width = this.width + "px";
        slider.style.height = this.height + "px";
        cont.appendChild(slider);

        var rightButton = document.createElement("div");
        rightButton.classList.add("right-button");
        rightButton.style.top = this.height * 0.5 - 15 + "px";
        cont.appendChild(rightButton);

        var rightArrow = document.createElement("div");
        rightArrow.classList.add("arrow");
        rightArrow.classList.add("right");
        rightButton = document.getElementsByClassName("right-button")[0];
        rightButton.appendChild(rightArrow);

        var slider =  document.getElementsByClassName("slider")[0];

        for (var i = 0; i < this.slidersLength; i++) {
            var divSlider = document.createElement("div");
            divSlider.classList.add("slider-1");
            slider.appendChild(divSlider);
            var bigImage = document.createElement("img");
            bigImage.classList.add("big-img");
            bigImage.src = document.getElementsByClassName("sliders-img")[i].src;
            bigImage.style.width = this.width + "px";
            bigImage.style.heigth = this.height + "px";
            document.getElementsByClassName("slider-1")[i].appendChild(bigImage);
        }

        for (var i = 0; i < this.slidersLength; i++) {
            document.getElementsByClassName("slider-1")[i].style.left = this.width * (i - 1) + 'px';
        }

        var blackPanel = document.getElementsByClassName("black-background")[0];

        var centerWidth = window.outerWidth / 2;
        var centerHeight = window.outerHeight / 2;

        blackPanel.style.display = 'flex';
        blackPanel.style.left = (centerWidth).toString() + "px";
        blackPanel.style.right = (centerWidth).toString() + "px";
        blackPanel.style.top = (centerHeight).toString() + "px";
        blackPanel.style.bottom = (centerHeight).toString() + "px";

        var leftButton = document.getElementsByClassName("left-button")[0];
        leftButton.style.left = (- centerWidth - 50).toString() + "px";

        var rightButton = document.getElementsByClassName("right-button")[0];
        rightButton.style.right = (- centerWidth - 50).toString() + "px";

        var left = getComputedStyle(blackPanel).left;
        var right = getComputedStyle(blackPanel).right;
        var top = getComputedStyle(blackPanel).top;
        var bottom = getComputedStyle(blackPanel).bottom;

        blackPanel.style.left =  (0).toString() + "px";
        blackPanel.style.right = (0).toString() + "px";
        blackPanel.style.top = (0).toString() + "px";
        blackPanel.style.bottom = (0).toString() + "px";

        function showLeftButton() {
            var left = getComputedStyle(leftButton).left;
            leftButton.style.zIndex = "1001";
            leftButton.style.left = (parseInt(left) + centerWidth * 1.05 + 50).toString() + "px";
        }
        setTimeout(showLeftButton, 400);

        function showRightButton() {
            var right = getComputedStyle(leftButton).left;
            rightButton.style.zIndex = "1000";
            rightButton.style.right = (parseInt(right) + centerWidth * 1.05 + 50).toString() + "px";
        }
        setTimeout(showRightButton, 400);

        function showSlider() {
            var top = getComputedStyle(slider).top;
            slider.style.top = (0).toString() + "px";
        }
        setTimeout(showSlider, 400);
    }

    escape() {
        var centerWidth = window.outerWidth / 2;
        var slider = document.getElementsByClassName("slider")[0];

        leftButton.style.left = (- centerWidth - 50).toString() + "px";
        rightButton.style.right = (- centerWidth - 50).toString() + "px";
        slider.style.top = (-900).toString() + "px";

        function n() {
            blackPanel.style.display = 'none';
            var body = document.getElementsByTagName("body")[0];
            body.removeChild(blackPanel);
        }
        setTimeout(n, 400);
    }
}
