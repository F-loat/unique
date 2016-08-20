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
            img: "",
            descriptions: [{ text: "" }],
            type: 2
        }
    },
    methods: {
        addWare: function() {
            this.ware.descriptions.push({ text: "" })
        },
        minusWare: function(index) {
            this.ware.descriptions.splice(index, 1)
        }
    }
})
