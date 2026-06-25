

const supabaseUrl = 'https://cqnqfvusotfvynhabueh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnFmdnVzb3RmdnluaGFidWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NTI4NTYsImV4cCI6MjA5NzQyODg1Nn0.ZjKFSD7BEdrDK3yXvhB3-KsvEwd5phV1XZY0M_1bKik";
const msSupabase = supabase.createClient(supabaseUrl, supabaseKey);

let book_id = "1e461b89-f9f3-45a4-b36f-479ed823336d";

let pages = [];
let arrNotes = [];
let boolZoom, boolAvatar = false;
let order_id, book_title, max_pages, kid_name, kid_age, kid_gender, kid_img_half, kid_img_full, 
companion_name, companion_img_half, companion_img_full, arrFavs, currPage;

let bucketURL = `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/sample_images/${book_id}/0.png`;

/*
async function addPages() {

    //for(let a = 2; a < 22; a++) {
        await msSupabase
        .from("table_pages_2")
        .insert({
            order_id: order_id,
            book_id: book_id,
            page: 22,
            image_url: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/sample_images/${book_id}/${22}.png`
        });

    //}    
}
*/

async function initBookData() {

    let { data, error } = await msSupabase
    .from("table_book_main")
    .select(`*`)
    .eq("book_id", book_id)

    order_id = data[0].order_id;
    book_title = data[0].book_title;
    max_pages = data[0].max_pages;

    //SEARCH TEXT.JS FOR BOOKS OBJECT WITH THE SAME TITLE AND GET IT'S INDEX
    //i = books.findIndex(b => b.title === book_title);

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

// load every saved note once at startup so opening the popup reads from the cache, not supabase
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
    
    //UPDATE UI BOOKTITLE AND ORDER ID
    document.title = order_id + ` - Design Review`;
    document.querySelector('#bookTitle').textContent = book_title.toUpperCase();
    document.querySelector('#orderID').textContent = `ORDER ID: ${order_id}`;

    let book = localData(book_title, kid_name);
    let fonts = book.fonts;

    if(!document.head.innerHTML.includes(book.fonts)) {
        document.head.insertAdjacentHTML('beforeend', book.fonts);
    }

    createCoverPage();
}

function createCoverPage() {

    let main = document.querySelector('main');
    let book = localData(book_title, kid_name);
    
    let page_text = book.pages;
    let page_type = book.page_type.split(', ');
    let text_position = book.text_position.split(', ');
    
    let append = 
    `<div id="coverBack">
        ${book.pages['coverBack']}
    </div>
    <div id="coverFront">
        ${book.pages['coverFront']}
    </div>`        

    main.firstElementChild.insertAdjacentHTML('beforeend', append);

    append = "";

    for(let a = 1; a <= max_pages; a++) {
        append += `<div class="divRegularPage" data-page="${a}" data-textposition="${text_position[a-1]}" data-pagetype="${page_type[a-1]}" data-shade="true"></div>`
    }

    main.insertAdjacentHTML('beforeend', append);

    focusPage();
}

