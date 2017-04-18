$(document).ready(function () {
    var i = 0,
        wave1 = document.getElementById("w1"),  wave2 = document.getElementById("w2"),
        wave4 = document.getElementById("w4"),  wave5 = document.getElementById("w5"),
        ani = function () {
            i != -133 ? i -= 133 : i = 0; //133是最後一張圖片距離整個圖片左邊的距離，133是動畫的場景大小(高度)
            wave1.style.backgroundPosition =i + "px"+ " 0";
            wave2.style.backgroundPosition =i + "px"+ " 0";
            wave4.style.backgroundPosition =i + "px"+ " 0";
            wave5.style.backgroundPosition =i + "px"+ " 0";
        };
    window.setInterval(ani, 400);

    var j = 0,
        wave3 = document.getElementById("w3"), wave6 = document.getElementById("w6"),
        ani2 = function(){
            j != -140 ? j -= 140 : j = 0; //140是最後一張圖片距離整個圖片左邊的距離，140是動畫的場景大小(高度)
            wave3.style.backgroundPosition =j + "px"+ " 0";
            wave6.style.backgroundPosition =j + "px"+ " 0";
        };
    window.setInterval(ani2, 600);

    var k = 0,
        wave7 = document.getElementById("w7"), wave8 = document.getElementById("w8"),
        ani3 = function(){
            k != -96 ? k -= 96 : k = 0; //96是最後一張圖片距離整個圖片左邊的距離，96是動畫的場景大小(高度)
            wave7.style.backgroundPosition =k + "px"+ " 0";
            wave8.style.backgroundPosition =k + "px"+ " 0";
        };
    window.setInterval(ani3, 500);

    var m= 0,
        bird1 = document.getElementById("b1"),birdtop2 = document.getElementById("tb2"),
        birdAni1 = function(){
            m != -312 ? m -= 104 : m = 0; //321是最後一張圖片距離整個圖片左邊的距離，104是動畫的場景大小(高度)
            bird1.style.backgroundPosition =m + "px"+ " 0";
            birdtop2.style.backgroundPosition =m + "px"+ " 0";
        };
    window.setInterval(birdAni1, 450);

    var n= 0,
        bird2 = document.getElementById("b2"),
        birdAni2 = function(){
            n != -312 ? n -= 104 : n = 0; //321是最後一張圖片距離整個圖片左邊的距離，104是動畫的場景大小(高度)
            bird2.style.backgroundPosition =n + "px"+ " 0";
        };
    window.setInterval(birdAni2, 300);

    var l= 0,
        birdtop1 = document.getElementById("tb1"),
        birdAni3 = function(){
            l != -360 ? l -= 120 : l = 0; //360是最後一張圖片距離整個圖片左邊的距離，120是動畫的場景大小(高度)
            birdtop1.style.backgroundPosition =l + "px"+ " 0";
        };
    window.setInterval(birdAni3, 500);
});