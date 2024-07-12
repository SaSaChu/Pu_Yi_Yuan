DDK.Index = {
	init:function(){
		var slickTarget = $('.slickBox .slickPlugin');
		var profile = {
			arrows:false , 
			/*
			prevArrow:'.indexBanner .controls .prev' , 
			nextArrow:'.indexBanner .controls .next'  , 
			*/
			autoplay:Boolean(Number(slickTarget.attr('data-autoplay'))) , 
			autoplaySpeed:Number(slickTarget.attr('data-interval')) , 
			adaptiveHeight:true,
			/*centerPadding:'15px' , */
			slidesToShow:1 , 
			swipe:false , 
			fade:true,
			responsive:[]
		};//slick 的設定檔
		slickTarget.slick(profile);
	}
};
$(document).ready(function (){
	//DDK.active();
	//DDK.blert('RWD:'+DDK.isRwd);DDK.blert('Mobile:'+DDK.isMobile);
	DDK.Index.init();
});