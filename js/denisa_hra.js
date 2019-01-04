function myFunction() {
    	var v = document.getElementById("video");

if($('#video').css('display') == 'none')
{
        document.getElementById("video").style.display = "block";
	v.play();
}
else{
        document.getElementById("video").style.display = "none";
	v.pause();
}
}

function refresh(){
      location.reload();
      var el= document.getElementById("inputid");
      el.value= "0:00:00";
}




var d1 = new Date();
d1.setHours(00,00,00);

var t = 0;

$("button").click(function(){
    $("#back").delay("slow").fadeIn();
  });

function f(){
  
    document.getElementById('start').classList.add('hide');
    document.getElementById('demo').classList.remove('demo');
    document.getElementById('demo').classList.add('show');
    document.getElementById('nova').classList.remove('nova');
    document.getElementById('nova').classList.add('shownova');



    setTimeout(function() {
        document.getElementById("Modra").style.visibility = "visible";}, 500);
    setTimeout(function() {
        document.getElementById("Tyrkys").style.visibility = "visible";}, 700);
    setTimeout(function() {
        document.getElementById("Fialova").style.visibility = "visible";}, 900);
    setTimeout(function() {
        document.getElementById("ZelenaMala").style.visibility = "visible";}, 1000);
    setTimeout(function() {
        document.getElementById("Cervena").style.visibility = "visible";}, 1200);
     setTimeout(function() {
       document.getElementById("Ruzova").style.visibility = "visible";}, 1400);
     setTimeout(function() {
       document.getElementById("Zlta").style.visibility = "visible";}, 1600);
     setTimeout(function() {
       document.getElementById("ZelenaVelka").style.visibility = "visible";}, 1800);
    


    var h= d1.getHours();
    var m= d1.getMinutes();
    var s=d1.getSeconds();
    m= (m<10)?"0"+m: m;
    s= (s<10)? "0"+s : s;
    
    var el= document.getElementById("inputid");
    el.value= h+":"+m+":"+s;
    d1.setSeconds(d1.getSeconds()+1);
    if( h==0 && m==0 && s==0 ) clearTimeout(t)
    t= setTimeout(f,1800);
	
    
}

function pause(){
    clearTimeout(t);
}



$( document ).ready(function() {
var el= document.getElementById("inputid");
      el.value= "0:00:00";

    var baDragCnt = 0;
    var ttDragCnt = 0;
    var nrDragCnt = 0;
    var tnDragCnt = 0;
    var bbDragCnt = 0;
    var zaDragCnt = 0;
    var poDragCnt = 0;
    var keDragCnt = 0;

    var solveTime;
    var totalScore = 0;


    $("#Modra").draggable({snap: "#imgfind1", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        ttDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }});

$("#Cervena").draggable({snap: "#imgfind5", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        baDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }});


    $("#Zlta").draggable({snap: "#imgfind7", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        nrDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

     $("#Ruzova").draggable({snap: "#imgfind6", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        nrDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

   
    $("#ZelenaMala").draggable({snap: "#imgfind4", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        bbDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

    $("#Fialova").draggable({snap: "#imgfind3", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        zaDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

    $("#Tyrkys").draggable({snap: "#imgfind2", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        poDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });
    $("#ZelenaVelka").draggable({snap: "#imgfind8", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        keDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

/************************************************************************************************************/
var droppedRegions=0;
var el= document.getElementById("inputid");



    $("#imgfind1").droppable({
      accept: "#Modra",
      tolerance: "fit",
      drop: function( event, ui ) {
        $("#Modra").draggable({revert: false});
        $("#Modra").draggable("destroy");
        if(ttDragCnt == 1){totalScore++;};
        if(ttDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){

            swal('Super!', 'Úspešne si vyriešil hru za '+el.value+' sekúnd a získal si '+totalScore+' bodov!', "success");
       pause();
	 };
      }
    });

$("#imgfind5").droppable({
      accept: "#Cervena",
      tolerance: "fit",
      drop: function( event, ui ) {
        $("#Cervena").draggable({revert: false});
        $("#Cervena").draggable("destroy");
        if(baDragCnt == 1){totalScore++;};
        if(baDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){
            swal('Super!', 'Úspešne si vyriešil hru za '+el.value+' sekúnd a získal si '+totalScore+' bodov!', "success");
       pause();
        };
      }
    });


    $("#imgfind7").droppable({
      accept: "#Zlta",
      tolerance: "fit",
      drop: function( event, ui ) {
        $("#Zlta").draggable({revert: false});
        $("#Zlta").draggable("destroy");
        if(nrDragCnt == 1){totalScore++;};
        if(nrDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){
            swal('Super!', 'Úspešne si vyriešil hru za '+el.value+' sekúnd a získal si '+totalScore+' bodov!', "success");
       pause();
        };
      }
    });

    $("#imgfind6").droppable({
      accept: "#Ruzova",
      tolerance: "fit",
      drop: function( event, ui ) {
        $("#Ruzova").draggable({revert: false});
        $("#Ruzova").draggable("destroy");
        if(nrDragCnt == 1){totalScore++;};
        if(nrDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){
            swal('Super!', 'Úspešne si vyriešil hru za '+el.value+' sekúnd a získal si '+totalScore+' bodov!', "success");
       pause();
        };
      }
    });

    $("#imgfind4").droppable({
      accept: "#ZelenaMala",
      tolerance: "fit",
      drop: function( event, ui ) {
        $("#ZelenaMala").draggable({revert: false});
        $("#ZelenaMala").draggable("destroy");
        if(bbDragCnt == 1){totalScore++;};
        if(bbDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        //console.log("droppedRegions: "+droppedRegions);
        if(droppedRegions == 8){
            swal('Super!', 'Úspešne si vyriešil hru za '+el.value+' sekúnd a získal si '+totalScore+' bodov!', "success");
       pause();
        };
      }
    });

    $("#imgfind3").droppable({
      accept: "#Fialova",
      tolerance: "fit",
      drop: function( event, ui ) {
        $("#Fialova").draggable({revert: false});
        $("#Fialova").draggable("destroy");
        if(zaDragCnt == 1){totalScore++;};
        if(zaDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){
            swal('Super!', 'Úspešne si vyriešil hru za '+el.value+' sekúnd a získal si '+totalScore+' bodov!', "success");
       pause();
        };
      }
    });

    $("#imgfind2").droppable({
      accept: "#Tyrkys",
      tolerance: "fit",
      drop: function( event, ui ) {
        $("#Tyrkys").draggable({revert: false});
        $("#Tyrkys").draggable("destroy");
        if(poDragCnt == 1){totalScore++;};
        if(poDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){
            swal('Super!', 'Úspešne si vyriešil hru za '+el.value+' sekúnd a získal si '+totalScore+' bodov!', "success");
       pause();
        };
      }

    });

    $("#imgfind8").droppable({
      accept: "#ZelenaVelka",
      tolerance: "fit",
      drop: function( event, ui ) {
        $("#ZelenaVelka").draggable({revert: false});
        $("#ZelenaVelka").draggable("destroy");
        if(keDragCnt == 1){totalScore++;};
        if(keDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){
            swal('Super!', 'Úspešne si vyriešil hru za '+el.value+' sekúnd a získal si '+totalScore+' bodov!', "success");
       pause();
        };
      }

    });

});





