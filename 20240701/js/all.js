// 生物種族 active

$('#race a').on('click', function () {
	$('#race a').removeClass('active')
	$(this).addClass('active')
})

// swiper ----------------------------------------------------------
const swiper = new Swiper('#swiper', {
	// 基礎設定
	direction: 'horizontal',
	loop: true,
	speed: 1000,
	slidesPerView: 1,
	spaceBetween: 10,
	autoplay: {
		delay: 5000
	},

	// 效果 coverflow
	effect: 'coverflow',
	centeredSlides: true,
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true
	},

	// 哪個斷點顯示幾張
	breakpoints: {
		576: {
			slidesPerView: 2
		},
		768: {
			slidesPerView: 3
		},
		920: {
			slidesPerView: 3
		},
		1200: {
			slidesPerView: 4
		}
	},

	// 分頁
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: false,
		clickable: true
	},

	// 導覽上一張，下一張
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})

// GSAP ---------------------------------------------------------------------------------------------------------------
// 註冊 plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// ScrollTrigger 滾動控制
gsap.to('.backtop', {
	scrollTrigger: {
		trigger: '#footer',
		start: 'top bottom',
		end: '100% bottom',
		toggleActions: 'play none none reverse',
		markers: true
	},
	display: 'block',
	opacity: 1,
	duration: 1
})

// 導覽列 active 位置
$('.main-link').each(function (index, link) {
	let href = $(link).attr('href')
	// console.log(href);
	gsap.to(link, {
		scrollTrigger: {
			trigger: `${href}`,
			start: 'top center',
			end: 'bottom center',
			toggleClass: {
				targets: link,
				className: 'active'
			},
			markers: true
		}
	})
})
