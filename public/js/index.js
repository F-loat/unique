$.init();

$(document).on('touchmove', 'body', function(e) {
    e.preventDefault();
});

var vmUnique = new Vue({
    el: '#main',
    ready: function() {
        this.getUserInfo().getWaresInfo();
    },
    data: {
        wares: {
            type: 0,
            img: "",
            nameEn: "",
            name: "",
            price: 0
        },
        orders: null,
        user: {
            nickname: "",
            addresses: []
        },
        wareDetail: {},
    },
    methods: {
        getWaresInfo: function() {
            $.ajax({
                type: 'get',
                url: '/ware',
                success: function(data) {
                    vmUnique.wares = data;
                }
            })
            return this;
        },
        dishChange: function(event) {
            $('.dishTab').removeClass('active');
            $(event.target).addClass('active')
        }, 
        weightChange: function(event) {
            $('.weightTab').removeClass('active');
            $(event.target).addClass('active')
        }, 
        orderMessage: function() {
            $.prompt('您有什么要求呢？',
                function(value) {
                    $('#order-message').text(value);
                },
                function(value) {
                    $.toast('您没有保存要求');
                }
            );
            $(".modal-text-input").val($('#order-message').text())
        }, 
        checkAll: function() {
            if ($("#check-all").attr("checked")) {
                $(".order-list label.label-checkbox input[type=checkbox]").each(function() {
                    $(this).attr("checked", false);
                });
            } else {
                $(".order-list label.label-checkbox input[type=checkbox]").each(function() {
                    $(this).attr("checked", true);
                });
            }
        },
        fastGetIdentify: function() {
            if ($('#fastGet-identify').val() == "获取验证码") {
                var phone = $('#fastLog-phone').val();
                if (phone.length === 11) {
                    $.ajax({
                        type: 'post',
                        url: '/user/fastLogin/identify',
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
        fastLoginNow: function() {
            var phone = $('#fastLog-phone').val(),
                identify = $('#fastLog-identify').val();
            if (phone.length != 11) {
                $.toast("请输入正确的手机号");
            } else if (!identify) {
                $.toast("请输入验证码");
            } else {
                $.ajax({
                    type: 'post',
                    url: '/user/fastLogin',
                    dataType: 'json',
                    data: {
                        phone: phone,
                        identify: identify
                    },
                    success: function(data) {
                        if (data.state === 1) {
                            $.toast('登录成功，正在为您跳转')
                            setTimeout(function() {
                                window.location.href = "/";
                            }, 1000)
                        } else {
                            $.toast(data.err)
                        }
                    }
                })
            }
        },
        getUserInfo: function() {
            $.ajax({
                type: 'get',
                url: '/user',
                success: function(data) {
                    if (data.state === 1) {
                        vmUnique.user.nickname = data.nickname;
                        vmUnique.user.addresses = JSON.parse(data.addresses);
                    }
                }
            })
            return this;
        },
        getIdentify: function() {
            if ($('#get-identify').val() == "获取验证码") {
                var phone = $('#reg-phone').val();
                if (phone.length === 11) {
                    $.ajax({
                        type: 'post',
                        url: '/user/regist/identify',
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
        registNow: function() {
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
                    url: '/user/regist',
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
                                window.location.href = "/";
                            }, 1000)
                        } else {
                            $.toast(data.err)
                        }
                    }
                })
            }
        },
        loginNow: function() {
            var phone = $('#log-phone').val(),
                password = $('#log-password').val();
            if (phone.length != 11) {
                $.toast("请输入正确的手机号");
            } else if (!password) {
                $.toast("请输入密码");
            } else {
                $.ajax({
                    type: 'post',
                    url: '/user/login',
                    dataType: 'json',
                    data: {
                        phone: phone,
                        password: md5(password)
                    },
                    success: function(data) {
                        if (data.state === 1) {
                            $.toast('登录成功，正在为您跳转')
                            setTimeout(function() {
                                window.location.href = "/";
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
        defaultAddress: function(e) {
            var addressId = $(e.target).data('addressId');
            for (var i = this.user.addresses.length - 1; i >= 0; i--) {
                this.user.addresses[i].state = 0
            }
            this.user.addresses[addressId].state = 1
        },
        deleteAddress: function(e) {
            var addressId = $(e.target).parent().parent().data('addressId');
            if (this.user.addresses[addressId].state == 1) {
                $.toast('当前地址为默认地址，不可删除')
            } else {
                $.confirm('确认删除？', function() {
                    vmUnique.user.addresses.splice(addressId, 1)
                })
            }
        },
        editAddress: function() {

        }
    }
})

$(document).on("pageInit", function(e, pageId) {
    $.refreshScroller();
    if (pageId == "confirmOrder") {
        var date = new Date();
        $("#datetime-picker").datetimePicker({
            value: [date.getFullYear(), (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1), date.getDate() > 9 ? date.getDate() : "0" + date.getDate(), '12', '30']
        });
    }
});

var id = 0;
$(document).on('click', 'a[data-id]', function() {
    id = $(this).data('id');
});

$(document).on("pageAnimationStart", "#wareDetail", function() {
    vmUnique.wareDetail = vmUnique.wares[id];
});