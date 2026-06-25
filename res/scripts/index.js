

const supabaseUrl = 'https://cqnqfvusotfvynhabueh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnFmdnVzb3RmdnluaGFidWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NTI4NTYsImV4cCI6MjA5NzQyODg1Nn0.ZjKFSD7BEdrDK3yXvhB3-KsvEwd5phV1XZY0M_1bKik";
const msSupabase = supabase.createClient(supabaseUrl, supabaseKey);

let book_id = "1e461b89-f9f3-45a4-b36f-479ed823336d";

let pages = [];
let arrNotes = [];
let loadCursor = 0;
let loadTimer;
let boolZoom, boolAvatar = false;
let order_id, book_title, max_pages, kid_name, kid_age, kid_gender, kid_img_half, kid_img_full,
companion_name, companion_img_half, companion_img_full, arrFavs, currPage;


async function initBookData() {

    let { data, error } = await msSupabase
    .from("table_book_main")
    .select(`*`)
    .eq("book_id", book_id)

    order_id = data[0].order_id;
    book_title = data[0].book_title;
    max_pages = data[0].max_pages;


    await initAvatarData();
}
initBookData();

async function initAvatarData() {

    let { data, error } = await msSupabase
    .from("table_avatars")
    .select(`*`)
    .eq("book_id", book_id)

    kid_name = data[0].kid_name;
    kid_age = data[0].kid_age;
    kid_gender = data[0].kid_gender;
    kid_img_half = data[0].kid_img_half;
    kid_img_full = data[0].kid_img_full;
    companion_name = data[0].companion_name;
    companion_img_half = data[0].companion_img_half;
    companion_img_full = data[0].companion_img_full;

    loadAvatar();
    await initPagesData();
}

function loadAvatar() {

    let divAvatarHeader = document.querySelector('.divAvatarHeader');
    let divGender = document.querySelector('#divGender');
    let divAvatarBody = document.querySelector('.divAvatarBody');

    if(kid_gender == 'male') {
        divGender.children[0].style.display = "flex";
        divGender.children[1].style.display = "none";
    }
    else {
        divGender.children[0].style.display = "none";
        divGender.children[1].style.display = "flex";
    }

    divAvatarHeader.children[1].textContent = kid_name.toUpperCase();
    divAvatarHeader.children[3].textContent = kid_age + ' YEARS OLD'

    kid_img_half? divAvatarBody.children[0].innerHTML =  `<img src ="${kid_img_half}">`: null;
    kid_img_full? divAvatarBody.children[1].innerHTML = `<img src ="${kid_img_full}">`: null;
    companion_img_half? divAvatarBody.children[2].innerHTML = `<img src ="${companion_img_half}">`: null;
    companion_img_full? divAvatarBody.children[3].innerHTML = `<img src ="${companion_img_full}">`: null;

}

async function initPagesData() {

    let { data, error } = await msSupabase
    .from("table_pages")
    .select(`image_url`)
    .eq("book_id", book_id)
    .eq("page", 0);

    pages[0] = data[0].image_url;

    for(a = 1; a < max_pages + 1 ; a++) {
        pages[a] = `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/sample_images/${book_id}/${a}.png`
    }

    await initFavorites();
    await initNotes();
    resetOptPages();
}

async function initFavorites() {

    let { data, error } = await msSupabase
    .from("table_favorites")
    .select(`design_review_fav`)
    .eq("book_id", book_id)

    arrFavs = data[0].design_review_fav ? JSON.parse(data[0].design_review_fav) : [];

    initUI();
}

async function initNotes() {

    let { data } = await msSupabase
    .from("table_notes")
    .select("page, design_review_notes")
    .eq("book_id", book_id);

    arrNotes = [];

    if(data) {
        data.forEach(row => arrNotes[row.page] = row.design_review_notes || "");
    }
}

function initUI() {

    document.title = order_id + ` - Design Review`;
    document.querySelector('#bookTitle').textContent = book_title.toUpperCase();
    document.querySelector('#orderID').textContent = `ORDER ID: ${order_id}`;

    let book = localData(book_title, kid_name);
    let fonts = book.fonts;

    if(!document.head.innerHTML.includes(book.fonts)) {
        document.head.insertAdjacentHTML('beforeend', book.fonts);
    }

    document.fonts.ready.then(() => createCoverPage());
}

