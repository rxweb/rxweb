$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();
		$('.page-section').each(function(i) {
				if ($(this).position().top <= scrollDistance) {
						$('#rightsidebar-items a.active').removeClass('active');
                        $("[href='#"+$(this)[0].id +"']").addClass('active')
				}
		});
		var scroll = $(window).scrollTop();
		if (window.innerWidth > 991)
		{
			if (scroll >= 50) {
				$(".title").addClass("sticky");
			} else {
				$(".title").removeClass("sticky");
			}
		}
}).scroll();

function scrollTo(section){
    window.location.hash=section;
}