import  "./js/nombre_fils_serie_produit_par_pays"
import  "./js/top_3_film_serie"
import  "./js/les_genres_les_plus_populaire"
import  "./js/quantite_film_disponible"


const d3 = window.d3v3;

let indeGlobal = 0;

d3.select(window).on("load", () => {
	setTimeout(() => {
		d3.select("#animted").classed("go", true);
		onCome()
	}, 5000)

	setTimeout(() => {
		const x = document.getElementById("myAudio");
		x.play();  
	}, 5000)

	d3.select("#zero").on("click", function() {
		onShwoCarousel(true)
		const dom = document.getElementsByClassName("next")
		do {
		  dom[0].click();
		} while (indeGlobal !== 0);
	})
	d3.select("#one").on("click", function() {
  		onShwoCarousel(true)
		const dom = document.getElementsByClassName("next")
		do {
		  dom[0].click();
		} while (indeGlobal !== 1);
  		
	})
	d3.select("#two").on("click", function() {
		onShwoCarousel(true)
		const dom = document.getElementsByClassName("next")
  		do {
		  dom[0].click();
		}  while (indeGlobal !== 2);
	})

	d3.select("#choix").on("click", function() {
		onShwoCarousel(false)
	})
	d3.select("#tree").on("click", function() {
		onShwoCarousel(true)
		const dom = document.getElementsByClassName("next")
  		do {
		  dom[0].click();
		}  while (indeGlobal !== 3);
	})
});

function onCome(){
	setTimeout(() => {
		d3.select("#animted").classed("height-0", true);
		d3.select("#choice").classed("height-0", false);
		d3.select("#choice").classed("h-full", true);
		d3.select("#choice").classed("come", true);
	}, 2000)
}

function onShwoCarousel(state){
	d3.select("#body").classed("hero2", !state);
	d3.select("#body").classed("hero", state);

	d3.select("#choice").classed("h-full", !state);
	d3.select("#choice").classed("transition", state);
	d3.select("#choice").classed("height-0", state);
	d3.select("#choice").classed("come", !state);
	d3.select("#choice").classed("opacity-0", state);

	d3.select("#content").classed("d-non", !state);
	d3.select("#content").classed("d-bloc", state);
	d3.select("#carousel").classed("height-0", !state);
	d3.select("#carousel").classed("h-full", state);
	d3.select("#carousel").classed("go2", !state);
	d3.select("#carousel").classed("transition-bis", state);
	d3.select("#carousel").classed("come", state);
}



var flkty = new Flickity( '.carousel', {
  on: {
    ready: function() {
      console.log('Flickity is ready');
    },
    change: function( index ) {
      console.log( 'Slide changed to' + index );
      indeGlobal=index
      index ==2 && window.onDraw()
      index ==0 && window.daw2("movie")
    }
  },
  "wrapAround": true
});