function createCoverPage() {

    let append = "";
    let main = document.querySelector('main');
    let book = localData(book_title, kid_name);

    let page_text = book.pages;
    let page_type = book.page_type.split(', ');
    let text_position = book.text_position.split(', ');

    main.firstElementChild.innerHTML =
    `<div id="coverBack">
        ${book.pages['coverBack']}
    </div>
    <div id="coverFront">
        ${book.pages['coverFront']}
    </div>`

    for(let a = 1; a <= max_pages; a++) {
        append +=
        `<div class="divRegularPage" data-page="${a}" data-textposition="${text_position[a-1]}" data-pagetype="${page_type[a-1]}" data-shade="true"></div>`
    }

    main.insertAdjacentHTML('beforeend', append);

    checkPageIfComplete(main.firstElementChild, 0)

    focusPage();
    initSettings();
}

function focusPage() {

    let main = document.querySelector('main');
    let book = localData(book_title, kid_name);
    let page_reference = book.references;
    let valPage = document.querySelector('#valPage')
    let focusBox = document.querySelector('#focusBox');
    let focusBoxT = focusBox.getBoundingClientRect().top;
    let focusBoxB = focusBox.getBoundingClientRect().bottom;
    let divAvatarBody = document.querySelectorAll('.divAvatarBody')[1];

    for(let a = 0; a <= max_pages; a++) {

        if(main.children[a] != null || main.children[a] != undefined && a != currPage) {

            let focusPage = main.children[a];
            let focusPageT = focusPage.getBoundingClientRect().top;
            let focusPageB = focusPage.getBoundingClientRect().bottom;
            let focusPageM = focusPage.getBoundingClientRect().top + focusPage.getBoundingClientRect().height / 2;

            let boolTop = (focusPageT > focusBoxT) && (focusPageT < focusBoxB);

            let boolBottom = (focusPageB > focusBoxT) && (focusPageB < focusBoxB);

            let boolMiddle = (focusPageM > focusBoxT) && (focusPageM < focusBoxB);

            if((boolTop && boolMiddle) || (boolBottom && boolMiddle) || boolMiddle) {

                let starColor = arrFavs.includes(a) ? "#FFE100" : "#333333";
                document.querySelector('#btnStar svg path').setAttribute("fill", starColor);

                if(a == 0) {
                    valPage.textContent = `COVER PAGE`;
                    divAvatarBody.innerHTML = `<img src ="${page_reference[`coverFront`]}" style="height: 90%; width: auto; margin: auto;">`;
                }
                else {
                    valPage.textContent = `PAGE ${a}`;
                    divAvatarBody.innerHTML = `<img src ="${page_reference[`page${a}`]}" style="height: 90%; width: auto; margin: auto;">`;
                }

                currPage = a;

            }
        }
    }

}

function createRegularPage(i) {

    let append = "";
    let main = document.querySelector('main');
    let book = localData(book_title, kid_name);
    let text_position = main.children[i].dataset.textposition;
    let page_type = main.children[i].dataset.pagetype;
    let page_text = book.pages;


    if(i >= 1 && i <= max_pages && main.children[i].childElementCount == 0) {

        if(text_position == "L") {

            append =
            `<div class="pageL" style = "position: relative;">
                <img src ="https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/books/${book_title.replaceAll(' ', '_').toLowerCase()}/${i}.png" fetchpriority="high" style="position: relative;">
                <div class = "textGradient" style="background: linear-gradient(to right, rgba(0,0,0,1), transparent); "></div>
                ${page_text[`page${i}`]}
            </div>
            <div class="pageR">
                <img src = "${pages[i]}">
            </div>`
        }

        else {

            append=
            `<div class="pageL">
                <img src = "${pages[i]}">
            </div>
            <div class="pageR" style = "position: relative;">
                <img src ="https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/books/${book_title.replaceAll(' ', '_').toLowerCase()}/${i}.png" fetchpriority="high" style="position: relative;">
                <div class = "textGradient" style="background: linear-gradient(to left, rgba(0,0,0,1), transparent);"></div>
                ${page_text[`page${i}`]}
            </div>`
        }

        main.children[i].innerHTML = append;

        applyTextPage(main.children[i]);

        checkPageIfComplete(main.children[i], i);
    }

    else {
        return;
    }
}

