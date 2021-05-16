function manju() {
    const man = document.getElementById('check');
    if(man.checked){
        const side = document.getElementById('sidebar');
        side.style.transform = 'translateX(0px)';
    }else {
        const side = document.getElementById('sidebar');
        side.style.transform = 'translateX(-200px)';
    }
}