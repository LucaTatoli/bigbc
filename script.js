new Image().src = "mimi.jpg";

$(document).ready(() => {

    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    var r;
    if(canvas.width < 900)
        r = 5;
    else 
        r = 10;
    var conf = new Array();
    const nConf = 250;
    var flag = true;
    var id;

    initConfetti2(conf);

    $(window).resize(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if(canvas.width < 900)
            r = 5;
        else 
            r = 10;
    })

    $(window).on('click', () => {
        if(flag) {
            $("#prompt").css({opacity: "0"})
            $("#vt").animate({height: "0px"}, 1000);
            $("#hz").delay(1000).animate({width: "0px"}, 1000);
            $("#left").delay(2000).animate({width: "0px"}, 1000);
            $("#right").delay(2000).animate({width: "0px"}, 1000);
            $("#left").delay(0).queue((next) => {$("#left").css({border: "0px"}); next();});
            $("#right").delay(0).queue((next) => {$("#right").css({border: "0px"}); next();});
            $("#up").delay(3500).animate({height: "0px"}, 1000);
            $("#down").delay(3500).animate({height: "0px"}, 1000);
            $("#up").delay(0).queue((next) => {$("#up").css({border: "0px"}); next();});
            $("#down").delay(0).queue((next) => {$("#down").css({border: "0px"});  id = setInterval(() => {drawConfetti2(conf);}, 1000/30); next();});

            flag = false;
        }
    });

    function initConfetti(conf) {
        for(let i = 0; i < nConf; i++) {
            var r = Math.round(255 * Math.random());
            var g = Math.round(255 * Math.random());
            var b = Math.round(255 * Math.random());
            var rgb = 'rgb('+r+', '+g+', '+b+')';
            conf.push({x : Math.random(), y : 2*Math.random()-2, color : rgb, a : Math.random()*0.02 + 0.015});
        }
    }

    function drawConfetti(conf) {
        var stop = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(c of conf) {
            ctx.fillStyle = c.color;
            ctx.beginPath();
            ctx.arc(c.x * canvas.width, c.y * canvas.height, r, 0, 2*Math.PI); 
            ctx.fill();
            if(c.y < 1.2)
                stop = false;
            c.y += c.a;
        }

        if(stop)
            clearInterval(id);
    }

    function initConfetti2(conf) {
        for(let i = 0; i < nConf; i++) {
            var r = Math.round(255 * Math.random());
            var g = Math.round(255 * Math.random());
            var b = Math.round(255 * Math.random());
            var rgb = 'rgb('+r+', '+g+', '+b+')';
            if(Math.random() > 0.5)
                conf.push({x : 0, y : 1, vx : Math.random() * 0.04, vy : -Math.random() * 0.08 - 0.01, color : rgb});
            else
            conf.push({x : 1, y : 1, vx : -Math.random() * 0.04, vy : -Math.random() * 0.08 - 0.01, color : rgb});
        }
    }

    function drawConfetti2(conf) {
        var stop = true;
        var a = 0.0025;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(c of conf) {
            ctx.fillStyle = c.color;
            ctx.beginPath();
            ctx.arc(c.x * canvas.width, c.y * canvas.height, r, 0, 2*Math.PI); 
            ctx.fill();
            if(c.y < 1.2)
                stop = false;
            c.y += c.vy;
            c.vy += a;
            c.x += c.vx;
            c.vx *= 0.98;
        }

        if(stop) {
            clearInterval(id);
        }
    }
})