function transform(mousePoint, game) {
    for (var i = 0; i < game.sachovnica.length; i++) {
        if (game.sachovnica[i].x1 <= mousePoint.x &&
            game.sachovnica[i].x2 >= mousePoint.x &&
            game.sachovnica[i].y1 <= mousePoint.y &&
            game.sachovnica[i].y2 >= mousePoint.y) {
            return game.sachovnica[i];
        }

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function startGame(settings) {
    var pointId = 0;
    var polePoints = {};
    var dieliky = [];
    var sachovnica = [];
    var PieceWidth = settings.canvasWidth / settings.piecesHorizontal;
    var PieceHeight = settings.canvasHeight / settings.piecesVertical;

    for (var i = 0; i < settings.piecesHorizontal + 1; i++) {
        for (var j = 0; j < settings.piecesVertical + 1; j++) {
            polePoints["p" + pointId] = {x: i * PieceWidth, y: j * PieceHeight, pointId: pointId, deltaX: 0};
            pointId++;
        }
    }


    var pointsIds = Object.keys(polePoints);
    for (var i = 0; i < pointsIds.length; i++) {
        var currentPoint = polePoints[pointsIds[i]];
        if (currentPoint.x > settings.canvasWidth - PieceWidth || currentPoint.y > settings.canvasHeight - PieceHeight) {
            continue;
        }
        var dielik = {
            points: [
                'p' + currentPoint.pointId,
                'p' + (currentPoint.pointId + 1),
                'p' + (currentPoint.pointId + settings.piecesVertical + 2),
                'p' + (currentPoint.pointId + settings.piecesVertical + 1)
            ],

            position: {
                riadok: currentPoint.y / PieceHeight,
                stlpec: currentPoint.x / PieceWidth

            }


        };
        dieliky.push(dielik);
    }

    for (var i = 0; i < pointsIds.length; i++) {
        var currentPoint = polePoints[pointsIds[i]];
        if (currentPoint.x > settings.canvasWidth - PieceWidth || currentPoint.y > settings.canvasHeight - PieceHeight || currentPoint.x == 0) {
            continue;
        }

        var deltaX = getRandomInt(60) - 25;
        currentPoint.x += deltaX;
        currentPoint.deltaX = deltaX;

    }

    for (var i = 0; i < settings.piecesHorizontal; i++) {
        for (var j = 0; j < settings.piecesVertical; j++) {
            var gridField = {
                x1: i * PieceWidth,
                y1: j * PieceHeight,
                x2: i * PieceWidth + PieceWidth,
                y2: j * PieceHeight + PieceHeight,
                riadok: j,
                stlpec: i,
            };
            sachovnica.push(gridField);
        }

    }

    return {points: polePoints, dieliky, sachovnica};

}


(function f() {

    var t;
    var aktHra = startGame({
        canvasWidth: 500,
        canvasHeight: 500,
        piecesVertical: 3,
        piecesHorizontal: 3
    });

    console.log(aktHra);


    var h1 = document.getElementsByClassName('time')[0],
        seconds = 0, minutes = 0, hours = 0,
        t;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        timer();
    }

    function timer() {
        t = setTimeout(add, 1000);
    }


    var canvas = this.__canvas = new fabric.Canvas('c');
    fabric.Object.prototype.transparentCorners = false;
    canvas.setWidth(1000);
    canvas.setHeight(700);
    var padding = 0;


    var pocetSpravnych = [];
    for (var i = 0; i < aktHra.dieliky.length; i++) {
        if (!pocetSpravnych[aktHra.dieliky[i].position.riadok]) {
            pocetSpravnych[aktHra.dieliky[i].position.riadok] = [];
        }

        pocetSpravnych[aktHra.dieliky[i].position.riadok][aktHra.dieliky[i].position.stlpec] = false;

    }

    var hraBezi = false;
    canvas.on({

        'mouse:down': function () {
            if (!hraBezi) {
                timer();
                hraBezi = true;
            }


        },

        'mouse:up': function (e) {
            console.log('dropped', e);
            if (!e.target)
                return;

            var gridField = transform(e.pointer, aktHra);

            if (gridField) {

                var polygon2 = e.target.dielik.points.map(p => {
                    return {x: aktHra.points[p].x, y: aktHra.points[p].y, deltaX: aktHra.points[p].deltaX}
                });

                var prve = gridField.x1 - polygon2[0].x;
                var druhe = gridField.x1 - polygon2[1].x;
                var mensie = Math.min(polygon2[0].deltaX, polygon2[1].deltaX);


                e.target.left = gridField.x1 + mensie;
                e.target.top = gridField.y1;
                e.target.setCoords();


                if (e.target.dielik.position.riadok == gridField.riadok && e.target.dielik.position.stlpec == gridField.stlpec) {
                    pocetSpravnych[e.target.dielik.position.riadok][e.target.dielik.position.stlpec] = true;

                }
                else {
                    pocetSpravnych[e.target.dielik.position.riadok][e.target.dielik.position.stlpec] = false;
                }
            }
            else {
                pocetSpravnych[e.target.dielik.position.riadok][e.target.dielik.position.stlpec] = false;
            }

            var vyhra = true;
            for (var j = 0; j < pocetSpravnych.length; j++) {
                for (var i = 0; i < pocetSpravnych.length; i++) {
                    if (!pocetSpravnych[j][i]) {
                        vyhra = false;
                        break;
                    }
                }

            }

            if (vyhra == true) {
                alert("Úspešne si zložil puzzle");

                clearTimeout(t);
            }

            console.log(pocetSpravnych);
        }


    });

    fabric.Image.fromURL('./images/obr2.jpg', function (img) {

        img.scaleToWidth(460);
        var patternSourceCanvas = new fabric.StaticCanvas();
        patternSourceCanvas.add(img);
        patternSourceCanvas.renderAll();
        canvas.selection = false;

        for (var i = 0; i < aktHra.dieliky.length; i++) {

            var polygon = aktHra.dieliky[i].points.map(p => {
                return {x: aktHra.points[p].x, y: aktHra.points[p].y}
            });

            var pattern = new fabric.Pattern({
                source: function () {
                    patternSourceCanvas.setDimensions({
                        width: img.getScaledWidth() + padding,
                        height: img.getScaledHeight() + padding
                    });

                    patternSourceCanvas.renderAll();
                    return patternSourceCanvas.getElement();
                },
                repeat: 'no-repeat'

            });


            pattern.offsetX = -Math.min(polygon[0].x, polygon[1].x);
            pattern.offsetY = -polygon[0].y;

            canvas.add(new fabric.Polygon(
                polygon,
                {
                    hasControls: false,
                    left: 800,
                    fill: pattern,
                    objectCaching: false,
                    dielik: aktHra.dieliky[i]

                }));
        }

    });

})();
