var HOST = document.domain;

$(document).on('touchmove', 'body', function(e) {
    e.preventDefault();
});

var vmUnique = new Vue({
    el: '#main',
    ready: function() {
        $.init();
        $(".content").scroller({
            type: 'js'
        });
        this.getWaresInfo();
    },
    data: {
        user: {
            nickname: "",
            type: 1,
            orders: [],
            shopcar: [],
            addresses: [],
            coupons: []
        },
        wares: [],
        wareDetail: {},
        orderDetail: {
            wares:[]
        }
    },
    methods: {
        getWaresInfo: function() {
            $.ajax({
                type: 'get',
                url: 'http://' + HOST + '/ware',
                success: function(data) {
                    vmUnique.wares = data;
                },
                error: function() {
                    $.toast('商品信息获取失败');
                },
                complete: function() {
                    vmUnique.getUserInfo();
                }
            })
        },
        getUserInfo: function() {
            $.ajax({
                type: 'get',
                url: 'http://' + HOST + '/user',
                dataType: 'json',
                success: function(data) {
                    if (data.state === 1) {
                        vmUnique.user.nickname = data.nickname;
                        vmUnique.user.type = data.type;
                        vmUnique.user.orders = data.orders ? data.orders : [];
                        vmUnique.user.shopcar = data.shopcar ? data.shopcar : [];
                        vmUnique.user.addresses = data.addresses ? data.addresses : [];
                        for (var i = vmUnique.user.orders.length - 1; i >= 0; i--) {
                            for (var j = vmUnique.user.orders[i].wares.length - 1; j >= 0; j--) {
                                 if (vmUnique.user.orders[i].wares[j].dish) {
                                    vmUnique.user.orders[i].wares[j].info = {};
                                    vmUnique.user.orders[i].wares[j].info.img = vmUnique.user.orders[i].wares[j].img;
                                    vmUnique.user.orders[i].wares[j].img = null;
                                 }
                             }
                        }
                        for (var i = vmUnique.user.shopcar.length - 1; i >= 0; i--) {
                            if(vmUnique.user.shopcar[i].dish){
                                vmUnique.user.shopcar[i].info = {};
                                vmUnique.user.shopcar[i].info.img = vmUnique.user.shopcar[i].img;
                                vmUnique.user.shopcar[i].info.name = "照片蛋糕";
                                vmUnique.user.shopcar[i].info.nameEn = "picture cake";
                                vmUnique.user.shopcar[i].info.price = "100";
                                vmUnique.user.shopcar[i].img = null
                            }
                        }
                    }
                }
            })
        },
        getWareId: function(e) {
            var id = $(e.currentTarget).data('id');
            this.wareDetail.info = this.wares[id];
            this.$set('wareDetail.weight', 1.0);
            this.$set('wareDetail.sum', 1);
            window.localStorage.wareDetail = JSON.stringify(this.wareDetail).toString();
            window.localStorage.orderDetail = JSON.stringify([this.wareDetail]).toString();
        },
        dishChange: function(e) {
            this.wareDetail.dish = $(e.target).text();
        },
        weightChange: function(e) {
            this.wareDetail.weight = parseFloat($(e.target).text().slice(0, 3));
        },
        addToShopcar: function() {
            if (this.user.nickname) {
                if (this.wareDetail.info._id || this.wareDetail.dish) {
                    var ware ={
                            weight: this.wareDetail.weight
                    }
                    if (this.wareDetail.dish) {
                        ware.img = this.wareDetail.info.img;
                        ware.dish = this.wareDetail.dish;
                    } else {
                         ware.wareId = this.wareDetail.info._id
                    }
                    $.ajax({
                        type: 'post',
                        url: 'http://' + HOST + '/ware/shopcar/add ',
                        dataType: 'json',
                        data: {
                            ware: JSON.stringify(ware)
                        },
                        success: function(data) {
                            if (data.state===1) {
                                vmUnique.user.shopcar=data.shopcar;
                                for (var i = vmUnique.user.shopcar.length - 1; i >= 0; i--) {
                                    if(vmUnique.user.shopcar[i].dish){
                                        vmUnique.user.shopcar[i].info = {};
                                        vmUnique.user.shopcar[i].info.img = vmUnique.user.shopcar[i].img;
                                        vmUnique.user.shopcar[i].info.name = "照片蛋糕";
                                        vmUnique.user.shopcar[i].info.nameEn = "picture cake";
                                        vmUnique.user.shopcar[i].info.price = "100";
                                        vmUnique.user.shopcar[i].img = null
                                    }
                                }
                                $.toast('商品已添加至购物车');
                            } else {
                                $.toast('数据同步出错');
                            }
                        }
                    })
                } else {
                    $.toast('请重新进入该界面');
                }
            } else {
                $.toast('请先登录')
            }
        },
        sumChange: function(amphoteric, e) {
            var shopcarId = $(e.target).parent().data('shopcarId');
            this.user.shopcar[shopcarId].sum -= amphoteric;
            if (this.user.shopcar[shopcarId].sum == 0) {
                $.confirm("删除该订单？",
                    function() {
                        vmUnique.syncShopcarSum(shopcarId);
                        vmUnique.user.shopcar.splice(shopcarId, 1);
                        setTimeout(function() { $('#shopcar-list').scroller('refresh') }, 300);
                    },
                    function() {
                        vmUnique.user.shopcar[shopcarId].sum = 1;
                    }
                )
            } else {
                vmUnique.syncShopcarSum(shopcarId);
            }
        },
        syncShopcarSum: function (shopcarId) {
            $.ajax({
                type: 'post',
                url: 'http://' + HOST + '/ware/shopcar/sum',
                dataType: 'json',
                data: {
                    wareId: vmUnique.user.shopcar[shopcarId]._id,
                    sum: vmUnique.user.shopcar[shopcarId].sum
                },
                success: function(data) {
                    if (data.state===0) {
                        $.toast('数据同步出错');
                    }
                }
            })
        },
        check: function(e) {
            var shopcarId = $(e.target).parent().parent().parent().data('shopcarId');
            this.user.shopcar[shopcarId].state = this.user.shopcar[shopcarId].state== 1 ? 0 : 1;
        },
        checkAll: function(e) {
            if ($(e.target).hasClass('button-checked')) {
                $(e.target).removeClass('button-checked')
                for (var i = this.user.shopcar.length - 1; i >= 0; i--) {
                    this.user.shopcar[i].state = 0
                }
            } else {
                $(e.target).addClass('button-checked')
                for (var i = this.user.shopcar.length - 1; i >= 0; i--) {
                    this.user.shopcar[i].state = 1
                }
            }
        },
        shopcarBuy: function(){
            $.router.load('#confirmOrder')
            this.orderDetail.wares = [];
            for (var i = this.user.shopcar.length - 1; i >= 0; i--) {
                this.orderDetail.wares.push(this.user.shopcar[i])
            }
            window.localStorage.orderDetail = JSON.stringify(this.orderDetail.wares).toString();
        },
        orderMessage: function() {
            $.prompt('您有什么要求呢？',
                function(value) {
                    if (value != $('#order-message').text()) {
                        $('#order-message').text(value);
                        vmUnique.orderDetail.msg = value;
                    }
                },
                function(value) {
                    $.toast('您没有保存要求');
                }
            );
            $(".modal-text-input").val($('#order-message').text())
        },
        drawImage: function(e){
            var dpr = window.devicePixelRatio;
            var canvas = document.getElementById("canvas");
            var fullWidth = document.getElementById("canvasWrap").clientWidth * dpr;
            var fullHeight = document.getElementById("canvasWrap").clientHeight * dpr;
            canvas.style.width = fullWidth / dpr + "px";
            canvas.style.height = fullHeight / dpr + "px";
            canvas.width = fullWidth;
            canvas.height = fullHeight;
            context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            $('#photo-next').removeClass('disabled').addClass('button-success');
            $('#photo-upload').addClass('disabled');
            $('#photo-upload').text('换张照片');
            var image = new Image();
            var img = e.target.files['0'];
            var reader = new FileReader();
            reader.onload = function() {
                var url = reader.result;
                image.src = url;
                canvas.height = image.height * fullWidth / image.width;
                canvas.style.height = canvas.height / dpr + "px";
                context.drawImage(image, 0, 0, fullWidth, canvas.height);
                var cropper = new Cropper(document.getElementById('canvas'), {
                    aspectRatio: 1 / 1,
                    crop: function(e) {
                        var x = e.detail.x / (fullWidth / image.width),
                            y = e.detail.y / (fullWidth / image.width),
                            width = e.detail.width / (fullWidth / image.width),
                            height = e.detail.height / (fullWidth / image.width);
                            canvas.height = fullWidth;
                            canvas.style.height = fullWidth / dpr + "px";
                            context.clearRect(0, 0, canvas.width, canvas.height);
                            context.drawImage(image, x, y, width, height, 0, 0, fullWidth, fullWidth);
                        $(document).one('click', '#photo-next', function() {
                            cropper.destroy();
                            $('#photo-upload').removeClass('disabled');
                            $('#photo-next').text('下一步');
                            $(document).one('click', '#photo-next', function() {
                                $.router.load('#wareDetail');
                                vmUnique.wareDetail.info.type = 9;
                                vmUnique.wareDetail.info.img = canvas.toDataURL("image/jpeg",0.7);
                                vmUnique.$set('wareDetail.dish', '奶油');
                                window.localStorage.wareDetail = JSON.stringify(vmUnique.wareDetail).toString();
                                window.localStorage.orderDetail = JSON.stringify([vmUnique.wareDetail]).toString();
                            })
                        });
                    }
                });
            };
            reader.readAsDataURL(img);
        },
        pay: function() {
            if(this.user.nickname) {
                if ($('#alipay').is(':checked')) {
                    vmUnique.orderDetail.payway = 1
                } else {
                    vmUnique.orderDetail.payway = 0
                }
                var addressId;
                if ($('#address-id').length) {
                    addressId = $('#address-id').data('addressId')
                } else {
                    return $.toast('请先添加地址');
                }
                var wares = [];
                if (vmUnique.orderDetail.wares[0].info.img.slice(0,5) == "data:") {
                        wares.push({})
                        wares[0].weight = vmUnique.orderDetail.wares[0].weight;
                        wares[0].dish = vmUnique.orderDetail.wares[0].dish;
                        wares[0].img = vmUnique.orderDetail.wares[0].info.img;
                        wares[0].sum = vmUnique.orderDetail.wares[0].sum;
                } else {
                    for (var i = 0; i < vmUnique.orderDetail.wares.length; i++) {
                        wares.push({})
                        wares[i].info = vmUnique.orderDetail.wares[i].info._id;
                        wares[i].weight = vmUnique.orderDetail.wares[i].weight;
                        wares[i].sum = vmUnique.orderDetail.wares[i].sum;
                    }
                }
                $.ajax({
                    type: 'post',
                    url: 'http://' + HOST + '/ware/pay',
                    data: {
                        addressId:  addressId,
                        msg: vmUnique.orderDetail.msg,
                        wares: JSON.stringify(wares),
                        sendTime: $('#datetime-picker').val(),
                        payway: vmUnique.orderDetail.payway
                    },
                    success: function(data) {
                        pingpp.createPayment(data, function(result, err) {
                            if (result == "success") {
                                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                            } else if (result == "fail") {
                                // charge 不正确或者微信公众账号支付失败时会在此处返回
                            } else if (result == "cancel") {
                                // 微信公众账号支付取消支付
                            }
                        })
                    }
                })
            } else {
                $.toast('请先登录')
            }
        },
        payAgain: function(e){
            var orderId = $(e.target).data('orderId');
            $.ajax({
                type: 'post',
                url: 'http://' + HOST + '/ware/pay/again',
                data: {
                    orderId: orderId
                },
                success: function(data) {
                    pingpp.createPayment(data, function(result, err) {
                        if (result == "success") {
                            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                        } else if (result == "fail") {
                            // charge 不正确或者微信公众账号支付失败时会在此处返回
                        } else if (result == "cancel") {
                            // 微信公众账号支付取消支付
                        }
                    })
                }
            })
        },
        fastGetIdentify: function() {
            if ($('#fastGet-identify').val() == "获取验证码") {
                var phone = $('#fastLog-phone').val();
                if (phone.length === 11) {
                    $.ajax({
                        type: 'post',
                        url: 'http://' + HOST + '/user/fastLogin/identify',
                        data: {
                            phone: phone
                        },
                        success: function(data) {
                            if (data.state === 1) {
                                $.toast('验证码已下发至您的手机，请查收');
                                var t = 60;
                                var countdown = setInterval(function() {
                                    if (t === 0) {
                                        clearInterval(countdown);
                                        $('#fastGet-identify').val("获取验证码");
                                    } else {
                                        $('#fastGet-identify').val(t + "s后重试");
                                        t--;
                                    }
                                }, 1000)
                            } else {
                                $.toast('验证码发送失败，请检查号码或稍后再试')
                            }
                        }
                    })
                } else {
                    $.toast('请输入正确的手机号')
                }
            } else {
                return false;
            }
        },
        fastLogin: function() {
            var phone = $('#fastLog-phone').val(),
                identify = $('#fastLog-identify').val();
            if (phone.length != 11) {
                $.toast("请输入正确的手机号");
            } else if (!identify) {
                $.toast("请输入验证码");
            } else {
                $.ajax({
                    type: 'post',
                    url: 'http://' + HOST + '/user/fastLogin',
                    dataType: 'json',
                    data: {
                        phone: phone,
                        identify: identify
                    },
                    success: function(data) {
                        if (data.state === 1) {
                            $.toast('登录成功，正在为您跳转')
                            setTimeout(function() {
                                $.router.load("#index");
                                vmUnique.getUserInfo();
                            }, 1000)
                        } else {
                            $.toast(data.err)
                        }
                    }
                })
            }
        },
        getIdentify: function() {
            if ($('#get-identify').val() == "获取验证码") {
                var phone = $('#reg-phone').val();
                if (phone.length === 11) {
                    $.ajax({
                        type: 'post',
                        url: 'http://' + HOST + '/user/regist/identify',
                        data: {
                            phone: phone
                        },
                        success: function(data) {
                            if (data.state === 1) {
                                $.toast('验证码已下发至您的手机，请查收');
                                var t = 60;
                                var countdown = setInterval(function() {
                                    if (t === 0) {
                                        clearInterval(countdown);
                                        $('#get-identify').val("获取验证码");
                                    } else {
                                        $('#get-identify').val(t + "s后重试");
                                        t--;
                                    }
                                }, 1000)
                            } else {
                                $.toast('验证码发送失败，请检查号码或稍后再试')
                            }
                        }
                    })
                } else {
                    $.toast('请输入正确的手机号')
                }
            } else {
                return false;
            }
        },
        regist: function() {
            var phone = $('#reg-phone').val(),
                password = $('#reg-password').val(),
                pswagain = $('#reg-pswagain').val(),
                identify = $('#reg-identify').val();
            if (phone.length != 11) {
                $.toast("请输入正确的手机号");
            } else if (!password) {
                $.toast("请输入密码");
            } else if (password != pswagain) {
                $.toast("两次密码输入不一致");
            } else if (!identify) {
                $.toast("请输入验证码");
            } else {
                $.ajax({
                    type: 'post',
                    url: 'http://' + HOST + '/user/regist',
                    dataType: 'json',
                    data: {
                        phone: phone,
                        password: md5(password),
                        identify: identify
                    },
                    success: function(data) {
                        if (data.state === 1) {
                            $.toast('注册成功，正在为您登录')
                            setTimeout(function() {
                                $.router.load("#index");
                                vmUnique.getUserInfo();
                            }, 1000)
                        } else {
                            $.toast(data.err)
                        }
                    }
                })
            }
        },
        login: function() {
            var phone = $('#log-phone').val(),
                password = $('#log-password').val();
            if (phone.length != 11) {
                $.toast("请输入正确的手机号");
            } else if (!password) {
                $.toast("请输入密码");
            } else {
                $.ajax({
                    type: 'post',
                    url: 'http://' + HOST + '/user/login',
                    dataType: 'json',
                    data: {
                        phone: phone,
                        password: md5(password)
                    },
                    success: function(data) {
                        if (data.state === 1) {
                            $.toast('登录成功，正在为您跳转')
                            setTimeout(function() {
                                $.router.load("#index");
                                vmUnique.getUserInfo();
                            }, 1000)
                        } else {
                            $.toast(data.err)
                        }
                    }
                })
            }
        },
        logout: function() {
            $.ajax({
                type: 'get',
                url: 'http://' + HOST + '/user/logout',
                success: function(data) {
                    if (data.state === 1) {
                        $.confirm('确认注销？', function() {
                            vmUnique.user = {
                                nickname: "",
                                orders: [],
                                shopcar: [],
                                addresses: [],
                                coupons: []
                            };
                            $.toast('注销成功')
                        });
                    }
                }
            })
        },
        goShopping: function() {
            $.router.back()
            $('nav.bar .tab-item').removeClass('active');
            $('#main-tabs .tab').removeClass('active');
            $('#tab2 a.tab-link').removeClass('active');
            $('#tab2').addClass('active');
            $('nav.bar .tab-item:nth-child(2)').addClass('active');
            $('#mTab2').addClass('active');
            $('#tab2 a[href="#mTab2"]').addClass('active');
        },
        newAddress: function() {
            if (!$("#address-receiver").val()) {
                $.toast('请输入收货人姓名');
            } else if (!$("#address-phone").val() || $("#address-phone").val().length != 11) {
                $.toast('请输入正确的手机号');
            } else if (!$("#address-site").val()) {
                $.toast('请输入收货人地址');
            } else {
                var newAddress = {
                    phone: $("#address-phone").val(),
                    receiver: $("#address-receiver").val(),
                    site: $("#address-site").val(),
                    state: this.user.addresses.length === 0 ? 1 : 0
                }
                this.user.addresses.push(newAddress);
                $.ajax({
                    type: 'post',
                    url: 'http://' + HOST + '/user/address/new',
                    dataType: 'json',
                    data: {
                        addressInfo: JSON.stringify(newAddress)
                    },
                    success: function(data) {
                        if (data.state == 0) {
                            $.toast('数据同步失败，请稍后再试');
                        }
                    }
                })
                $.toast('地址添加成功');
                $.router.load("#myAddresses");
            }
        },
        defaultAddress: function(e) {
            if (e.target.tagName != "SPAN") {
                var addressId = $(e.currentTarget).data('addressId');
                for (var i = this.user.addresses.length - 1; i >= 0; i--) {
                    this.user.addresses[i].state = 0;
                }
                this.user.addresses[addressId].state = 1;
                $.ajax({
                    type: 'post',
                    url: 'http://' + HOST + '/user/address/default',
                    dataType: 'json',
                    data: {
                        addressId: vmUnique.user.addresses[addressId]._id
                    },
                    success: function(data) {
                        if (data.state == 0) {
                            $.toast('数据同步失败，请稍后再试');
                        }
                    }
                })
            }
        },
        deleteAddress: function(e) {
            var addressId = $(e.target).parent().parent().data('addressId');
            if (this.user.addresses[addressId].state == 1) {
                $.toast('当前地址为默认地址，不可删除')
            } else {
                $.confirm('确认删除？', function() {
                    $.ajax({
                        type: 'post',
                        url: 'http://' + HOST + '/user/address/delete',
                        dataType: 'json',
                        data: {
                            addressId: vmUnique.user.addresses[addressId]._id
                        },
                        success: function(data) {
                            if (data.state == 0) {
                                return $.toast('数据同步失败，请稍后再试');
                            }
                                vmUnique.user.addresses.splice(addressId, 1);
                        }
                    })
                })
            }
        },
        editAddress: function() {

        }
    }
})