function checkPageIfComplete(page, i) {

    let boolComplete = [...page.querySelectorAll('img')]
    .every(img => img.complete);

    if(!boolComplete) {

        setTimeout(() => checkPageIfComplete(page, i), 1000);

    }
    else {

        if(page.id == "divCoverPage") {

            page.querySelectorAll('div').forEach((div) => {
                div.style.visibility = "visible";
            })

            createRegularPage(1);
        }
        else {

            page.querySelector('.textWrapper').style.visibility = 'visible';

            i + 1 <= max_pages? i++ : i = i;

            createRegularPage(i);
        }
    }
}

function copyOrderID() {

  let orderID = this.previousElementSibling?.textContent?.split(": ")[1].trim();

  navigator.clipboard.writeText(orderID);
}

function resetOptPages () {

    let append = "";
    let page_type = localData(book_title, kid_name).page_type.split(', ');

    for(let a = 0; a <= max_pages; a++) {

        let pagecount = `PAGE ${a}`;
        let starColor = arrFavs.includes(a) ? "#FFE100" : "#333333";
        let favClass = arrFavs.includes(a) ? " fav" : "";
        let typeAttr = a >= 1 ? ` data-pagetype="${page_type[a-1]}"` : "";

        if(a == 0) {
            pagecount  = `COVER PAGE`;
        }

        append +=
        `<div class="optPages${favClass}"${typeAttr}>
            <div class="contStar">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.87145 0.492998C6.25809 -0.164341 7.2087 -0.164341 7.59535 0.492999L9.11293 3.07306C9.25376 3.31249 9.48783 3.48255 9.75906 3.5425L12.6818 4.18853C13.4265 4.35312 13.7202 5.2572 13.2145 5.82805L11.2297 8.06864C11.0455 8.27657 10.9561 8.55173 10.9829 8.82821L11.2717 11.8075C11.3452 12.5666 10.5762 13.1254 9.877 12.8208L7.13273 11.6255C6.87806 11.5146 6.58874 11.5146 6.33407 11.6255L3.58979 12.8208C2.89062 13.1254 2.12156 12.5666 2.19513 11.8075L2.4839 8.82821C2.5107 8.55173 2.4213 8.27657 2.23711 8.06864L0.252278 5.82805C-0.25341 5.2572 0.0403444 4.35312 0.784992 4.18853L3.70774 3.5425C3.97897 3.48255 4.21304 3.31249 4.35386 3.07306L5.87145 0.492998Z" fill="${starColor}"/>
                </svg>
            </div>
            <h1 class="h1muted">${pagecount}</h1>
            <div style="width: 20px; height: 100%;"></div>
        </div>`
    }

    document.querySelector('#dropdown').innerHTML = append;
}

function setCheckbox(opt) {

    let chk = opt.querySelector('.chkSettings');

    if(opt.dataset.toggle == "true") {
        chk.style.background = "var(--theme-light-color)";
        chk.innerHTML = `<h1 class="h1sharp" style="margin:auto">✔</h1>`;
    }
    else {
        chk.style.background = "var(--bg)";
        chk.innerHTML = ``;
    }
}

function toggleHotkeys(opt) {

    opt.dataset.toggle = opt.dataset.toggle == "true" ? "false" : "true";

    setCheckbox(opt);

    applyHotkeys();
}

function applyHotkeys() {

    let show = document.querySelector('#chkHotkeys').closest('.optSettings').dataset.toggle == "true";
    document.querySelectorAll('.hotkey').forEach(badge => badge.style.display = show ? "flex" : "none");
}

function toggleSettings() {

    let divSettings = document.querySelector('#divSettings');
    divSettings.dataset.toggle = divSettings.dataset.toggle == "true" ? "false" : "true";

    let on = divSettings.dataset.toggle == "true";

    divSettings.style.width = on ? "415px" : "";
    divSettings.style.borderColor = on ? "var(--theme-med)" : "";
    document.querySelector('#btnSettings svg').style.transform = on ? "rotate(180deg)" : "rotate(0deg)";

}