function focusPage() {

    let i;
    let main = document.querySelector('main');
    let book = localData(book_title, kid_name);
    let page_reference = book.references;
    let valPage = document.querySelector('#valPage')
    let focusBox = document.querySelector('#focusBox');
    let focusBoxT = focusBox.getBoundingClientRect().top;
    let focusBoxB = focusBox.getBoundingClientRect().bottom;
    let divAvatarBody = document.querySelectorAll('.divAvatarBody')[1];

    for(let a = 0; a <= max_pages; a++) {

        if(main.children[a] != null || main.children[a] != undefined) {

            let focusPage = main.children[a];
            let focusPageT = focusPage.getBoundingClientRect().top;
            let focusPageB = focusPage.getBoundingClientRect().bottom;
            let focusPageM = focusPage.getBoundingClientRect().top + focusPage.getBoundingClientRect().height / 2;

            //CHECK IF CURRENT PAGE TOP SIDE ENTERS THE FOCUS BOX
            let boolTop = (focusPageT > focusBoxT) && (focusPageT < focusBoxB);

            //CHECK IF CURRENT PAGE BOTTOM SIDE ENTERS THE FOCUS BOX
            let boolBottom = (focusPageB > focusBoxT) && (focusPageB < focusBoxB);

            //CHECK IF CURRENT PAGE MIDDLE PART ENTERS THE FOCUS BOX
            let boolMiddle = (focusPageM > focusBoxT) && (focusPageM < focusBoxB);

            //NOW CHECK IF THE PAGE ENTERS TOP AND MID OR BOTTOM AND MID (DOMINATES THE FOCUS BOX AT 50%)
            if((boolTop && boolMiddle) || (boolBottom && boolMiddle) || boolMiddle) {

                let starColor = arrFavs.includes(a) ? "#FFE100" : "#333333";
                document.querySelector('#btnStar svg path').setAttribute("fill", starColor);
                
                if(a == 0) {
                    valPage.textContent = `COVER PAGE`;
                    //update page reference based on current page
                    divAvatarBody.innerHTML = `<img src ="${page_reference[`coverFront`]}" style="height: 90%; width: auto; margin: auto;">`;
                }
                else {
                    valPage.textContent = `PAGE ${a}`;
                    //update page reference based on current page
                    divAvatarBody.innerHTML = `<img src ="${page_reference[`page${a}`]}" style="height: 90%; width: auto; margin: auto;">`;
                }
    
                currPage = a;
                //createpage downward
                a + 1 <= max_pages? i = a + 1: i = a;

                createRegularPage(i);

                //createpage upward
                a - 1 > 0? i = a - 1: i = a;
                createRegularPage(i);

                break;
            }
        }
    }

}

