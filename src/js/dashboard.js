$( document ).ready(function() {
    $("#addPrefix").on("click", function(e) {
        return pAdd();
    })

    $(".delete-prefix").on("click", function() {pDel(this)})

    var pAdd = function() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${document.location.origin}/api/prefix`, true, null, null)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        xhr.addEventListener("load", function() {
            const response = JSON.parse(this.responseText)
            if (response.status == "success") {
                createPrefixContainer($(".prefix-input").val())
            }
            return createToast(response.status, response.message)
        });
        xhr.send(JSON.stringify({
            "prefix": $(".prefix-input").val(),
            "guild": window.location.href.split(/[/\\?]+/)[3]
        }))
    }

    var createPrefixContainer = function(prefix) {
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
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${document.location.origin}/api/prefix`, true, null, null)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        xhr.addEventListener("load", function() {
            const response = JSON.parse(this.responseText)
            if (response.status == "success") {
                $(elem).parent().remove();
            }
            return createToast(response.status, response.message)
        });
        xhr.send(JSON.stringify({
            "prefix": $(elem).parent().index(),
            "guild": window.location.href.split(/[/\\?]+/)[3]
        }))
    }

    var createToast = function(status, message) {
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
})
