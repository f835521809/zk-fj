$(function() {
    new BScroll('.wrap');

    $.ajax({
        url: '../data/data.json',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res.code === 1) {
                render(res.data);
            }
        }
    })

    function render(data) {
        var obj = {};
        data.forEach(function(item) {
            var first = item.Spelling.substr(0, 1);
            if (!obj[first]) {
                obj[first] = {
                    title: first,
                    list: []
                };
            }
            obj[first].list.push(item);
        })
        var arr = [];
        for (var i in obj) {
            arr.push(obj[i])
        }

        arr.sort(function(a, b) {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        console.log(arr);

        var str = '';
        arr.forEach(function(item) {
            str += `<li>
            <h2>${item.title}</h2>
            <ol>`;
            item.list.forEach(function(v) {
                str += `
                    <li>${v.Name}</li>
                    `
            });
            str += `</ol></li>`
        });
        $('.list').append(str);
    }
})