function createRegularPage(i) {
    
    let append = "";
    let main = document.querySelector('main');
    let book = localData(book_title, kid_name);
    let text_position = book.text_position.split(', ');
    let page_type = book.page_type.split(', ');
    let page_text = book.pages;

    if(main.children[i].innerHTML == "") {

        if(text_position[i-1] == "L") {

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

        main.children[i].insertAdjacentHTML('beforeend', append);

    }
}

function copyOrderID() {
   
  let orderID = this.previousElementSibling?.textContent?.split(": ")[1].trim();

  navigator.clipboard.writeText(orderID);
}

function resetOptPages () {

    let append = "";

    for(let a = 0; a <= max_pages; a++) {

        let pagecount = `PAGE ${a}`;
        let starColor = arrFavs.includes(a) ? "#FFE100" : "#333333";
        let favClass = arrFavs.includes(a) ? " fav" : "";

        if(a == 0) {
            pagecount  = `COVER PAGE`;
        }

        append +=
        `<div class="optPages${favClass}">
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

function goToPage() {

    let main = document.querySelector('main');
    let i = this.querySelector('p').textContent;

    if(i == 'COVER PAGE') {
        i = 0;
    }
    else {
        i = Number(i.replace("PAGE ", ''));
    }

    let offset = 100;

    main.scrollTo({
        top: main.children[i].offsetTop - offset,
        behavior: "instant"
    });

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

    // these holders can stack layers (gradient/text) over their image, so always
    // inspect the first image child rather than whatever sits on top under the cursor
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
        setTimeout(() => {
            document.querySelector('#divAvatar').style.opacity = 100;
            document.querySelector('#contAvatar').style.opacity = 100;
            document.querySelector('#contAvatar').style.scale = "100%";
        }, 50)
        
    }
    else {
        boolAvatar = false;
        this.dataset.toggle = "false";
        this.style.background = "transparent";
    
        document.querySelector('#divAvatar').style.opacity = 0;
        document.querySelector('#contAvatar').style.opacity = 0;
        document.querySelector('#contAvatar').style.scale = "105%";

        setTimeout(() => {
            document.querySelector('#divAvatar').style.display = "none";
        }, 100);

        

    }
}

function toggleShade() {

    let page = document.querySelector(`.divRegularPage[data-page="${currPage}"]`);
    if(!page) return;   // cover page has no text gradient to shade

    // the text (and its gradient) lives in pageL when textposition is "L", otherwise pageR
    let textHalf = page.dataset.textposition == "L" ? page.querySelector('.pageL') : page.querySelector('.pageR');
    let textGradient = textHalf?.querySelector('.textGradient');
    if(!textGradient) return;   // page has no text layer

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
        // cover page: download the kid's image, which is the first child image of #coverFront
        imageSource = document.querySelector('#coverFront img');
    }
    else {
        let page = document.querySelector(`.divRegularPage[data-page="${currPage}"]`);
        if(!page) return;

        // the image-only half is the opposite of the text half: "L" -> pageR, otherwise pageL
        let imageHalf = page.dataset.textposition == "L" ? page.querySelector('.pageR') : page.querySelector('.pageL');
        imageSource = imageHalf?.querySelector('img');
    }

    if(!imageSource) return;

    let fileName = `${book_id}_${currPage}.png`;

    // fetch as a blob so the custom filename sticks (the download attribute is ignored for cross-origin urls)
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
        // cover page: replace the kid's image (first child image of #coverFront)
        targetImage = document.querySelector('#coverFront img');
        minRatio = 1.19;
        maxRatio = 1.21;
        minWidth = 3700;
        minHeight = 3000;
    }
    else {
        let page = document.querySelector(`.divRegularPage[data-page="${currPage}"]`);
        if(!page) return;

        // replace the image-only half (opposite of the text half): "L" -> pageR, otherwise pageL
        let imageHalf = page.dataset.textposition == "L" ? page.querySelector('.pageR') : page.querySelector('.pageL');
        targetImage = imageHalf?.querySelector('img');
        minRatio = 1.36;
        maxRatio = 1.38;
        minWidth = 3400;
        minHeight = 2500;
    }

    if(!targetImage) return;

    // open a dialog limited to a single png
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

        // read the natural dimensions so we can validate aspect ratio + resolution before swapping it in
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

function hideDropdown() {
    document.querySelector('#dropPages').dataset.show = "false";
    document.querySelector('#dropdown').style.visibility = "hidden";
}

// close every popup (dropdown, context menu, notes) — only one may be open at a time
function closePopups() {
    hideDropdown();
    hideContextMenu();
    hideNotes();
}

function showContextMenu(x, y) {

    hideDropdown();   // only one popup open at a time
    hideNotes();

    let contextMenu = document.querySelector('#contextMenu');
    contextMenu.style.display = "block";   // make it measurable before clamping

    // keep the menu inside the viewport
    let posX = Math.min(x, window.innerWidth - contextMenu.offsetWidth - 4);
    let posY = Math.min(y, window.innerHeight - contextMenu.offsetHeight - 4);

    contextMenu.style.left = posX + 'px';
    contextMenu.style.top = posY + 'px';
}

function hideContextMenu() {
    document.querySelector('#contextMenu').style.display = "none";
}

function addNotes() {

    hideDropdown();        // only one popup open at a time
    hideContextMenu();

    let contextMenu = document.querySelector('#contextMenu');
    let divNotes = document.querySelector('#divNotes');
    let txtNotes = document.querySelector('#txtNotes');

    // pull this page's note from the local cache — no supabase round-trip, no flicker
    txtNotes.value = arrNotes[currPage] || "";

    divNotes.style.display = "block";   // make it measurable before clamping

    // open where the context menu was, clamped so the wider window still fits the viewport
    let x = parseFloat(contextMenu.style.left) || 0;
    let y = parseFloat(contextMenu.style.top) || 0;

    divNotes.style.left = Math.min(x, window.innerWidth - divNotes.offsetWidth - 4) + 'px';
    divNotes.style.top = Math.min(y, window.innerHeight - divNotes.offsetHeight - 4) + 'px';
}

function hideNotes() {
    document.querySelector('#divNotes').style.display = "none";
}

// show the pink banner with a message (the warning triangle is part of the message string)
function showAlert(message) {
    let alertBanner = document.querySelector('#alertBanner');
    alertBanner.querySelector('h1').textContent = message;
    alertBanner.style.display = "flex";
}

async function solveNote() {

    arrNotes[currPage] = "";   // cache locally first, then clear the row in supabase
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

    arrNotes[currPage] = notes;   // cache locally first, then persist to supabase
    hideNotes();

    // does a row already exist for this book + page?
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

function viewInImageReview() {
    // TODO: open the current page in Image Review (currPage)
}









