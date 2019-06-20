$(document).ready(function() { 
	// .ready() - ������� ������ �������� DOM (��� �����������)

	$("#my-menu").mmenu({ // ������������� � ��������� Mmenu (� ���� !�� ������ � API Mmenu)
		extensions: [ 'widescreen', 'theme-black', 'effect-listitems-slide', 'pagedim-black'],
		offCanvas: {
			position : 'right'
		},
		navbar: {
			title: '<span>Beauty</span> Shop'
		}
	});

	var apiM = $("#my-menu").data("mmenu"); // ����� API Mmenu ���������� ��������� .hamburger
	apiM.bind("opened", function() { 
		// .bind - ���������� ���������. ���� ���� �������, ��:
		$(".hamburger").addClass("is-active");
		}).bind("closed", function() {
		// .bind - ���������� ���������. ���� ���� �������, ��:
		$(".hamburger").removeClass("is-active");
		});

	function servicesImgHight() { // ������ �������� ����� ������ ��������
		$(".services-slider__item").each(function() {
			// .each() - ���� �� ��������� ��-��� �� ����� ���������
			var it = $(this);
			var contentHeight = it.find(".services-slider__content").outerHeight();
			// .find() - ������� ��-�, .outerHeight() - ����� ��� ������� ������
			var img = it.find(".services-slider__image");
			// .find() - ������� ��-�
			img.css("min-height", contentHeight);
			// ������ min-height ��� ��������
		});
	};

	$(".services-slider").on('initialized.owl.carousel', function() { // � ���� !�� ������������� �������
		// .on() - ������������� ���������� ������� �� ��������� ��-�
		// initialized.owl.carousel - ������� ������ ������������� OwlCarousel
		setTimeout(function() {
			servicesImgHight()
			// ��������� servicesImgHight() ����� ������ ������������� OwlCarousel (� �� ��� $(document).ready)
		}, 100);
		// ���� ������������� �������� �� servicesImgHight(), ��� ������������
	});

	$(".services-slider").owlCarousel({ // ������������� � ��������� .services-slider
		margin: 0,
		nav: true,
		navText: [
			'<i class="fa fa-angle-double-left" aria-hidden="true"></i>', 
			'<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
			],
		loop: true,
		dots: false,
		smartSpeed: 700,
		fluidSpeed: 700,
		navSpeed: 700,
		dotsSpeed: 700,
		dragEndSpeed: 700,
		responsiveClass:true,
    	responsive:{
        	0:{
            	items:1
        	},
        	768:{
            	items:2
        	},
        	992:{
            	items:3
        	},
        	1200:{
            	items:3
        	}
    	}
	});

	$('.services-slider__content').equalHeights(); // ���������� ������
	$('footer .col-lg-3').equalHeights(); // ���������� ������

	function lastWordToSpan() { // ��������� span � ���������� ����� � ���������
		$(".services-slider__name").each(function() {
			// .each() - ���� �� ��������� ��-��� �� ����� ���������
			var it = $(this);
			var text = it.text().trim();
			// .text() - ����� ���������� ��-��
			// .trim() - ������� ������� ��������, ����� � ��������� ����� �� ������ � ����� ������
			var words = text.split(' ');
			// .split(s) - ��������� ������ � ������, ������ �� �� ����������� s
   			var lastWord = words.pop();
   			// .pop() - ��������� ��������� ��-� �������. ��� ���� ��-� ��������� �� �������
  			words.push('<span>' + lastWord + '</span>');
  			// .push() - ��������� ��-� � ����� �������
   			it.html(words.join(' '));
   			// .join(s) - ��������� ������ � ������, s ����� ������������ � ������
		});
	};
	lastWordToSpan();

	function firstWordToSpan() { // ��������� span � ������� ����� � ���������
		$(".section-title").each(function() {
			// .each() - ���� �� ��������� ��-��� �� ����� ���������
			var it = $(this);
			var text = it.text().trim();
			// .text() - ����� ���������� ��-��
			// .trim() - ������� ������� ��������, ����� � ��������� ����� �� ������ � ����� ������
			var words = text.split(' ');
			// .split(s) - ��������� ������ � ������, ������ �� �� ����������� s
   			var firstWord = words.shift();
   			// .shift() - ��������� ������ ��-� �������. ��� ���� ��-� ��������� �� �������
  			words.unshift('<span>' + firstWord + '</span>');
  			// .unshift() - ��������� ��-� � ������ �������
   			it.html(words.join(' '));
   			// .join(s) - ��������� ������ � ������, s ����� ������������ � ������
		});
	};
	firstWordToSpan();

	$('.gallery').fotorama({ // ��������� Fotorama
		minheight: '350',
		nav: 'thumbs',
		thumbwidth: '110',
		thumbheight: '65',
		thumbborderwidth: '4',
		fit: 'cover',
		thumbfit: 'cover',
		transition: 'slide',
		loop: false,
		keyboard: true,
		shadows: false,
		click: true,
		swipe: true,
		arrows: 'always'
	});

	$(window).scroll(function() { // ������ ������� ������ "������"
		// $(window) - ���� ��������
		// .scroll() - ������� ���������
		if($(this).scrollTop() > $(this).height()) {
		//.scrollTop() - �������� ������� ��������� ������
			$('.to-top').addClass('active');
		} else {
			$('.to-top').removeClass('active');
		}
	});

	$('.to-top').click(function() { // ������ ������
		$("html, body").animate({scrollTop: 0}, "slow");
		// .animate() - ������������ �������� ������ CSS �������
		return false;
		// return false - ��� ��������� ��������������� ������� .click() �� ������ ��������
	});

	$("form").submit(function() { //E-mail Ajax �����
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../mail.php",
			data: th.serialize()
		}).done(function() { // ����� �������� ������ ��������� �-��:
			// ������� ��������� �� �������� ��������
			$(".form-message").addClass("success");
			setTimeout(function() {
				// ������� ��������� �� �������� �������� ����� 2000 ��
				$(".form-message").removeClass("success");
				// ���������� �������� ����� ����� 2000 ��
				th.trigger("reset");
				// ��������� magnificPopup ����� 2000 ��
				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.close();
			}, 2000);
		});
		return false;
	});

	$('.basic-form__select').styler(); // ������������� FormStyler

	$(".comments-slider").owlCarousel({ // ������������� � ��������� .comments-slider
		margin: 0,
		nav: false,
		loop: true,
		dots: true,
		autoHeight: false,
		smartSpeed: 700,
		fluidSpeed: 700,
		navSpeed: 700,
		dotsSpeed: 700,
		dragEndSpeed: 700,
		responsiveClass:true,
    	responsive:{
        	0:{
            	items:1
        	},
        	768:{
            	items:1
        	},
        	992:{
            	items:1
        	},
        	1200:{
            	items:1
        	}
    	}
	});

	$(".partners-slider").owlCarousel({ // ������������� � ��������� .partners-slider
		margin: 50,
		nav: true,
		navText: [
			'<i class="fa fa-angle-left" aria-hidden="true"></i>', 
			'<i class="fa fa-angle-right" aria-hidden="true"></i>'
			],
		loop: true,
		dots: false,
		smartSpeed: 700,
		fluidSpeed: 700,
		navSpeed: 700,
		dotsSpeed: 700,
		dragEndSpeed: 700,
		responsiveClass:true,
    	responsive:{
        	0:{
            	items:1
        	},
        	768:{
            	items:2
        	},
        	992:{
            	items:4
        	},
        	1200:{
            	items:4
        	}
    	}
	});

});

$(window).on('load', function() { // ��������� ��������
	// $(window) - ���� ��������
	// .on() - ������������� ���������� ������� �� ��������� ��-�
	// .load() - ������� ������ �������� DOM (������� �����������)
	$('.preloader').fadeOut();
	// .fadeOut() - c������� ��-� ����� ��������� �� ����������� ���������
});