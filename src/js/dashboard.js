$( document ).ready(function() {
    $("#addPrefix").on("click", function(e) {
        pAdd();
        return;
    })

    $(".changeNickname").on('click', function(e) {
        changeNickname();
        return;
    })

    $(".delete-prefix").on("click", function() {pDel(this)})
  
    var pAdd = function() { 
        const request = fetch(`${document.location.origin}/api/prefix`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify({
                "prefix": $(".prefix-input").val(),
                "guild": window.location.href.split(/[/\\?]+/)[3]
            })
        })
        .then(function(response) {
            response.json().then(function(data) {
                if (response.ok) {
                    createPrefixContainer($(".prefix-input").val())
                    updatePrefixTitle(data.prefixes.length+1)
                }
                createToast(data.status, data.message)
            })
        })
    }

    const createPrefixContainer = function(prefix) {
        const elem = $(`
            <div class="prefix">
                <span class="prefix-label">${prefix}</span>
                <button class="delete-prefix">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="24px" fill="var(--red)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
                </button>
            </div>
        `)
        $(".prefixes-container").append(elem);
        $(elem).find(".delete-prefix").click(function() {pDel(this)})
        $(".prefix-input").val("");
    }
    
    var pDel = function(elem) {
        const request = fetch(`${document.location.origin}/api/prefix`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify({
                "prefix": $(elem).parent().index(),
                "guild": window.location.href.split(/[/\\?]+/)[3]
            })
        })
        .then(function(response) {
            response.json().then(function(data) {
                if (response.ok) {
                    $(elem).parent().remove();
                    updatePrefixTitle(data.prefixes.length-1)
                }
                createToast(data.status, data.message)
            })
        })
    }

    const createToast = function(status, message) {
        const toast = $( `
            <div class="toast ${status}">
                <span class="toast-label">${message}</span>
            </div>
        ` )
        $( "#toaster" ).append(toast)
        setTimeout(function() {
            $( toast ).hide()
        }, 3000)
    }

    const updatePrefixTitle = function (prefixesCount) {
        $("#prefix").find(".cat-title").text(`Prefixes (${prefixesCount}/5)`)
    }

    const changeNickname = function (elem) {
        const newNickname = $("#nickname").val();

        fetch('/api/nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                'nickname': newNickname,
                'guild': window.location.href.split(/[/\\?]+/)[3]
            })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status == "success") {
                $('#nickname').attr('placeholder', data.nickname)
                $('#nickname').val("")
            }
            return createToast(data.status, data.message)
        })
        
    }
})
