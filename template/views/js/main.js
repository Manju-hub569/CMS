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

function chang () {
    const nm1 = document.getElementById('fields');
    nm1.style.display = 'block';

    const nm2 = document.getElementById('field');
    nm2.style.display = 'none';

    const nm3 = document.getElementById('fiel');
    nm3.style.display = 'none';
}

function change() {
    const nm1 = document.getElementById('fields');
    nm1.style.display = 'none';
    
    const nm2 = document.getElementById('field');
    nm2.style.display = 'block';

    const nm3 = document.getElementById('fiel');
    nm3.style.display = 'none';
}

function changes() {
    const nm1 = document.getElementById('fields');
    nm1.style.display = 'none';
    
    const nm2 = document.getElementById('field');
    nm2.style.display = 'none';

    const nm3 = document.getElementById('fiel');
    nm3.style.display = 'block';
}