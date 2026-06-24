

document.addEventListener('click', async (e) => {

    let target = e.target;

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

    else if(target.closest('#btnDismiss') || target.id == 'btnDismiss') {
        document.querySelector('#alertBanner').style.display = "none";
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

document.addEventListener('mousewheel', (e) => {

    focusPage();
})

// re-magnify the image now under the cursor while scrolling, even if the cursor is steady
window.addEventListener('scroll', (e) => {

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