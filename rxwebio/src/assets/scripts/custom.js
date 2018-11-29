function scrollTo(section){
    var node = document.querySelector('#' + section);
    node.scrollIntoView(true);
    var scrolledY = window.scrollY;
    if (scrolledY) {
        window.scroll(0, scrolledY - 62);
    }
    return false;
}

// $(".page-tabs a").click(function() {
//   var position = $(this).parent().position();
//   var width = $(this).parent().width();
//     $(".slider").css({"left":+ position.left,"width":width});
// });
// var actWidth = $(".page-tabs").find(".active").parent("li").width();
// var actPosition = $(".page-tabs .active").position();
// $(".slider").css({"left":+ actPosition.left,"width": actWidth});
