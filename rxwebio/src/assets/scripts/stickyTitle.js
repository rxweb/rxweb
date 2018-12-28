$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (window.innerWidth > 991)
    {
        if (scroll >= 50) {
            //console.log('a');
            $(".title").addClass("sticky");
        } else {
            //console.log('a');
            $(".title").removeClass("sticky");
        }
    }
});

function scrollTo(section){
    window.location.hash=section;
}