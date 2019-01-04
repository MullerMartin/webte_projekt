/*
var flags = {
    sk: "\u{1f1f8}\u{1f1f0}",
    cz: "\u{1f1e8}\u{1f1ff}",
    hu: "\u{1f1ed}\u{1f1fa}",
    pl: "\u{1f1f5}\u{1f1f1}",
    at: "\u{1f1e6}\u{1f1f9}"
}
*/
var flags = {
    sk: "SK",
    cz: "CZ",
    hu: "HU",
    pl: "PL",
    at: "AT"
}

/* ============================== */
/* === pridaj kalendar do DOM === */
/* ============================== */
appendCalendar();
setCalendarToCurrentDate();

/* ===================== */
/* ===== FUNCTIONS ===== */
/* ===================== */
function createCalendar() {
    let calendar = document.createElement("div");
    calendar.classList.add("calendar-sidemenu");
    calendar.id = "calendar-sidemenu";

    let calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendar-content-container");
    calendar.appendChild(calendarContainer);

    // first row
    let row = document.createElement("div");
    row.classList.add("row", "row-first");

    let xicon = document.createElement("div");
    xicon.classList.add("calendar-button");
    xicon.id = "x-icon";
    xicon.addEventListener("click", () => {
        document.getElementById("calendar-sidemenu").style.width = "0px";
    });

    let xiconimg = document.createElement("img");
    xiconimg.src = "images/xicon.svg";
    xicon.appendChild(xiconimg);
    row.appendChild(xicon);

    calendarContainer.appendChild(row);

    // horizontal line
    let hl = document.createElement("div");
    hl.classList.add("hl");
    calendarContainer.appendChild(hl);

    // second row
    row = document.createElement("div");
    row.classList.add("row", "row-second");
    calendarContainer.appendChild(row);

    let span = document.createElement("span");
    span.innerText = "Deň:";
    let input = document.createElement("input");
    input.classList.add("calendar-input");
    input.type = "number";
    input.min = "1";
    input.max = "31";
    input.disabled="disabled"
    input.id = "input-day";
    span.appendChild(input);
    row.appendChild(span);

    span = document.createElement("span");
    span.innerText = "Mesiac:";
    input = document.createElement("input");
    input.classList.add("calendar-input");
    input.type = "number";
    input.min = "1";
    input.max = "12";
    input.disabled="disabled"
    input.id = "input-month";
    span.appendChild(input);
    row.appendChild(span);

    let button = document.createElement("div");
    button.classList.add("calendar-button", "tooltip-parent");
    button.id = "search-date-button";
    row.appendChild(button);

    let p = document.createElement("p");
    p.innerText = "Vyhľadaj";
    button.appendChild(p);
    let tooltip = document.createElement("div");
    tooltip.id = "date-tooltip";
    tooltip.classList.add("calendar-tooltip");
    button.appendChild(tooltip);
    p = document.createElement("p");
    p.innerText = "Nesprávny dátum alebo formát";
    tooltip.appendChild(p);

    // third row
    row = document.createElement("div");
    row.classList.add("row", "row-third");
    calendarContainer.appendChild(row);

    let box = document.createElement("div");
    box.id = "day-box";
    row.appendChild(box);
    p = document.createElement("p");
    p.id = "day";
    box.appendChild(p);

    let bbox = document.createElement("div");
    bbox.id = "dayinfo-box";
    row.appendChild(bbox);

    box = document.createElement("div");
    box.id = "day-name-box";
    bbox.appendChild(box);
    p = document.createElement("p");
    p.id = "dayname";
    box.appendChild(p);

    box = document.createElement("div");
    box.id = "month-box";
    bbox.appendChild(box);
    p = document.createElement("p");
    p.id = "month";
    box.appendChild(p);

    box = document.createElement("div");
    box.id = "year-box";
    bbox.appendChild(box);
    p = document.createElement("p");
    p.id = "year";
    box.appendChild(p);

    // fourth row
    row = document.createElement("div");
    row.classList.add("row", "row-header");
    calendarContainer.appendChild(row);
    p = document.createElement("p");
    p.innerText = "Meniny";
    row.appendChild(p);

    row = document.createElement("div");
    row.classList.add("row", "result-container");
    row.id = "search-results-names";
    calendarContainer.appendChild(row);

    // fifth row
    row = document.createElement("div");
    row.classList.add("row", "row-header");
    calendarContainer.appendChild(row);
    p = document.createElement("p");
    p.innerText = "Sviatky";
    row.appendChild(p);

    row = document.createElement("div");
    row.classList.add("row", "result-container");
    row.id = "search-results-holidays";
    calendarContainer.appendChild(row);

    // horizontal line
    hl = document.createElement("div");
    hl.classList.add("hl");
    calendarContainer.appendChild(hl);

    // sixth row
    row = document.createElement("div");
    row.classList.add("row");
    calendarContainer.appendChild(row);
    p = document.createElement("p");
    p.innerText = "Vyhľadávanie dňa podľa menín";
    row.appendChild(p);

    row = document.createElement("div");
    row.classList.add("row");
    calendarContainer.appendChild(row);

    span = document.createElement("span");
    span.innerText = "Meno:";
    row.appendChild(span);
    input = document.createElement("input");
    input.classList.add("calendar-input");
    input.id = "input-name";
    input.type = "text";
    span.appendChild(input);
    button = document.createElement("div");
    button.classList.add("calendar-button");
    button.id = "search-name-button";
    row.appendChild(button);
    p = document.createElement("p");
    p.innerText = "Vyhľadaj";
    button.appendChild(p);

    row = document.createElement("div");
    row.classList.add("row", "result-container");
    row.id = "search-results-days";
    calendarContainer.appendChild(row);

    // name description box
    div = document.createElement("div");
    div.classList.add("calendar-description-row");
    div.id = "name-description-box";
    div.addEventListener("click", () => {
        div.style.display = "none";
    });
    calendar.appendChild(div);

    return calendar;
}

