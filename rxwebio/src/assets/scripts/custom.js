$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();
		$('.page-section').each(function(i) {
				if ($(this).position().top <= scrollDistance) {
						$('#rightsidebar-items a.active').removeClass('active');
                        $("[href='#"+$(this)[0].id +"']").addClass('active')
				}
		});

}).scroll();

function scrollTo(section){
    window.location.hash=section;
}

function hideSearch(){
	document.getElementById("searchlist-content").style.display = "none";
}