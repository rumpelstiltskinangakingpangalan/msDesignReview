

document.addEventListener('click', (e) => {

    let target = e.target;

    if(target.closest('#btnCopy') || target.id == 'btnCopy') {

        copyOrderID.call(target.closest('#btnCopy'));
    }

    else if(target.closest('.optPages')) {

        goToPage.call(target.closest('.optPages'));

        target.closest('#dropPages').dataset.show = "false";
        document.querySelector('#dropdown').style.visibility = "hidden";

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