function initSettings() {
    document.querySelectorAll('.optSettings').forEach(opt => setCheckbox(opt));
    applyFillerPages();
    applyTextPages();
    applyHotkeys();
}

function toggleFillerPages(opt) {
    opt.dataset.toggle = opt.dataset.toggle == "true" ? "false" : "true";
    setCheckbox(opt);
    applyFillerPages();
}

function applyFillerPages() {
    let show = document.querySelector('#chkFillerPages').closest('.optSettings').dataset.toggle == "true";
    let main = document.querySelector('main');
    let dropdown = document.querySelector('#dropdown');

    for(let a = 1; a <= max_pages; a++) {
        let hide = !show && main.children[a].dataset.pagetype != 'A';

        main.children[a].style.display = hide ? "none" : "";

        if(dropdown.children[a]) dropdown.children[a].style.display = hide ? "none" : "";
    }
}

function toggleTextPages(opt) {
    opt.dataset.toggle = opt.dataset.toggle == "true" ? "false" : "true";
    setCheckbox(opt);
    applyTextPages();
}

function applyTextPages() {
    let main = document.querySelector('main');

    for(let a = 1; a <= max_pages; a++) {
        applyTextPage(main.children[a]);
    }
}

function applyTextPage(page) {

    let show = document.querySelector('#chkTextPages').closest('.optSettings').dataset.toggle == "true";

    let textHalf = page.dataset.textposition == "L" ? page.querySelector('.pageL') : page.querySelector('.pageR');

    if(textHalf) textHalf.style.display = show ? "" : "none";

    page.style.width = show ? "" : "700px";
}

function goToPage() {

    let main = document.querySelector('main');
    let i = this.querySelector('h1').textContent;

    if(i == 'COVER PAGE') {
        i = 0;
    }
    else {
        i = Number(i.replace("PAGE ", ''));
    }

    let offset = 128;

    main.scrollTo({
        top: main.children[i].offsetTop - offset,
        behavior: "instant"
    });

    createRegularPage(i);
    focusPage();

}

async function updateFavorites() {

    if(arrFavs.includes(currPage)) {
        arrFavs = arrFavs.filter(item => item !== currPage);
    }
    else {
        arrFavs.push(currPage);
    }

    resetOptPages();

    let starColor = arrFavs.includes(currPage) ? '#FFE100' : '#333333';
    let starFilter = arrFavs.includes(currPage) ? 'none' : 'brightness(500%)';
    document.querySelector('#btnStar svg path').setAttribute("fill", starColor);
    document.querySelector('#btnStar svg path').style.filter = starFilter;

    let { data, error } = await msSupabase
    .from("table_favorites")
    .update({
        design_review_fav: JSON.stringify(arrFavs)
    })
    .eq("book_id", book_id)

}

function toggleZoom() {

    if(this.dataset.toggle == "false") {
        boolZoom = true;
        this.dataset.toggle = "true";
        this.style.background = "var(--theme-light)";

    }
    else {
        boolZoom = false;
        this.dataset.toggle = "false";
        this.style.background = "transparent";
        hideZoom();
    }
}

let zoomFactor = 2;
let zoomSource = null;
let zoomClone  = null;
let lensRadius = 75;
let cursorX = 0, cursorY = 0;
let zoomFrame = 0;

function setZoomSource(img) {

    let divZoom = document.querySelector('#divZoom');
    let imgBox = img.getBoundingClientRect();

    if(!zoomClone || zoomClone.src !== img.src) {
        divZoom.replaceChildren();
        zoomClone = img.cloneNode(true);
        divZoom.appendChild(zoomClone);
    }

    zoomClone.style.width  = imgBox.width  * zoomFactor + 'px';
    zoomClone.style.height = imgBox.height * zoomFactor + 'px';
    lensRadius = divZoom.offsetWidth / 2;
    zoomSource = img;
}

function updateZoom() {

    if(!boolZoom) {
        hideZoom();
        return;
    }

    let underCursor = document.elementFromPoint(cursorX, cursorY);

    let imageHolder = underCursor?.closest('#coverFront, .pageL, .pageR');
    let zoomTarget = imageHolder ? imageHolder.querySelector('img') : underCursor;

    if(zoomTarget && zoomTarget.tagName === "IMG") {

        if(zoomTarget !== zoomSource) {

            let divZoom = document.querySelector('#divZoom');
            divZoom.style.display = "block";

            setZoomSource(zoomTarget);
        }
        renderZoom();
    }
    else {
        hideZoom();
    }
}