$(document).on("pageAnimationStart", function(e, pageId) {
    setTimeout(function() { $.refreshScroller()  }, 300);
    if (pageId = "confirmOrder") {
        vmUnique.orderDetail.wares = [vmUnique.wareDetail];
        vmUnique.orderDetail.price = 0;
        for (var i = 0; i < vmUnique.orderDetail.wares.length; i++) {
            vmUnique.orderDetail.price += vmUnique.orderDetail.wares[i].sum*vmUnique.orderDetail.wares[i].weight*vmUnique.orderDetail.wares[i].info.price
        }
    }
});

$(document).on("click", ".tab-link", function() {
    setTimeout(function() { $.refreshScroller() }, 300);
    $('#shopcar-list').scroller('refresh');
})

$(function() {
    //读取本地商品及订单详情
    if (!vmUnique.wareDetail.info) {
        vmUnique.wareDetail = window.localStorage.wareDetail?JSON.parse(window.localStorage.wareDetail):{};
    }
    vmUnique.orderDetail.wares = window.localStorage.orderDetail?JSON.parse(window.localStorage.orderDetail):[];

     //下单界面时间选择器
    var date = new Date();
    $("#datetime-picker").datetimePicker({
        value: [date.getFullYear(), (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1), date.getDate() > 9 ? date.getDate() : "0" + date.getDate(), '12', '30']
    });
    //计算订单总价
    vmUnique.$set("orderDetail.price",0);
    for (var i = 0; i < vmUnique.orderDetail.wares.length; i++) {
        vmUnique.orderDetail.price += vmUnique.orderDetail.wares[i].sum*vmUnique.orderDetail.wares[i].weight*vmUnique.orderDetail.wares[i].info.price
    }
    //刷新滚动条
    setTimeout(function() { $.refreshScroller()  }, 300);

});
