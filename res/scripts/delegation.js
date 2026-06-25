

document.addEventListener('click', async (e) => {

    let target = e.target;

    if(!target.closest('#contextMenu')) {
        hideContextMenu();
    }

    if(!target.closest('#divNotes')) {
        hideNotes();
    }

    if(target.closest('#btnZoom') || target.id == 'btnZoom') {
        toggleZoom.call(target.closest('#btnZoom'))
    }

    else if(target.closest('#btnAvatar') || target.id == 'btnAvatar') {
        toggleAvatar.call(target.closest('#btnAvatar'))
    }

    else if(target.closest('#btnShade') || target.id == 'btnShade') {
        toggleShade();
    }

    else if(target.closest('#btnDownload') || target.id == 'btnDownload') {
        await downloadImage();
    }

    else if(target.closest('#btnUpload') || target.id == 'btnUpload') {
        uploadImage();
    }

    else if(target.closest('#btnReset') || target.id == 'btnReset') {
        resetImage();
    }

    else if(target.closest('#btnDismiss') || target.id == 'btnDismiss') {
        document.querySelector('#alertBanner').style.display = "none";
    }

    else if(target.closest('#ctxAddNotes')) {
        hideContextMenu();
        addNotes();
    }

    else if(target.closest('#ctxDownload')) {
        hideContextMenu();
        await downloadImage();
    }

    else if(target.closest('#ctxUpload')) {
        hideContextMenu();
        uploadImage();
    }

    else if(target.closest('#ctxImageReview')) {
        hideContextMenu();
        viewInImageReview();
    }

    else if(target.closest('#btnSolve')) {
        solveNote();
    }

    else if(target.closest('#btnSave')) {
        saveNote();
    }

    else if(target.closest('.optSettings')) {
        let opt = target.closest('.optSettings');
        let id = opt.querySelector('.chkSettings').id;
        if (id == 'chkFillerPages') toggleFillerPages(opt);
        else if(id == 'chkTextPages') toggleTextPages(opt);
        else if(id == 'chkHotkeys') toggleHotkeys(opt);
    }

    else if(target.closest('#btnSettings')) {
        toggleSettings();
    }

    if(target.closest('#btnCopy') || target.id == 'btnCopy') {

        copyOrderID.call(target.closest('#btnCopy'));
    }

    else if(target.closest('.optPages')) {

        goToPage.call(target.closest('.optPages'));

        target.closest('#dropPages').dataset.show = "false";
        document.querySelector('#dropdown').style.visibility = "hidden";
    }

    else if(target.closest('#btnStar') || target.id == 'btnStar') {
        await updateFavorites();
    }

    else if(target.closest('#dropPages') || target.id == 'dropPages') {

        if(target.closest('#dropPages').dataset.show == "false") {
            hideContextMenu();
            hideNotes();
            target.closest('#dropPages').dataset.show = "true";
            document.querySelector('#dropdown').style.visibility = "visible";
        }

        else {
            target.closest('#dropPages').dataset.show = "false";
            document.querySelector('#dropdown').style.visibility = "hidden";
        }
    }

    else {
        document.querySelector('#dropPages').dataset.show = "false";
        document.querySelector('#dropdown').style.visibility = "hidden";
    }

})

document.addEventListener('contextmenu', (e) => {

    let main = document.querySelector('main');
    let pageEl = e.target.closest('main > *');

    if(pageEl && pageEl === main.children[currPage]) {
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY);
    }
    else {
        closePopups();
    }
})

document.addEventListener('mousewheel', (e) => {

    focusPage();
})

window.addEventListener('scroll', (e) => {

    if(e.target.closest && e.target.closest('#dropdown, #divNotes')) return;

        closePopups();

    if(boolZoom) {

        queueZoom();

    }

}, true)

document.addEventListener('pointerover', (e) => {

    let target = e.target;

    if(target.closest('#btnStar')) {

        document.querySelector('#btnStar').style.background = "var(--theme-light)";

        if (arrFavs.includes(currPage)) {
            document.querySelector('#btnStar svg path').style.filter = "none";
            document.querySelector('#btnStar svg path').setAttribute("fill", "#FFE100");
        }
        else {
            document.querySelector('#btnStar svg path').style.filter = "brightness(500%)";
            document.querySelector('#btnStar svg path').setAttribute("fill", "#333333");
        }

    }
    else if(target.closest('.btnTools') && !target.closest('#btnApprove')) {

        target.closest('.btnTools').style.background = "var(--theme-light)";
    }
})

document.addEventListener('pointermove', (e) => {

    cursorX = e.clientX;
    cursorY = e.clientY;

    if(boolZoom) {
        queueZoom();
    }
})

document.addEventListener('pointerout', (e) => {

    let target = e.target;

    if(target.closest('#btnStar')) {

        document.querySelector('#btnStar').style.background = "var(--bg)";

        if (arrFavs.includes(currPage)) {
            document.querySelector('#btnStar svg path').style.filter = "none";
            document.querySelector('#btnStar svg path').setAttribute("fill", "#FFE100");
        }
        else {
            document.querySelector('#btnStar svg path').style.filter = "none";
            document.querySelector('#btnStar svg path').setAttribute("fill", "#333333");
        }
    }
    else if(target.closest('.btnTools') && !target.closest('#btnApprove')) {

        let btnTool = target.closest('.btnTools');
        btnTool.style.background = btnTool.dataset.toggle == "true" ? "var(--theme-light)" : "transparent";
    }
})


document.addEventListener('keydown', (e) => {

    if(e.target.matches('input, textarea')) return;

    if(e.ctrlKey && e.key == "Enter") {
        document.querySelector('#btnApprove').click();
        return;
    }
    else if(e.key == "Escape") {
        hideNotes();
        hideContextMenu();
        hideDropdown();

        btnAvatar.dataset.toggle == "true"? btnAvatar.click() : null;
    }

    let key = e.key.toUpperCase();
    if(key == '`') key = '~';

    document.querySelectorAll(`[class*='btn'], [id*='btn']`)
    .forEach(btn => {

        let label = btn.querySelector('.hotkey h1')?.textContent.trim().toUpperCase();

        if(label == key) btn.click();

    });
})