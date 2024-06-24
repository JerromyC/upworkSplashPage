var colors = ["#FF0000", "#00FFFF"];
var dots = [];
var queue = [];

function createDots() {
    for (var i = 0; i < 10; i++) {
        var dot = document.createElement('div');
        dot.className = 'dot';
        document.body.appendChild(dot);
        dots.push(dot);
    }
}

function moveDots() {
    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var pos = queue[i] ? queue[i] : queue[0];
        dot.style.left = pos.left;
        dot.style.top = pos.top;
        dot.style.backgroundColor = colors[i % colors.length];
        dot.style.opacity = 1;
        (function(dot) {
            setTimeout(function() {
                dot.style.opacity = 0;
            }, 50);
        })(dot);
    }

    // remove the oldest position from the queue
    if(queue.length > dots.length) {
        queue.shift();
    }
}

window.onload = function() {
    createDots();
    document.addEventListener('mousemove', function(e) {
        var x = Math.min(e.pageX - 5, window.innerWidth - 10 - 17); // subtract the size of the dot and the width of the scrollbar from the window.innerWidth to prevent overflow
        var y = e.pageY - 5;
        queue.push({left: x + 'px', top: y + 'px'}); // store cursor positions in queue
        moveDots();
    });    
}
// Project IMAGE SCROLL ANIMATION
document.querySelectorAll('.projectImageWrapper').forEach(function(wrapper) {
    wrapper.addEventListener('mouseenter', function() {
        const img = wrapper.querySelector('.image'); // Targets the image within this specific wrapper
        if (img) {
            // Calculate how far to scroll based on image height
            const scrollHeight = img.offsetHeight - wrapper.offsetHeight;
            img.style.transition = 'top 10s linear';
            img.style.top = -scrollHeight + 'px'; // Scroll up
        }
    });

    wrapper.addEventListener('mouseleave', function() {
        const img = wrapper.querySelector('.image'); // Targets the image within this specific wrapper
        if (img) {
            img.style.transition = 'top 2s linear';
            img.style.top = '0px'; // Reset position when not hovered
        }
    });
});
