(function(e){function o(e,t,n){var r=t,s=n;e.load();i=setInterval(function(){e.currentTime>=s&&e.pause()},200);e.addEventListener("loadedmetadata",function(){this.currentTime=r;this.play()},!1)}function u(e,t,n,i){r=setInterval(function(){if(e.currentTime>=n){if(i){var r=!1;return function(){if(!r){a(t,!0);r=!0}}()}e.currentTime=t;e.play()}},500)}function a(e,r){console.log("rewind called");t.pause();var i=e?e:0;n=setInterval(function(){t.playbackRate=1;if(t.currentTime<=i){clearInterval(n);t.currentTime=i;return r?t.play():t.pause()}t.currentTime-=.0333},33)}function g(){d=!1;c.each(function(t,n){e(n).toggleClass("active",t>=l).removeClass("content_visible")});S();w();E();setTimeout(function(){d=!0;f=0},1e3)}function y(){l--;l<1&&(l=0);g()}function b(){l++;l>h&&(l=h);g()}function w(){m.eq(l).addClass("active").siblings().removeClass("active")}function E(){var e=c.eq(l).find("h1");e.removeClass("hidden");e.parents(".slide").prevAll().find("h1").addClass("hidden");e.parents(".slide").nextAll().find("h1").removeClass("hidden")}function S(){var e=c.eq(l),s=e.data("start"),o=e.data("end"),a=e.data("loop-start"),f=e.data("loop-end");clearInterval(r);clearInterval(n);clearInterval(i);t.play();u(t,a,f,!0);t.play()}function x(e){c.removeClass("initial");if(d&&(e.originalEvent.detail<0||e.originalEvent.wheelDelta>0)){f--;Math.abs(f)>=p&&y()}else if(d){f++;f>=p&&b()}return!1}var t=document.getElementById("video"),n,r,i;e(t).on("play",function(){t.playbackRate=1;clearInterval(n)});e(t).on("pause",function(){t.playbackRate=1;clearInterval(n)});e("#speed").click(function(){t.playbackRate=3});e("#negative").on("click",a);var s=document.getElementById("time");setInterval(function(){s.innerHTML=parseInt(t.currentTime)},200);o(t,6,7);u(t,6,7,!0);var f=0,l=0,c=e(".slide"),h=c.length-1,p=10,d=!0,v=e("nav"),m=v.find("span");e(window).on({"DOMMouseScroll mousewheel":x});e(document).keydown(function(e){switch(e.keyCode){case 40:b();break;case 38:y()}});m.on("click",function(){l=m.index(e(this));w();var t=c.removeClass("content_visible").eq(l);t.addClass("active");t.prevAll().removeClass("active");t.nextAll().addClass("active");E()})})(jQuery);