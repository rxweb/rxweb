$(document).ready(function() {
		// $('a[href*=#]').bind('click', function(e) {
		// 		e.preventDefault(); // prevent hard jump, the default behavior
		// 		var target = $(this).attr("href"); // Set the target as variable
		// 		$('html, body').stop().animate({
		// 				scrollTop: $(target).offset().top
		// 		}, 600, function() {
		// 				location.hash = target; //attach the hash (#jumptarget) to the pageurl
		// 		});
		// 		return false;
		// });
});

$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();
		$('.page-section').each(function(i) {
				if ($(this).position().top <= scrollDistance) {
						$('#rightsidebar-items a.active').removeClass('active');
						//$('#rightsidebar-items a').eq($(this)[0].id).addClass('active');
                        //$($(this)[0].id).addClass('active')
                        $("[href='#"+$(this)[0].id +"']").addClass('active')
				}
		});
}).scroll();

function scrollTo(section){
    window.location.hash=section;
}

// $(".page-tabs a").click(function() {
//   var position = $(this).parent().position();
//   var width = $(this).parent().width();
//     $(".slider").css({"left":+ position.left,"width":width});
// });
// var actWidth = $(".page-tabs").find(".active").parent("li").width();
// var actPosition = $(".page-tabs .active").position();
// $(".slider").css({"left":+ actPosition.left,"width": actWidth});
