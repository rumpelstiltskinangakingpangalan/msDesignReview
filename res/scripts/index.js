

const supabaseUrl = 'https://cqnqfvusotfvynhabueh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnFmdnVzb3RmdnluaGFidWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NTI4NTYsImV4cCI6MjA5NzQyODg1Nn0.ZjKFSD7BEdrDK3yXvhB3-KsvEwd5phV1XZY0M_1bKik";
const msSupabase = supabase.createClient(supabaseUrl, supabaseKey);

let book_id = "1e461b89-f9f3-45a4-b36f-479ed823336d";

let pages = [];
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

    await initPagesData();
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
    `<div id="divCoverPage" data-page="0">
        <div id="coverBack">
            ${book.pages['coverBack']}
        </div>
        <div id="coverFront">
            ${book.pages['coverFront']}
        </div>
    </div>`        

    for(let a = 1; a <= max_pages; a++) {
        append += `<div class="divRegularPage" data-page="${a}" data-textposition="${text_position[a-1]}" data-pagetype="${page_type[a-1]}"></div>`
    }

    main.insertAdjacentHTML('beforeend', append);
    focusPage();
    
}

function focusPage() {

    let i;
    let main = document.querySelector('main');
    let valPage = document.querySelector('#valPage')
    let focusBox = document.querySelector('#focusBox');
    let focusBoxT = focusBox.getBoundingClientRect().top;
    let focusBoxB = focusBox.getBoundingClientRect().bottom;

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
                
                a == 0? valPage.textContent = `COVER PAGE`: valPage.textContent = `PAGE ${a}`;
                currPage = a;
                //createpage downward
                a + 1 <= max_pages? i = a + 1: i = a;

                createRegularPage(i);

                a + 2 <= max_pages? i = a + 2: i = a;

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

        if(a == 0) {
            pagecount  = `COVER PAGE`;
        }

        append +=
        `<div class="optPages">
            <div class="contStar">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.87145 0.492998C6.25809 -0.164341 7.2087 -0.164341 7.59535 0.492999L9.11293 3.07306C9.25376 3.31249 9.48783 3.48255 9.75906 3.5425L12.6818 4.18853C13.4265 4.35312 13.7202 5.2572 13.2145 5.82805L11.2297 8.06864C11.0455 8.27657 10.9561 8.55173 10.9829 8.82821L11.2717 11.8075C11.3452 12.5666 10.5762 13.1254 9.877 12.8208L7.13273 11.6255C6.87806 11.5146 6.58874 11.5146 6.33407 11.6255L3.58979 12.8208C2.89062 13.1254 2.12156 12.5666 2.19513 11.8075L2.4839 8.82821C2.5107 8.55173 2.4213 8.27657 2.23711 8.06864L0.252278 5.82805C-0.25341 5.2572 0.0403444 4.35312 0.784992 4.18853L3.70774 3.5425C3.97897 3.48255 4.21304 3.31249 4.35386 3.07306L5.87145 0.492998Z" fill="${starColor}"/>
                </svg>
            </div>
            <p class="h1sharp">${pagecount}</p>
            <div style="width: 24px; height: 100%;"></div>
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
            divZoom.style.zIndex = 2;

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









