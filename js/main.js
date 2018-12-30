// pridaj tlacitku event na otvaranie kalendaru
registerOpenButton(document.getElementById("calendar-icon"));

// inicializuj menu
var menuitems = [
    {
        href: "#",
        text: "Autori",
        submenu: [
            {
                href: "#",
                text: "Denisa",
                submenu: [
                    {
                        href: "denisa_omne.html",
                        text: "O mne",
                        submenu: null
                    },
                    {
                        href: "denisa_hra.html",
                        text: "Hra",
                        submenu: null
                    }
                ]
            },
            {
                href: "#",
                text: "Martin",
                submenu: [
                    {
                        href: "martin_omne.html",
                        text: "O mne",
                        submenu: null
                    },
                    {
                        href: "martin_hra.html",
                        text: "Hra",
                        submenu: null
                    }
                ]
            },
            {
                href: "#",
                text: "Matúš",
                submenu: [
                    {
                        href: "matus_omne.html",
                        text: "O mne",
                        submenu: null
                    },
                    {
                        href: "matus_hra.html",
                        text: "Hra",
                        submenu: null
                    }
                ]
            }
        ]
    },
    {
        href: "oprojekte.html",
        text: "O projekte",
        submenu: null
    }
];
addMenuItems(menuitems);


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

// pridava prvky to  hlavnej listy menu
function addMenuItems(itemsArray) {
    let container = document.getElementById("menu-container");

    let item;
    let a;

    for(let i = 0; i < itemsArray.length; i++) {
        item = document.createElement("div");
        item.classList.add("menu-item");

        a = document.createElement("a");
        a.innerText = itemsArray[i].text;
        a.href = itemsArray[i].href;

        item.appendChild(a);
        container.appendChild(item);

        if(itemsArray[i].submenu != null) {
            addSubmenu(item, 2, itemsArray[i].submenu);
        }
    }
    
}
// rekurziva funkcia na pridavanie submenu
function addSubmenu(parentElement, layer, submenu) {

    let container = document.createElement("div");
    container.classList.add("submenu-container");
    switch(layer) {
        case 2: container.classList.add("second-layer");
            break;
        case 3: container.classList.add("third-layer");
            break;
    }
    parentElement.appendChild(container);

    let item;
    let a;
    for(let i = 0; i < submenu.length; i++) {
        item = document.createElement("div");
        item.classList.add("submenu-item");

        a = document.createElement("a");
        a.innerText = submenu[i].text;
        a.href = submenu[i].href;

        item.appendChild(a);
        container.appendChild(item);

        if(submenu[i].submenu != null) {
            addSubmenu(item, layer + 1, submenu[i].submenu);
        }

    }

}