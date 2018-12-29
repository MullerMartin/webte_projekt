// pridaj tlacitku event na otvaranie kalendaru
registerOpenButton(document.getElementById("calendar-icon"));

// inicializuj menu


/* ===================== */
/* ==== TODO Martin ==== */
/* ==== alebo Denisa === */
/* ===================== */
// skontroluj cookies, nastav kolkata to je navsteva
setVisitCounter(1);

/* ===================== */
/* ==== TODO Martin ==== */
/* ===================== */
// pridaj ten path-based breadcrump vec
addBreadcrumbsContainer();
addCrumbItem("Hlavna stranka", "index.html"); // toto len docasne aby nieco bolo na stranke




/* ==== useful functions ==== */
/* ========================== */
function addBreadcrumbsContainer() {
    let div = document.createElement("div");
    div.classList.add("breadcrumbs-container");
    let p = document.createElement("p");
    p.id = "breadcrumbs";
    div.appendChild(p);
    document.getElementById("content").insertBefore(div, document.getElementById("content").firstElementChild);
}
// funkcia na pridavanie poloziek do path-based breadcrumbs listy
function addCrumbItem(text, href) {
    let a = document.createElement("a");
    a.classList.add("crumb-item");
    a.innerText = text;
    a.href = href;

    if(document.getElementById("breadcrumbs").firstElementChild != null)
        document.getElementById("breadcrumbs").appendChild(document.createTextNode(">>"));

    document.getElementById("breadcrumbs").appendChild(a);
    
}
// nastavenie poctu navstev
function setVisitCounter(visits) {
    document.getElementById("counter-num").innerText = visits;
}