(function($){

		var video = document.getElementById('video');
		var intervalRewind;
		var intervalLoop;
		var intervalPlay;

// CONTROLLI VARI SUL PLAY PAUSA E FAST FOWARD
$(video).on('play',function(){
	video.playbackRate = 1.0;
	clearInterval(intervalRewind);
});
$(video).on('pause',function(){
	video.playbackRate = 1.0;
	clearInterval(intervalRewind);
});
$("#speed").click(function() { // button function for 3x fast speed forward
	video.playbackRate = 3.0;
});

$("#negative").on('click', rewind);



// Stampa il secondo corrente del video TEMPORANEO
var t = document.getElementById('time');
// video.addEventListener('timeupdate',function(event){
//   t.innerHTML = parseInt(video.currentTime);
// },false);
setInterval(function(){
	t.innerHTML = parseInt(video.currentTime);
}, 200);



// GESTIONE DEL VIDEO PLAY
function playVideo(video, start, end) {
		// Archivio i dati passati come parametri
		var starttime = start;
		var endtime = end;
    // inizio il caricamento del video
    video.load();

    // controllo il tempo attuale per mettere in pausa quando viene raggiunto l'endtime
   //  video.addEventListener("timeupdate", function() {
			// if (this.currentTime >= endtime) {
			//     this.pause();
			// }
   //  }, false);
intervalPlay = setInterval(function() {
	if (video.currentTime >= endtime) {
		video.pause();
	}
}, 200);

    // attendo il caricamento dei metadati del video
    video.addEventListener('loadedmetadata', function() {
    	// imposto il secondo di inizio del video
    	this.currentTime = starttime;
			// faccio partire il video
			this.play();
		}, false);
  }

// GESTIONE DEL LOOP
function loopVideo(video, starttime, endtime, backward) {

    // Imposto un intervallo di 0.5 secondi per controllare il tempo attuale
    intervalLoop = setInterval(function() {
    	// Se il tempo attuale è >= alla fine del loop
    	if (video.currentTime >= endtime) {
				// se il loop dev'essere riprodotto anche al contrario
				if (backward) {
					// closure per evitare che la funzione rewind sia chiamata solo una volta
					// (non ho ancora capito perchè aumentanto l'intervalLoop non funzioni comunque)
					var executed = false;
					return function () {
						if (!executed) {
			        	// richiamo la funzione rewind fino al punto di inizio del loop
			        	rewind(starttime, true);
		        		// da verificare se la pausa migliora la fluidità
		        		executed = true;
		        	}
		        }();
			  // se non deve andare in backward salta al tempo di inizio del loop e manda in play
			} else {
				video.currentTime = starttime;
				video.play();
			}
			} // Fine verifica se il loop è alla fine
    }, 500); // Imposto l'intervalLoop ogni 500ms
  };



// DICHIARAZIONE DI REWIND
function rewind(start, play) {
	console.log('rewind called');
	video.pause();

	// se non è stato passato il valore di arrivo del rewind lo imposto a 0
	var starttime = start ? start : 0;

	// imposto un intervallo ogni 10 millisecondo
	intervalRewind = setInterval(function(){
		video.playbackRate = 1.0;

		// se il tempo corrente è <= alla fine del rewind
		if(video.currentTime <= starttime){
			// pulisco l'intervalRewind
			clearInterval(intervalRewind);
			// imposto il tempo corrente alla fine del rewind
			video.currentTime = starttime;

			// se il video deve andare in play (argomento passato)
			if (play) {
				return video.play();
			} else {
				return video.pause();
			}
		} else { // fine se il tempo corrente è alla fine del rewind
			// imposto il tempo al tempo attuale - 0.03s
			video.currentTime -= 0.0333;
		}
	},33); // fine intervalRewind
};

// video.load();
playVideo(video, 6, 7);
loopVideo(video, 6, 7, true);

// setTimeout(function() {
// 	clearInterval(intervalLoop);
// 	clearInterval(intervalRewind);
// 	clearInterval(intervalPlay);
// 	video.play();
// 	loopVideo(video, 20, 25, true);
// 	// playVideo(video, video.currentTime, 25);
// 	// video.play();
// }, 18000)


	// Variabili
	var delta = 0,
		currentSlideIndex = 0,
		slides = $('.slide'),
		numSlides = slides.length - 1,
		// Imposta quanto è necessario scrollare prima che cambi slide
		scrollThreshold = 10,
		ready = true,

		nav = $('nav'),
		nav_elements = nav.find('span');

	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// FUNZIONI VARIE
	//////////////////////////////////////////////
	//////////////////////////////////////////////

	// mostra la slide
	function showSlide() {
		// imposta la variabile ready su false per prevenire che scrollando "salti" una slide
		ready = false;
		// rimuove la classe active dove non necessaria (nascondendo quelle già visitate viene visualizzata quella corrente)
		slides.each(function(i, slide) {
			$(slide).toggleClass('active', (i >= currentSlideIndex)).removeClass('content_visible');
		});
		controlVideo();

		activeNav();
		hideH1();
		// Aspetto 1 secondo prima di impostare ready su true per permettere di cambiare slide
		setTimeout(function() {
			ready = true;
			delta = 0;
		}, 1000);

	}

	// imposta la slide corrente a quella precedente
	function prevSlide() {
		currentSlideIndex--;

		if (currentSlideIndex < 1) {
			currentSlideIndex = 0;
		}
		showSlide();
	}

	// imposta la slide corrente a quella successiva
	function nextSlide() {
		currentSlideIndex++;

		if (currentSlideIndex > numSlides) {
			currentSlideIndex = numSlides;
		}
		showSlide();
	}

	function activeNav() {
		nav_elements.eq(currentSlideIndex).addClass('active').siblings().removeClass('active');
	}

	function hideH1() {
		// archivio la slide corrente
		var current_slide_title = slides.eq(currentSlideIndex).find('h1');

		current_slide_title.removeClass('hidden');
		current_slide_title.parents('.slide').prevAll().find('h1').addClass('hidden');
		current_slide_title.parents('.slide').nextAll().find('h1').removeClass('hidden');
	}

	function controlVideo() {
		var current_slide = slides.eq(currentSlideIndex),
			video_start = current_slide.data('start'),
			video_end = current_slide.data('end'),
			loop_start = current_slide.data('loop-start'),
			loop_end = current_slide.data('loop-end');

		clearInterval(intervalLoop);
		clearInterval(intervalRewind);
		clearInterval(intervalPlay);
		video.play();
		// playVideo(video, video_start, video_end);
		loopVideo(video, loop_start, loop_end, true);
		// playVideo(video, video.currentTime, 25);
		video.play();

	}









	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// NAVIGAZIONE CON SCROLL
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	function elmScroll (e) {
		slides.removeClass('initial');
		// Scroll up
		if (ready && (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0)) {
			delta--;
			if ( Math.abs(delta) >= scrollThreshold) {
			prevSlide();
			}
		}
		// Scroll down
		else if (ready) {
			delta++;
			if (delta >= scrollThreshold) {
				nextSlide();
			}
		}
		// evita che la pagina scrolli
		return false;
	}
	
	$(window).on({
		'DOMMouseScroll mousewheel': elmScroll
	});







	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// NAVIGAZIONE CON FRECCINE
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	$(document).keydown(function(e) {
		switch(e.keyCode) {
			// Freccia giù
			case 40:
				nextSlide();
				break;

			// Freccia su
			case 38:
				prevSlide();
				break;
		}
	});








	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// NAVIGAZIONE CON PALLINI
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	nav_elements.on('click', function() {
		// imposto la slide corrente ricavando l'indice dal corrispettivo indice dell'elemento nella navigazione
		currentSlideIndex = nav_elements.index($(this));
		// aggiungo la classe active all'elemento della navigazione
		activeNav();

		// archivio la slide corrente
		var currentSlide = slides.removeClass('content_visible').eq(currentSlideIndex);

		currentSlide.addClass('active');
		currentSlide.prevAll().removeClass('active');
		currentSlide.nextAll().addClass('active');
		hideH1();
	});



})(jQuery);