function queueZoom() {

    if(zoomFrame) return;
    zoomFrame = requestAnimationFrame(() => {
        zoomFrame = 0;
        updateZoom();
    });
}

function renderZoom() {

    if(!zoomSource || !zoomClone) return;

    let imgBox = zoomSource.getBoundingClientRect();
    let spotX = cursorX - imgBox.left;
    let spotY = cursorY - imgBox.top;

    document.querySelector('#divZoom').style.transform = `translate(${cursorX - lensRadius}px, ${cursorY - lensRadius}px)`;

    zoomClone.style.transform = `translate(${lensRadius - spotX * zoomFactor}px, ${lensRadius - spotY * zoomFactor}px)`;
}

function hideZoom() {

    if(zoomFrame) { cancelAnimationFrame(zoomFrame); zoomFrame = 0; }
    document.querySelector('#divZoom').style.display = "none";
    zoomSource = null;
}

function toggleAvatar() {

    if(this.dataset.toggle == "false") {
        boolAvatar = true;
        this.dataset.toggle = "true";
        this.style.background = "var(--theme-light)";
        document.querySelector('#divAvatar').style.display = "flex";

        if(boolZoom) queueZoom();

        setTimeout(() => {
            document.querySelector('#divAvatar').style.opacity = 100;
            document.querySelector('#contAvatar').style.opacity = 100;
            document.querySelector('#contAvatar').style.scale = "100%";
        }, 100)

    }
    else {

        boolAvatar = false;
        this.dataset.toggle = "false";
        this.style.background = "transparent";

        document.querySelector('#divAvatar').style.opacity = 0;
        document.querySelector('#contAvatar').style.opacity = 0;
        document.querySelector('#contAvatar').style.scale = "95%";

        setTimeout(() => {
            document.querySelector('#divAvatar').style.display = "none";
            if(boolZoom) queueZoom();
        }, 100);
    }
}

function toggleShade() {

    let page = document.querySelector(`.divRegularPage[data-page="${currPage}"]`);
    if(!page) return;

    let textHalf = page.dataset.textposition == "L" ? page.querySelector('.pageL') : page.querySelector('.pageR');
    let textGradient = textHalf?.querySelector('.textGradient');
    if(!textGradient) return;

    if(page.dataset.shade == "true") {
        page.dataset.shade = "false";
        textGradient.style.visibility = "hidden";
    }
    else {
        page.dataset.shade = "true";
        textGradient.style.visibility = "visible";
    }
}

async function downloadImage() {

    let imageSource;

    if(currPage == 0) {
        imageSource = document.querySelector('#coverFront img');
    }
    else {
        let page = document.querySelector(`.divRegularPage[data-page="${currPage}"]`);
        if(!page) return;

        let imageHalf = page.dataset.textposition == "L" ? page.querySelector('.pageR') : page.querySelector('.pageL');
        imageSource = imageHalf?.querySelector('img');
    }

    if(!imageSource) return;

    let fileName = `${book_id}_${currPage}.png`;

    let response = await fetch(imageSource.src);
    let blob = await response.blob();
    let objectURL = URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.href = objectURL;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(objectURL);
}

