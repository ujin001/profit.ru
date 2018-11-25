var index_video = [
	'053z5afOuDI',
	'ygGrYn75NF4',
	'41Y4nNrSHWo',
	'pvmEmEVw3jE',
	'T4_tkrbosi4',
	'RswhXt5gqQ4',
	'iyX-qd0l7yA',
	'z9XT1H8RvUU',
	'2_tw0LI4ZqQ',
	'QiT0agvyObA'
],
	video_top = 'O8cCHUh8mOA';

var v_icon_size = 0;
var vp_size = 0;
var sceneDetails = {};
var slider_is_active = false;

$(function(){
	if (device.tablet() || device.mobile()) {
		$('.loader').css('opacity', 0);
		setTimeout(function(){
			$('.loader').remove()
		},500);
		$('.mobile_menu .button').click(function(){
			$('nav').toggleClass('active')
		});
		$('nav ul a').click(function(){
			$('nav').removeClass('active')
		});
		initMobileVideo();
		initAnchorMenu();
		initAnimForm();
	}
});

$(window).ready(function(){
    
     $('.video_close, .popup').click(function(e){
        if($(e.target).hasClass('popup') || $(e.target).hasClass('video_close')) {
            $('.popup').removeClass('popup_active').removeClass('politics_active');
            $('.popup .video_container').html('');
        }
    })
    
    $('.politica').click(function(){
        $('.popup').addClass('popup_active').addClass('politics_active');
    });
    
        if (!device.tablet() && !device.mobile()) {

        $(document).bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                if (!$('.promo').hasClass('promo_effect_start')) {
                    $('.promo').addClass('promo_effect_up').addClass('promo_effect_start');
                    setTimeout(function () {
                        $('.promo').removeClass('promo_effect_up');
                        setTimeout(function () {
                            $('.promo').removeClass('promo_effect_start')
                        }, 200);
                    }, 200);
                }
            } else {
                if (!$('.promo').hasClass('promo_effect_start')) {
                    $('.promo').addClass('promo_effect_down').addClass('promo_effect_start');
                    setTimeout(function () {
                        $('.promo').removeClass('promo_effect_down');
                        setTimeout(function () {
                            $('.promo').removeClass('promo_effect_start')
                        }, 200);
                    }, 200);
                }
            }
        });
    }

	
	if ((!device.tablet() && !device.mobile()) && $(window).width() > 1020) {
		preparePlayer();
		
		$(window).resize(function(){
			preparePlayer();
		});
		if(
			$('.player_box .video_list .video.active').index() < 1
		)
			$('.player_button.left').removeClass('active');

		//events
		$('.player_button.left').click(playerLeft);
		$('.player_button.right').click(playerRight);

		initAnchorMenu();
		initAnimForm();

		prepareAnchors();
		prepareVideoPlay();


		//SCROLL EVENTS:

		initScrollMenu();
	}
    
    if ((!device.tablet() && !device.mobile()) && $(window).width() > 1020) {
		setupScrollAnimBlock('article.home');
		setupScrollAnimBlock('article.famous');
		setupScrollAnimBlock('article.car');
		setupScrollAnimBlock('article.form');
		setupScrollAnimBlock('article.start');
        
    }
	
});

