$( window ).on('load', function () {
    $(".header-user").on('click', function (e) {
        toggleElem(e)
    })
})

function toggleElem(e) {
    const elem = $(".header-user-dropdown")
    if (elem.is(":hidden")) {elem.show(100, "swing")}
    else {elem.hide(100, "swing")}
}