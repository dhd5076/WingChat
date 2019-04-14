$(document).ready(function() {

    var countDownDate = new Date("Apr 16, 2019 20:00:00").getTime();

    var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("time").innerHTML = pad(days, 3) + ":" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2)

    if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
    }
    }, 1);

    $("#start").click(function(){
        $('#music').trigger('play')
        $('#start').remove();
        $('#time').show();
    }); 
});

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

$('#time').hide();