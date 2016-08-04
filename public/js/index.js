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

var vmWare = new Vue({
    el: '#tab2',
    data: {
        wares: {}
    },
    methods: {
        getInfo: function() {
            $.ajax({
                type: 'get',
                url: '/ware',
                success: function(data) {
                    vmWare.wares = data;
                }
            })
        }
    }
})

var vmShopcar = new Vue({
    el: '#tab4',
    data: {
        orders: null
    }
})

var vmUser = new Vue({
    el: '#tab5',
    data: {
        nickname: ""
    },
    methods: {
        getInfo: function() {
            $.ajax({
                type: 'get',
                url: '/user',
                success: function(data) {
                    if (data.state === 1) {
                        vmUser.nickname = data.nickname;
                    }
                }
            })
        },
        logout: function() {
            $.ajax({
                type: 'get',
                url: '/user/logout',
                success: function(data) {
                    if (data.state === 1) {
                        $.toast('注销成功，正在为您跳转')
                        setTimeout(function() {
                            window.location.href = "/";
                        }, 1000)
                    }
                }
            })
        }
    }
})