var calendarExists = false;
function appendCalendar() {
    if(calendarExists) {
        console.error("Error: calendar already appended to this page");
        return;
    }

    document.body.appendChild(createCalendar());
    document.getElementById("x-icon").addEventListener("click", () => {
        document.getElementById("calendar-sidemenu").style.width = "0px";
    });
}

function registerOpenButton(button) {
    button.addEventListener("click", () => {
        document.getElementById("calendar-sidemenu").style.width = "400px";
    });
}

function constructResultItem(flag, text) {
    let resultitem = document.createElement("div");
    resultitem.classList.add("result");

    let span = document.createElement("span");
    span.classList.add("result-flag");
    span.innerText = flags[flag];
    resultitem.appendChild(span);
    span = document.createElement("span");
    span.classList.add("result-text");
    span.innerText = text;
    resultitem.appendChild(span);

    return resultitem;
}

/* ========================= */
/* ====== TODO Denisa ====== */
/* ========================= */
function setCalendarToCurrentDate() {
	var datum = new Date();
	var day = datum.getDate();
	var month = datum.getMonth()+1;
	var year = datum.getFullYear();
        setDate(day, month, year);
	setName(day, month);

}

function setName(day, month){
	
	var den = parseInt(day);
	var mesiac = parseInt(month);
	
	if(mesiac<10) mesiac = 0+""+mesiac;
	if(den < 10) den = 0 + "" + den;
	var datum = mesiac +""+ den;
	var posun = 1;
	if(mesiac === 12 && parseInt(den) < 26) {
		posun = 0;
	}
	if(mesiac === 12 && parseInt(den) >= 26){
		 posun = 4;
	}
	else if(mesiac === 11 ){
		posun = 2;
	} else if(mesiac >4 ){
		 posun = 2;
	}

	
		
	$.ajax( {
             url:'meniny.xml',
             dataType:'xml',
             success:function(data) {

                var menoSK = data.getElementsByTagName("SK");
                var menoCZ = data.getElementsByTagName("CZ");		
                var menoHU = data.getElementsByTagName("HU");		
                var menoPL = data.getElementsByTagName("PL");		
                var menoAT = data.getElementsByTagName("AT");	
				var sviatkySK = data.getElementsByTagName("SKsviatky");
				var sviatkyCZ = data.getElementsByTagName("CZsviatky"); 

				var dat = data.getElementsByTagName("den");
				 
				for(var i=0;i<366;i++){

					if(dat[i].childNodes[0].nodeValue === datum){
					    addNamesdayResult("sk", menoSK[(i-posun)].childNodes[0].nodeValue);
					    //addNamesdayResult("cz", menoCZ[(i-posun)].childNodes[0].nodeValue);
					    //addNamesdayResult("hu", menoHU[(i-posun)].childNodes[0].nodeValue);
					    //addNamesdayResult("pl", menoPL[(i-posun)].childNodes[0].nodeValue);
					    //addNamesdayResult("at", menoAT[(i-posun)].childNodes[0].nodeValue);

						if(sviatkySK[(i-posun)] != undefined ){
						addHolidayResult("sk", sviatkySK[(i-posun)].childNodes[0].nodeValue);
						}
						if(sviatkyCZ[(i-posun-5)] != undefined ){
							addHolidayResult("cz", sviatkyCZ[(i-posun-5)].childNodes[0].nodeValue);
						}
					}
				}

            }
          });
	
	
}

