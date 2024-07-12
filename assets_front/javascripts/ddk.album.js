DDK.Album = {
	init:function(){
		if($('.thumbSubsetList').length > 0){//製作手機板的圖片列表
			$('.thumbSubsetList').each(function(){
				var slickTarget = $(this).find('.slickPlugin');
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
					swipe:true , 
					fade:false,
					responsive:[]
				};//slick 的設定檔
				var list = $($(this).find('ol').html());//複製原本的清單內容
				list.each(function(){
					var _div = $(document.createElement('DIV')).attr('class' , 'ctx');
					$(_div).append($(this).children());//將原有內容移入新的div.ctx 內
					$(this).append(_div);
					$(this).find('figure img').removeAttr('style , fx-event-ids , fx-check-loaded').attr('class' , 'FxLoadAndCenterRwd preload');
				});
				slickTarget.append(list);
				slickTarget.slick(profile);
				FxCheckMultiImgLoad({/*檢查複製出的清單的圖檔載入*/
					img_ary : slickTarget.find('.FxLoadAndCenterRwd') , 
					interval : 'FxLoadAndCenterRwd',
					update : true,
					delay : 50,
					eachEnd : function(img , success){
						$(img).removeClass('preload');
					},
					end :  function(success_ary , fail_ary){
						FxFotoCaption({
							imageList : success_ary , 
							update : true , 
							contenter : success_ary[0].parentElement.tagName , 
							formatter : 'shrink'
						})/*持續更新圖檔並取得FxFotoCaption 的回傳值*/
					}
				})();
			});
		}
		if($('.thumbSubsetList.prePhoto').length > 0){//初始化單張圖片的fancybox 特效
			$('.thumbSubsetList.prePhoto .frame').each(function(){
				
				if($(this).closest('li')[0].parentElement.tagName.toUpperCase() == 'OL'){
					$(this).attr('data-fancybox' , 'gallery-normal');
				} else {
					$(this).attr('data-fancybox' , 'gallery-rwd');
				}
				$(this).attr('data-caption' , $(this).attr('title'));
			});
			var prop = {
				arrows: true,
				buttons:[/*'close'*/ , 'zoom'],
				caption : function( instance, item ) {
					return '<h4 class="childTitle">' + $('.thumbSubsetList.prePhoto h3').html() + '</h4>' + '<span class="child">' + $(this).attr('data-caption') + '</span>';
				}
				,
				afterShow:function(instance, item){
					$(instance.$refs.stage).find('.fancybox-slide--current .fancybox-content').append('<button type="button" class="extendCloseFancyboxBtn" onclick="$.fancybox.getInstance().close();$(this).remove();"><i class="icon-cross"></i></button>');//追加照片右上的關閉按鈕
				}
			};
			$('.thumbSubsetList.prePhoto .frame[data-fancybox="gallery-normal"]').fancybox(prop);
			$('.thumbSubsetList.prePhoto .frame[data-fancybox="gallery-rwd"]').fancybox(prop);
		}
	}
};
$(document).ready(function (){
	
	DDK.Album.init();
});