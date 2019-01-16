//右侧栏时钟
function clock() {
	var d = new Date();
	var h = to2bit(d.getHours());
	var m = to2bit(d.getMinutes());
	var s = to2bit(d.getSeconds());
	$('#timer').text(h + ':' + m + ':' + s);
	setTimeout('clock()', 20);

}

function to2bit(num) {
	if(num < 10) {
		return '0' + num;
	} else {
		return '' + num;
	}
}

setTimeout('clock()', 20);

//访客统计
visitor();

function visitor() {
	var caution = false;

	function setCookie(name, value, expires, path, domain, secure) {
		var curCookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? ";secure" : "");
		if(!caution || (name + "=" + escape(value)).length <= 4000) {
			document.cookie = curCookie;
		} else
		if(confirm("Cookie exceeds 4KB and will be cut!")) {
			document.cookie = curCookie;
		}
	}

	function getCookie(name) {
		var prefix = name + "=";
		var cookieStartIndex = document.cookie.indexOf(prefix);
		if(cookieStartIndex == -1) {
			return null;
		}
		var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
		if(cookieEndIndex == -1) {
			cookieEndIndex = document.cookie.length;
		}
		return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
	}

	function deleteCookie(name, path, domain) {
		if(getCookie(name)) {
			document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
	}

	function fixDate(date) {
		var base = new Date(0);
		var skew = base.getTime();
		if(skew > 0) {
			date.setTime(date.getTime() - skew);
		}
	}
	var now = new Date();
	fixDate(now);
	now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
	var visits = getCookie("counter");
	if(!visits) {
		visits = 1;
	} else {
		visits = parseInt(visits) + 1;
	}
	setCookie("counter", visits, now);
	$('#countVisit').text("欢迎,您是第" + visits + "位访客！");

}

//音乐播放器
//播放
var btn1 = document.getElementById("btn-play");
btn1.onclick = function() {
	if(audio.paused) {
		audio.play();
	}
}

//暂停
var btn2 = document.getElementById("btn-stop");
btn2.onclick = function() {
	if(audio.played) {
		audio.pause();
	}
}

var music = [];
music = ["森田童子 - ぼくたちの失败", "青木カレン - Never Again (short ver.)", "Pet Shop Boys - Go West", "Black Box Recorder - Seasons in the Sun", "ENE - パズル (Piano&Strings Acousticアレンジ)"]; //歌单
var musicNum = 0;
var songName = document.getElementById('musicname');

//上一首
var btn3 = document.getElementById("btn-pre");
btn3.onclick = function() {
	musicNum = (musicNum + 4) % 5;
	audio.src = "../music/" + music[musicNum] + ".mp3";
	songName.innerHTML = music[musicNum];
	audio.play();
}

//下一首
var btn4 = document.getElementById("btn-next");
btn4.onclick = function() {
	musicNum = (musicNum + 1) % 5;
	audio.src = "../music/" + music[musicNum] + ".mp3";
	songName.innerHTML = music[musicNum];
	audio.play();
}
//自动播放下一首
audio.addEventListener('ended', function() {
	btn4.onclick();
}, false);

//主页轮播图

$(function() {
	var $dc_left = $(".previous");
	var $dc_right = $(".next");
	var $dc_img = $(".dc_carousel_img li");
//	var $dc_point = $(".dc_carousel_point li");
	var $i = 0;

	var $dc_w = [],
		$dc_h = [],
		$dc_t = [],
		$dc_l = [],
		$dc_o = [],
		$dc_z = [];

	function slide() {
		//存样式（属性）
		$dc_img.each(function($i) {
			$dc_w[$i] = $(this).css("width");
			$dc_h[$i] = $(this).css("height");
			$dc_t[$i] = $(this).css("top");
			$dc_l[$i] = $(this).css("left");
			$dc_o[$i] = $(this).css("opacity");
			$dc_z[$i] = $(this).css("zIndex");
		});
		//取样式（属性）
		
		$dc_img.each(function($i) {

			$i++;
			if($i == $dc_img.length) {
				$i = 0;
			}
			$(this).css("zIndex", $dc_z[$i]).animate({
				width: $dc_w[$i],
				height: $dc_h[$i],
				left: $dc_l[$i],
				top: $dc_t[$i],
				opacity: $dc_o[$i]
			}, 400);
						
		});
		
	}
	var $time = setInterval(function() {
		slide();
	}, 3000);

});

