$.init();

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);

$(document).on('click', '.tab-link', function() {
    $.refreshScroller();
});

$(document).on('click', '#dTab1 .check-taste', function() {
    $('#dTab1 .check-taste').removeClass('active')
    $(this).addClass('active')
});
$(document).on('click', '#dTab2 .check-taste', function() {
    $('#dTab2 .check-taste').removeClass('active')
    $(this).addClass('active')
});

// var city = "";
// var district = "";
// var lat = "";
// var lon = "";
// navigator.geolocation.getCurrentPosition(function(position) {
//     lat = position.coords.latitude;
//     lon = position.coords.longitude;
//     var point = new BMap.Point(lon, lat); // 创建坐标点
//     // 根据坐标得到地址描述
//     var myGeo = new BMap.Geocoder();
//     myGeo.getLocation(point, function(result) {
//         city = result.addressComponents.city;
//         district = result.addressComponents.district;
//     });
// });

var vmCakeF = new Vue({
    el: '#cake-f-list',
    data: {
        cakes: []
    }
})

var vmCakeY = new Vue({
    el: '#cake-y-list',
    data: {
        cakes: []
    }
})

var vmMousse = new Vue({
    el: '#mousse-list',
    data: {
        "mousses": []
    }
})


var vmFlower = new Vue({
    el: '#flower-list',
    data: {
        flowers: []
    }
})


var vmCakeDetail = new Vue({
    el: '#cake-detail',
    data: {
        cake: {
            nameEn: 'Bailey&apos;s Love',
            name: '百利甜情人',
            raw: '/爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露/',
            characterization: 'Just Bailey&apos;s, light cream and you. The flavours may be velvetty subtle, but the chemistry is as electric as a first kiss.',
            update: '*重油坯升级为戚风坯，口感更轻盈、细腻。<br/>*单层水果夹心升级为双层水果夹心，分量加倍。<br/>*本款产品为时令鲜果蛋糕，当季水果夹心为芒果。',
            price: ''
        }
    }
})

$.ajax({
    type: 'get',
    url: '/ware/cake',
    success: function(data) {
        vmCakeF.cakes = data;
    }
})
$.ajax({
    type: 'get',
    url: '/ware/mousse',
    success: function(data) {
        vmMousse.mousses = data;
    }
})
$.ajax({
    type: 'get',
    url: '/ware/flower',
    success: function(data) {
        vmFlower.flowers = data;
    }
})