function initMobileVideo(){
	$('article.home').find('.content .video').html('<iframe width="545" height="307" src="https://www.youtube.com/embed/' + video_top + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
	
	$('article.famous .video').click(function(){
		$(this).find('.icon').html('<iframe width="'+ $(this).width() +'px" height="'+ $(this).find('.icon').height() +'px" src="https://www.youtube.com/embed/'+
		
		index_video[$(this).index()]
		
		+'?rel=0&amp;showinfo=0;autoplay=1" frameborder="0" allowfullscreen></iframe>');
		
		/*$('article.car .video iframe').css('height', ($('article.car .video').width() * 100 / 545) + 'px');*/
	});
	
	$('article.car .player_play .button')
		.css(
			'left',
			($('article.car .player_play').width() - $('article.car .player_play .button').width()) / 2 + 'px'
		)
		.css(
				'top',
				($('article.famous .video').eq(1).find('.icon').height() - $('article.car .player_play .button').height()) / 2 + 'px'
			)
		.click(function(){	$(this).closest('.video').find('.video_container').removeClass('hidden').html('<iframe width="'+ $('article.car .video').width() +'px" height="'+($('article.car .video').width() * 307 / 545) +'px" src="https://www.youtube.com/embed/oqlW8sa_LKo?rel=0&amp;showinfo=0;autoplay=1" frameborder="0" allowfullscreen></iframe>')
			$('.player_play').remove()
		});
	
	$('iframe').attr(
		'height',
		$('article.famous .video').eq(1).find('.icon').height() + 'px'
	);
	
	$('.video_container, .player_play').css(
		'height',
		$('article.famous .video').eq(1).find('.icon').height() + 'px',
		true
	);
	if($(window).width() > 520)
		$('.home iframe').attr(
			'height',
			$('article.famous .video').eq(1).find('.icon').height() * 1.5 + 'px'
		);
}

function prepareVideoPlay(){
	$('.player_play .button').click(function(){
		if($(this).closest('.video').hasClass('famous_video')){
			$(this).closest('.video')
				.find('.video_container')
				.html('<iframe width="545" height="307" src="https://www.youtube.com/embed/'
				+ index_video[$('.player_box .video_list .video.active').index()] +
				'?rel=0&amp;showinfo=0;autoplay=1" frameborder="0" allowfullscreen></iframe>'
			);
			$(this).parent().addClass('hidden')
		} else {
			$(this).closest('.video')
				.find('.video_container')
				.removeClass('hidden')
				.html('<iframe width="545" height="307" src="https://www.youtube.com/embed/oqlW8sa_LKo?rel=0&amp;showinfo=0;autoplay=1" frameborder="0" allowfullscreen></iframe>'
			);
			$(this).parent().addClass('hidden')
		}
	});
	$('article.famous .video_list .video').click(function(){
		if(!slider_is_active){
			slider_is_active = true;
			
			var index_prev = $('.player_box .video_list .video.active').index();
			
			$('.player_box .video_list .video.active')
				.removeClass('active')
				.css(
					'margin-left',
					0
				);
			
			var vp_active = $(this).addClass('active');
			
			var index = vp_active.attr('_index');

			if(index == $('.player_box .video_list .video').length)
				$('.player_button.right').removeClass('active');
			if(index >= 1)
				$('.player_button.left').addClass('active');
			
			if(index_prev < index)
				preparePlayer('l')
			else
				preparePlayer('r');
		}
	});
}

function setupScrollAnimBlock(block){
	
	var controller = new ScrollMagic.Controller({
		offset: 100
	});
	
	sceneDetails[block] = new ScrollMagic.Scene({
		container: block,
		triggerElement: block,
		duration: $(block).outerHeight()
	})
		.on("enter", function (e) {
			if(e.state == "DURING") {
				$(block).find('.anim_block').addClass('anim_finish');
				sceneDetails[block].loglevel(3);
				sceneDetails[block].destroy();
				sceneDetails[block] = null
				if(block == 'article.home')
					setTimeout(function(){
						$(block).find('.anchor').addClass('anchor_anim');
						setTimeout(function(){
							$(block).find('.anchor .obj').addClass('bounce');
						}, 900);
						$(block).find('.content .video').html('<iframe width="545" height="307" src="https://www.youtube.com/embed/' + video_top + '?rel=0&amp;showinfo=0;autoplay=1" frameborder="0" allowfullscreen></iframe>');
					},600);
				if(block == 'article.start')
					setTimeout(function(){
						$(block).find('.icon_box .orange').addClass('active');
					}, 1500);
				if(block == 'article.car')
					setTimeout(function(){
						$(block).addClass('animated_bg');
					}, 100);
			}
		})
		.addTo(controller)
		//.addIndicators();
}

function prepareAnchors(){
	$('.mouse').click(
		function(){
			$('html, body').stop().animate({
				scrollTop: $(
					$('section article').eq(
						$(this).closest('article').index() + 1
					)
				).offset().top
			}, 1000);
		}
	);
}

function initAnimForm(){
	var forms = $('article.home form, article.form form');
	
	//init in case of bugs
	for(var i = 0; i < forms.find('input').length; i++){
		var input = forms.find('input').eq(i);
		if(
			$(input).val()
		)
			$(input).parent().addClass('active')
	}
	
	forms.find('input').click(function(e){
		if(
			!$(this).val() &&
			!$(this).parent().hasClass('active')
		)
			$(this).parent().addClass('active')
	});
	
	forms.find('input').focus(function(e){
		if(
			!$(this).val() &&
			!$(this).parent().hasClass('active')
		)
			$(this).parent().addClass('active')
	});
	
	forms.find('input').focusout(function(e){
		if(
			!$(this).val() &&
			$(this).parent().hasClass('active')
		)
			$(this).parent().removeClass('active')
	});
}

function initAnchorMenu(){
	$('#m_top').click(function(){
		go('#go_top')
	});
	$('#m_about').click(function(){
		go('#go_details')
	});
	$('#m_feed').click(function(){
		go('#go_famous')
	});
	$('#m_facts').click(function(){
		go('#go_facts')
	});
	$('#m_car').click(function(){
		go('#go_car')
	});
	$('#m_ins').click(function(){
		go('#go_start')
	});
	$('#anchor_go_form, #anchor_go_form2, #m_start').click(function(){
		go('#go_form')
	});
}

function initScrollMenu(){
	// init controller
	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			offset: 100
		}
	});

	//MENU SCROLL
	new ScrollMagic.Scene({
		container: ".home",
		triggerElement: ".home",
		duration: $('.home').outerHeight()
	})
		.setClassToggle("#m_top", "active")
		.addTo(controller)
	
	new ScrollMagic.Scene({
		container: ".details",
		triggerElement: ".details",
		duration: $('.details').outerHeight()
	})
		.setClassToggle("#m_about", "active")
		.addTo(controller)
	
	new ScrollMagic.Scene({
		container: ".famous",
		triggerElement: ".famous",
		duration: $('.famous').outerHeight()
	})
		.setClassToggle("#m_feed", "active")
		.addTo(controller)
	
	new ScrollMagic.Scene({
		container: ".facts",
		triggerElement: ".facts",
		duration: $('.facts').outerHeight()
	})
		.setClassToggle("#m_facts", "active")
		.addTo(controller)
	
	new ScrollMagic.Scene({
		container: ".car",
		triggerElement: ".car",
		duration: $('.car').outerHeight()
	})
		.setClassToggle("#m_car", "active")
		.addTo(controller)
	
	new ScrollMagic.Scene({
		container: ".start",
		triggerElement: ".start",
		duration: $('.start').outerHeight()
	})
		.setClassToggle("#m_ins", "active")
		.addTo(controller)
	
	new ScrollMagic.Scene({
		container: ".form",
		triggerElement: ".form",
		duration: $('.form').outerHeight()
	})
		.setClassToggle("#m_start", "active")
		.addTo(controller)
}