function findDate(str){
          str = str.toLowerCase();
          $.ajax( {
             url:'meniny.xml',
             dataType:'xml',
             success:function(data) {

				var posun = 1;
                var meno = data.getElementsByTagName("SK");
				var dat = data.getElementsByTagName("den");
				var str1;
				for(var i=0;i<362;i++){

					if(i>355)posun = 4;
					else if(i>303)posun = 3;
					else if(i>119) posun = 2;
					str1 = diakritika(meno[i].childNodes[0].nodeValue);
					var str2 = str1.split(", ");
					var lng = str2.length;
					for(var j = 0;j<lng;j++){
						if(str2[j]===str){
							var den;
							var mes;
							var datum = dat[i+posun].childNodes[0].nodeValue;
							mes = datum[0]+datum[1];
							den = datum[2]+""+datum[3];
							console.log(den);
							console.log(mes);
							setDate(den, parseInt(mes), 2019);
							clearNamesdayResults();
							clearHolidayResults();
							setName(den, parseInt(mes));



						}
					}
				}

             }
          });
}

function diakritika(s){
    var r=s.toLowerCase();
   // r = r.replace(new RegExp(/\s/g),"");
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/ľ/g),"l");
  	r = r.replace(new RegExp(/š/g),"s");
  	r = r.replace(new RegExp(/č/g),"c");
  	r = r.replace(new RegExp(/ť/g),"t");
  	r = r.replace(new RegExp(/ž/g),"z");
  	r = r.replace(new RegExp(/ý/g),"y");
  	r = r.replace(new RegExp(/á/g),"a");
  	r = r.replace(new RegExp(/í/g),"i");
  	r = r.replace(new RegExp(/é/g),"e");
  	r = r.replace(new RegExp(/ú/g),"u");
  	r = r.replace(new RegExp(/ň/g),"n");
  	r = r.replace(new RegExp(/ô/g),"o");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    r = r.replace(new RegExp(/[ýÿ]/g),"y");
    //r = r.replace(new RegExp(/\W/g),"");
    return r;
};

// tu som nejake funckie spravil co mozes pouzit

// prida, resp. odstrani vsetky result elementy z kontajnera vysledkov pre meniny
// to description je z toho xml dokumentu ta polozka <SKd> napriklad
function addNamesdayResult(flag, text, description) {
    let result = constructResultItem(flag, text);

    if(description != null) {
        result.classList.add("clickable");
        let nameDescriptionBox = document.getElementById("name-description-box");

        result.addEventListener("click", () => {
            nameDescriptionBox.innerText = description;
            nameDescriptionBox.style.display = "block";
        });
    }

    document.getElementById("search-results-names").appendChild(result);
}
function clearNamesdayResults() {
    let node = document.getElementById("search-results-names");

    while (node.firstChild)
        node.removeChild(node.lastChild);
}

