/***************************************************
==================== JS INDEX ======================
****************************************************

01. PreLoader js
02. Common Js
03. Backto top
04. Wow Js
06. Click To 

******************/

(function ($) {
	"use strict";

	var windowOn = $(window);
	////////////////////////////////////////////////////
	// 01. PreLoader Js
	windowOn.on('load', function () {
		$(".preloader").fadeOut(500);
	});

	
	////////////////////////////////////////////////////
	// 02. Common Js
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	/////////////////////////////////////////////////
	// 03. back_to_top
	function back_to_top() {
		var btn = $('#back_to_top');
		var btn_wrapper = $('.back-to-top-wrapper');

		windowOn.scroll(function () {
			if (windowOn.scrollTop() > 300) {
				btn_wrapper.addClass('back-to-top-btn-show');
			} else {
				btn_wrapper.removeClass('back-to-top-btn-show');
			}
		});

		btn.on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, '300');
		});
	}
	back_to_top();



	////////////////////////////////////////////////////
	// 06. Click To Down
	function scrollNav() {
		$('nav a').on('click', function(event) {
				event.preventDefault();
				$('html, body').stop().animate({
						scrollTop: $($(this).attr('href')).offset().top
				}, 300);
		});
	}
	$(document).ready(function() {
			scrollNav();
	});

	////////////////////////////////////////////////////
	// 07. tp-pages-slide

	var swiper = new Swiper(".tp-hero-slide", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 15,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 10000,
		autoplay: {
		  delay: 1,
		  disableOnInteraction: true,
		},
	  });

	var swiper = new Swiper(".tp-pages-slide", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 30,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 8000,
		autoplay: {
		  delay: 1,
		  disableOnInteraction: true,
		},
	  });

	  var swiper = new Swiper(".tp-elements-slide", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 24,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 5000,
		autoplay: {
		  delay: 1,
		  disableOnInteraction: true,
		},
	  });
	  

	////////////////////////////////////////////////////
	// 23. custom animetion Js


	    // custom-variables
		var animeBreakPoint = 1199;
		$(".attractive-hover, .splitting-animation, footer, [data-anime], [data-fancy-text]").each(function () {
			$(this).appear().trigger("resize");
		});
	
		// custom-function
		function getWindowHeight() {
			return $(window).height();
		}
		function getWindowWidth() {
			return $(window).width();
		}
	
		// animeAnimation-active
		function animeAnimation(target, options) {
			let child = target;
			let staggerValue = options.staggervalue || 0;
			let delay = options.delay || 0;
			let anime_animation = anime.timeline();
			function applyTransitionStyles(elements) {
				for (let i = 0; i < elements.length; i++) {
					const element = elements[i];
					element.style.transition = "none";
					if (options.willchange) {
						element.style.willChange = "transform";
					}
				}
			}
			if (options.el === "childs") {
				child = target.children;
				applyTransitionStyles(target.children);
			}
			if (options.el === "lines") {
				function lineSplitting() {
					const lines = Splitting({ target: target, by: "lines" });
					const line = lines[0].lines.map((item) => item.map((i) => i.innerHTML).join(" "));
					target.innerHTML = line.map((item) => `<span class="d-inline-flex">${item}</span>`).join(" ");
				}
				lineSplitting();
				applyTransitionStyles(target.children);
				child = target.children;
			}
			if (options.el === "words") {
				function lineSplitting() {
					const words = Splitting({ target: target, by: "words" });
					const word = words[0].words.join(" ");
				}
				lineSplitting();
				applyTransitionStyles(target.children);
				child = target.children;
			}
			if (options.perspective) {
				target.style.perspective = `${options.perspective}px`;
			}
			if (options.willchange) {
				target.style.willChange = options.willchange;
			}
			anime_animation.add({
				targets: child,
				...options,
				delay: anime.stagger(staggerValue, { start: delay }),
				complete: function () {
					if (options.el) {
						target.classList.add("anime-child");
						target.classList.add("anime-complete");
						for (let i = 0; i < target.children.length; i++) {
							const element = target.children[i];
							element.style.removeProperty("opacity");
							element.style.removeProperty("transform");
							element.style.removeProperty("transition");
							if (target.classList.contains("grid")) {
								element.style.transition = "none";
							}
						}
						if (options.el === "lines") {
							for (let i = 0; i < target.children.length; i++) {
								const element = target.children[i];
								element.classList.remove("d-inline-flex");
								element.classList.add("d-inline");
								element.style.willChange = "inherit";
							}
						}
					} else {
						target.classList.add("anime-complete");
						target.style.removeProperty("opacity");
						target.style.removeProperty("transform");
						target.style.removeProperty("transition");
					}
				},
			});
		}
		
		const $dataAnimeElements = $("[data-anime]:not(.swiper [data-anime])");
		$dataAnimeElements.each(function () {
			const $self = $(this);
			const animeOptions = $self.data("anime");
			if (animeOptions && getWindowWidth() > animeBreakPoint) {
				try {
					const effect = animeOptions.effect && animeOptions.effect.toLowerCase();
					$self.on("appear", function () {
						if (!$self.hasClass("appear")) {
							$self.addClass("appear");
							if (effect === "slide") {
								slideAnimation(this, animeOptions);
							} else {
								animeAnimation(this, animeOptions);
							}
						}
						if ($self.hasClass("grid")) {
							$self.find(".grid-sizer").removeAttr("style");
						}
					});
				} catch (error) {
					console.error("Error parsing anime options:", error);
				}
			} else {
				$self.removeAttr("data-anime");
				$("body").addClass("no-animation");
			}
		});



})(jQuery);