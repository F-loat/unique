$.init();

$(document).on('touchmove', 'body', function(e) {
    e.preventDefault();
});

$(document).on('click', '.tab-link', function() {
    $.refreshScroller();
});

var id = 0;
$(document).on('click', 'a[data-id]', function() {
    id = $(this).data('id');
});

$(document).on('click', '#buy-now', function() {
    if ($("#check-all").attr("checked")) {
        $(".order-list label.label-checkbox input[type=checkbox]").each(function() {
            $(this).attr("checked", false);
        });
    } else {
        $(".order-list label.label-checkbox input[type=checkbox]").each(function() {
            $(this).attr("checked", true);
        });
    }
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

var vmWare = new Vue({
    el: '#tab2',
    data: {
        wares: {}
    }
})
var vmShopcar = new Vue({
    el: '#tab4',
    data: {
        orders: []
    }
})
var vmUser = new Vue({
    el: '#tab5',
    data: {
        user: ""
    }
})

$.ajax({
    type: 'get',
    url: '/ware',
    success: function(data) {
        vmWare.wares = data;
    }
})