// prida, resp. odstrani vsetky result elementy z kontajnera vysledkov pre sviatky
function addHolidayResult(flag, text) {
    let result = constructResultItem(flag, text);

    document.getElementById("search-results-holidays").appendChild(result);
}
function clearHolidayResults() {
    let node = document.getElementById("search-results-holidays");

    while (node.firstChild)
        node.removeChild(node.lastChild);
}

// prida, resp. odstrani vsetky result elementy z kontajnera vysledkov pre vyhladavanie datumu
function addDateResult(flag, text) {
    let result = constructResultItem(flag, text);

    document.getElementById("search-results-days").appendChild(result);
}
function clearDateResults() {
    let node = document.getElementById("search-results-dates");

    while (node.firstChild)
        node.removeChild(node.lastChild);
}
// zobrazi message ze ziadne meniny s takym menom sa nenasli (na odstranenie tuto vyssie funkciu pouzit)
function addNoNamesdayMessage() {
    let div = document.createElement("div");
    div.classList.add("no-results-msg");
    let p = document.createElement("p");
    p.innerText = "Nenašli sa žiadne výsledky pre zadané meno";
    div.appendChild(p);
    document.getElementById("search-results-days").appendChild(div);
}

// nastavi datum v html kalendari (uz aj vyrata aky den tyzdna by to mal byt)
function setDate(day, month, year) {
    document.getElementById("day").innerText = day;
    let monthText;
    switch(month) {
        case 1: monthText = "Januar";
            break;
        case 2: monthText = "Februar";
            break;
        case 3: monthText = "Marec";
            break;
        case 4: monthText = "April";
            break;
        case 5: monthText = "Maj";
            break;
        case 6: monthText = "Jun";
            break;
        case 7: monthText = "Jul";
            break;
        case 8: monthText = "August";
            break;
        case 9: monthText = "September";
            break;
        case 10: monthText = "Oktober";
            break;
        case 11: monthText = "November";
            break;
        case 12: monthText = "December";
            break;
    }
    document.getElementById("month").innerText = monthText;
    document.getElementById("year").innerText = year;

    day = Number(day);
    month = Number(month);
    year = Number(year);
    let dayIndex = (new Date(year, month - 1, day)).getDay();
    let dayText;
    switch(dayIndex) {
        case 0: dayText = "Nedeľa";
            break;
        case 1: dayText = "Pondelok";
            break;
        case 2: dayText = "Utorok";
            break;
        case 3: dayText = "Streda";
            break;
        case 4: dayText = "Štvrtok";
            break;
        case 5: dayText = "Piatok";
            break;
        case 6: dayText = "Sobota";
            break;
    }

    document.getElementById("dayname").innerText = dayText;
}

// vrati text co je v policku Den
function getDay() {
    return document.getElementById("input-day").value;
}
function setDay(x){
	document.getElementById("input-day") = x;
}
// vrati text co je v policku mesiac
function getMonth() {
    return document.getElementById("input-month").value;
}
function setMonth(y){
	document.getElementById("input-month") = y;
}
// vrati text co je v policku meno
function getName() {
    return document.getElementById("input-name").value;
}

// zobrazi tooltip s napovedou o zle zadanom datume (ale nekontroluje to)
function showWrongDateFormatTooltip() {
    let tooltip = document.getElementById("date-tooltip");
    tooltip.style.display = "inline-block";

    tooltip.addEventListener("click", () => {
        tooltip.style.display = "none";
    })
}



// nastavi zadanu funkciu ako obsluhu tlacitka pre vyhladavanie menin a sviatkov podla datumu
    document.getElementById("search-date-button").addEventListener("click", searchDate);


function searchDate(){
	if(getDay() && getMonth()){
		clearNamesdayResults();
		clearHolidayResults();
		setName(getDay(), getMonth());
		setDate(getDay(), parseInt(getMonth()), 2019);

	}
}

// nastavi zadanu funkciu ako obsluhu tlacitka pre vyhladavanie datumu podla menin
    document.getElementById("search-name-button").addEventListener("click", searchName);

function searchName(){
	if(getName()){
		findDate(getName());

	}
}