function uploadImage() {

    let targetImage, minRatio, maxRatio, minWidth, minHeight;

    if(currPage == 0) {
        targetImage = document.querySelector('#coverFront img');
        minRatio = 1.19;
        maxRatio = 1.21;
        minWidth = 3700;
        minHeight = 3000;
    }
    else {
        let page = document.querySelector(`.divRegularPage[data-page="${currPage}"]`);
        if(!page) return;

        let imageHalf = page.dataset.textposition == "L" ? page.querySelector('.pageR') : page.querySelector('.pageL');
        targetImage = imageHalf?.querySelector('img');
        minRatio = 1.36;
        maxRatio = 1.38;
        minWidth = 3400;
        minHeight = 2500;
    }

    if(!targetImage) return;

    let fileInput = document.createElement('input');
    fileInput.type = "file";
    fileInput.accept = "image/png";

    fileInput.onchange = () => {

        let file = fileInput.files[0];
        if(!file) return;

        if(file.type != "image/png") {
            showAlert("⚠ Upload Failed: Please check the image aspect ratio and resolution");
            return;
        }

        let objectURL = URL.createObjectURL(file);
        let probe = new Image();

        probe.onload = () => {

            let aspectRatio = probe.width / probe.height;

            if(aspectRatio < minRatio || aspectRatio > maxRatio) {
                URL.revokeObjectURL(objectURL);
                showAlert("⚠ Upload Failed: Please check the image aspect ratio and resolution");
                return;
            }

            if(probe.width < minWidth || probe.height < minHeight) {
                URL.revokeObjectURL(objectURL);
                showAlert("⚠ Upload Failed: Please check the image aspect ratio and resolution");
                return;
            }

            targetImage.src = objectURL;
        };

        probe.src = objectURL;
    };

    fileInput.click();
}

function resetImage() {
    let page = document.querySelector(`.divRegularPage[data-page="${currPage}"]`);
    if(!page) return;

    let imageHalf = page.dataset.textposition == "L" ? page.querySelector('.pageR') : page.querySelector('.pageL');
    let img = imageHalf?.querySelector('img');
    if(img) img.src = pages[currPage];
}

function hideDropdown() {
    document.querySelector('#dropPages').dataset.show = "false";
    document.querySelector('#dropdown').style.visibility = "hidden";
}

function closePopups() {
    hideDropdown();
    hideContextMenu();
    hideNotes();
}

function showContextMenu(x, y) {

    hideDropdown();
    hideNotes();

    let contextMenu = document.querySelector('#contextMenu');
    contextMenu.style.display = "block";

    let posX = Math.min(x, window.innerWidth - contextMenu.offsetWidth - 4);
    let posY = Math.min(y, window.innerHeight - contextMenu.offsetHeight - 4);

    contextMenu.style.left = posX + 'px';
    contextMenu.style.top = posY + 'px';
}

function hideContextMenu() {
    document.querySelector('#contextMenu').style.display = "none";
}

function addNotes() {

    hideDropdown();
    hideContextMenu();

    let contextMenu = document.querySelector('#contextMenu');
    let divNotes = document.querySelector('#divNotes');
    let txtNotes = document.querySelector('#txtNotes');

    txtNotes.value = arrNotes[currPage] || "";

    divNotes.style.display = "block";

    let x = parseFloat(contextMenu.style.left) || 0;
    let y = parseFloat(contextMenu.style.top) || 0;

    divNotes.style.left = Math.min(x, window.innerWidth - divNotes.offsetWidth - 4) + 'px';
    divNotes.style.top = Math.min(y, window.innerHeight - divNotes.offsetHeight - 4) + 'px';
}

function hideNotes() {
    document.querySelector('#divNotes').style.display = "none";
}

function showAlert(message) {
    let alertBanner = document.querySelector('#alertBanner');
    alertBanner.querySelector('h1').textContent = message;
    alertBanner.style.display = "flex";
}

async function solveNote() {

    arrNotes[currPage] = "";
    hideNotes();

    let { error } = await msSupabase
    .from("table_notes")
    .update({ design_review_notes: "" })
    .eq("book_id", book_id)
    .eq("page", currPage);

    if(error) {
        showAlert("⚠ Saving Failed: Please try again later");
    }
}

async function saveNote() {

    let notes = document.querySelector('#txtNotes').value;

    arrNotes[currPage] = notes;
    hideNotes();

    let { data } = await msSupabase
    .from("table_notes")
    .select("page")
    .eq("book_id", book_id)
    .eq("page", currPage);

    let error;

    if(data && data.length > 0) {
        let res = await msSupabase
        .from("table_notes")
        .update({ design_review_notes: notes })
        .eq("book_id", book_id)
        .eq("page", currPage);
        error = res.error;
    }
    else {
        let res = await msSupabase
        .from("table_notes")
        .insert({ book_id: book_id, page: currPage, design_review_notes: notes });
        error = res.error;
    }

    if(error) {
        showAlert("⚠ Saving Failed: Please try again later");
    }
}










