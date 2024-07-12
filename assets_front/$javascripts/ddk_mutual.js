DDK.Mutual = {
	init:function(){
		$('.pageCtx').each(function(){//設定手機版本的單元內頁選單
			if($(this).find('.contentMenu').length == 1 && $(this).find('.contentBlock .mobileSideOption').length == 1){
				$(this).find('.contentBlock .mobileSideOption .unitTitle').html($(this).find('.contentBlock .title .unit').html());
				$(this).find('.contentBlock .mobileSideOption .pageTitle').html($(this).find('.contentBlock .title .page').html());
				$(this).find('.contentBlock .mobileSideOption ul').append($(this).find('.contentMenu ul').html());
				$(this).find('.contentBlock .mobileSideOption ul li').each(function(){
					if($(this).find('a').length == 0) $(this).addClass('hideItem');
				});
				FxAddEventListener($(this).find('.contentBlock .mobileSideOption .menuIOBtn')[0] , 'click' , DDK.Mutual.EventHandler.mobilePageMenu , false);
				
				
			}
		});
		if($('.pageTop .siteMenu .menuIOBtn').length == 1){
			FxAddEventListener($('.pageTop .siteMenu .menuIOBtn')[0] , 'click' , DDK.Mutual.EventHandler.mobileSiteMenu , false);
			FxAddEventListener($('.pageTop .siteMenu .menuCover')[0] , 'click' , function(e){
				var _t = e.currentTarget;
				var _p = _t.parentElement;
				$(_p).find('.menuIOBtn').addClass('openMenu');
					$(_p).find('.menuIOBtn').removeClass('closeMenu');
					$(_p).find('ul').removeClass('openMenu');
					$(_t).addClass('closeMenu').removeClass('openMenu');
			} , false);
		}
		if($('.ckx').length > 0){
			DDK.claerContentStyle($('.ckx *'));
		}
		if($('.FxLoadAndCenter').length > 0){
			$('.FxLoadAndCenter').each(function(){
				if($(this).attr('src').indexOf('youtube') > -1){
					//console.log(DDK.findYouTubeIdByUrl($(this).attr('src')));
					$(this).attr('src' , 'https://img.youtube.com/vi/' + DDK.findYouTubeIdByUrl($(this).attr('src')) + '/0.jpg');
					
				}
			});//微調圖片網址
			FxCheckMultiImgLoad({
				img_ary : $('.FxLoadAndCenter') , 
				interval : 'FxLoadAndCenter',
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
			
		}
		if($('#bgMusic').length == 1) DDK.Mutual.setBgMusic($('.BGplayer')[0] , $('#bgMusic')[0]);
	}
	,
	setBgMusic:function(_wrapper , _audio){
		var _playBtn = $(_wrapper).find('.playBg')[0];
		var _closeBtn = $(_wrapper).find('.closeHintBg')[0];
		
		setTimeout(function(){
			if(_audio.currentTime <= 0){
				FxAddEventListener(_playBtn , 'click' , DDK.Mutual.EventHandler.allowPlayBgMusic , false);
				FxAddEventListener(_closeBtn , 'click' , DDK.Mutual.EventHandler.allowPlayBgMusic , false);
				FxAddEventListener(_audio , 'timeupdate' , function(e){
					//console.log(Math.floor((e.target.currentTime / e.target.duration)*100) + '%');
				} , false);
				_audio.volume = 0.7;
				$(_wrapper).addClass('show');
			}
		} , 1000);
	}
	,
	EventHandler:{
		allowPlayBgMusic:function(e){
			var _t = e.currentTarget;
			var _p = $(_t).closest('.BGplayer');
			var _task = $(_t).attr('data-task');
			//console.log(_t , _p , _task , $(_p).find('audio')[0]);
			if(_task == 'playMusic'){
				$(_p).find('audio')[0].play();
				$(_p).removeClass('show');
			} else if(_task == 'closeHint'){
				$(_p).removeClass('show');
			}
			
		},
		mobilePageMenu:function(e){
			var _t = e.currentTarget;
			var _p = _t.parentElement;
			if($(_t).hasClass('menuOpen') == false){
				$(_t).addClass('menuOpen');
				$(_t).removeClass('menuClose');
				$(_p).find('ul').addClass('menuOpen');
			} else {
				$(_t).removeClass('menuOpen');
				$(_t).addClass('menuClose');
				$(_p).find('ul').removeClass('menuOpen');
			}
		}
		,
		mobileSiteMenu:function(e){
			var _t = e.currentTarget;
			var _p = _t.parentElement;
			if($(_t).hasClass('openMenu') == false){
				$(_t).addClass('openMenu');
				$(_t).removeClass('closeMenu');
				$(_p).find('ul').removeClass('openMenu');
				$(_p).find('.menuCover').addClass('closeMenu').removeClass('openMenu');
			} else {
				$(_t).removeClass('openMenu');
				$(_t).addClass('closeMenu');
				$(_p).find('ul').addClass('openMenu');
				$(_p).find('.menuCover').removeClass('closeMenu').addClass('openMenu');
			}
			if($('.pageCtx .contentBlock .mobileSideOption .menuIOBtn').hasClass('menuOpen') == true){
				$('.pageCtx .contentBlock .mobileSideOption .menuIOBtn').removeClass('menuOpen').addClass('menuClose');
				$('.pageCtx .contentBlock .mobileSideOption ul').removeClass('menuOpen')
			}
		}
	}
};