function preparePlayer(mode){
    
    if(typeof(mode) == 'undefined' || !mode.length)
        mode = 'l';
	
	v_icon_size = $('.player_box .video_list .video').eq(0).width();
	vp_size = $('.video_player .video').width();
	var active = $('.player_box .video_list .video.active');
	
	//setup video player position
	$('.video_player').css(
		'margin-left',
		$('.famous .center').offset().left
	)
	
	//player list size:
	$('.player_box .video_list').width(
		v_icon_size *
		$('.player_box .video_list .video').length +
		vp_size
	);
	
	//active video margin-left
	$('.player_box .video_list .video')
		.css(
			'margin-left',
			0
		)
		.css(
			'margin-right',
			0
		);
	if(mode == 'r') {
		active.css(
			'margin-left',
			vp_size -
			v_icon_size +
			'px'
		)
	} else if (mode == 'l') {
		active.css(
			'margin-right',
			vp_size -
			v_icon_size +
			'px'
		)
	}
	
	//player list position
	$('.player_box .video_list').css(
		'left',
		$('.famous .center').offset().left -
		(active.index() * v_icon_size) +
		'px'
	);
	
	$('.video_player .video .player_play')
		.addClass('anim_finish')
		.addClass('anim_block')
		.removeClass('hidden')
	$('.video_player .video .player_play')
		.removeClass('anim_finish')
	if(mode == 'l') {
		$('.video_player .player_play')
		.addClass('anim_block_left');
	}
	
	setTimeout(function(){
		$('.video_player .video .video_container')
		.html('')
		.css(
			'background-image',
			'url(' + active.find('img').attr('src') + ')'
		);

		$('.video_player .text').text(
			active.find('.text').text()
		);
		
		$('.video_player .player_play')
			.addClass('anim_finish');
		if(mode == 'r') {
			$('.video_player .player_play')
			.addClass('anim_block_left');
		}
		if(mode == 'l') {
			$('.video_player .player_play')
			.removeClass('anim_block_left');
		}
		setTimeout(function(){
			$('.video_player .player_play')
				.removeClass('anim_block_left');
			slider_is_active = false;
		}, 600)
	}, 600)
}

function playerRight(){
	if(!slider_is_active){
		slider_is_active = true;
		var vp_active = $('.player_box .video_list .video.active');
		var index = vp_active.attr('_index');
		index++;

		if(index > $('.player_box .video_list .video').length)
			return;

		vp_active
			.removeClass('active')
			.css(
				'margin-left',
				0
			);

		vp_active
			.parent()
			.find($('.video[_index="' + index + '"]'))
			.addClass('active');

		if(index == $('.player_box .video_list .video').length)
			$('.player_button.right').removeClass('active');
		if(index >= 1)
			$('.player_button.left').addClass('active');

		preparePlayer('r');
	}
}

function playerLeft(){
	if(!slider_is_active){
		slider_is_active = true;
		var vp_active = $('.player_box .video_list .video.active');
		var index = vp_active.attr('_index');
		index--;

		if(index < 1)
			return;

		vp_active
			.removeClass('active')
			.css(
				'margin-left',
				0
			);

		vp_active
			.parent()
			.find($('.video[_index="' + index + '"]'))
			.addClass('active');

		if(index == 1)
			$('.player_button.left').removeClass('active');
		if(index <= $('.player_box .video_list .video').length);
			$('.player_button.right').addClass('active');

		preparePlayer('l');
	}
}

function go(id) {
	$('html, body').stop().animate({
		scrollTop: $(id).offset().top
	}, 1000);
	return false;
}