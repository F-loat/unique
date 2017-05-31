var HOST = document.domain;

$(document).on('touchmove', 'body', function(e) {
    e.preventDefault();
});

var vmAdmin = new Vue({
    el: '#admin',
    ready: function() {
        $.init();
        $(".content").scroller({
            type: 'js'
        });
    },
    data: {
        ware: {
            name: "",
            nameEn: "",
            descriptions: [{ text: "" }],
            type: 0
        }
    },
    methods: {
        addWareDescription: function() {
            this.ware.descriptions.push({ text: "" })
        },
        minusWareDescription: function(index) {
            this.ware.descriptions.splice(index, 1)
        },
        addWare: function(){
                var fd = new FormData();
                fd.append("upload", 1);
                fd.append("upfile", $("#upfile").get(0).files[0]);
                $.ajax({
                    url: "test.php",
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: fd,
                    success: function(d) {
                        console.log(d);
                    }
                });
            $.ajax({
                type: 'post',
                url: 'http://' + HOST + '/ware/add',
                dataType: 'json',
                data: {
                    ware:JSON.stringify(vmAdmin.ware)

                },
                success: function(data) {
                    if (data.state===0) {
                        $.toast('添加失败');
                    } else {
                        vmAdmin.ware = {
                            name: "",
                            nameEn: "",
                            descriptions: [{ text: "" }],
                            type: 0
                        }
                    }
                }
            })
        }
    }
})
