function setupCanvas(){
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 832;
    canvas.height = 576;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    ctx.imageSmoothingEnabled = false;
}

function tick(){
    draw();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}