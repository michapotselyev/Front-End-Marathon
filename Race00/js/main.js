// HTML, CSS, JS писал Поцелуев Михаил Алексеевич, калькулятор кривой и не доделаный,
// так как мой тимейт меня кинул, сказав что свою часть(он должен был сдедать JS) он 
// не сделал, за пару часов до пуша...

let a = '';
let buf = '';
let sign = '';
const out = document.querySelector('#text');
out.textContent = 0;
let clearAll = () => { a = ''; buf = ''; sign = ''; out.textContent = 0; }
document.querySelector('.ac').onclick = clearAll;
document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;
    out.textContent = '';
    const key = event.target.textContent;
    if (key === '+/-' && a === '') {
        out.textContent = 0;
    }
    else if (key === '+/-') {
        out.textContent = a;
    }
    else if (key === '.' && a === '') {
        a += '0';
        a += '.';
        out.textContent = a;
    }
    else if (key === '.' && a.includes('.')) {
        a += '';
        out.textContent = a;
    }
    else if (key === '.' && (buf === '+' || buf === '-' || buf === '/' || buf === '*' || buf === '=' || buf === '%')) {
        out.textContent = a;
    }
    else if (buf === '.' && (key === '+' || key === '-' || key === '/' || key === '*' || key === '=' || key === '%')) {
        out.textContent = a;
    }
    else if ((buf === '+' || buf === '-' || buf === '/' 
            || buf === '*' || buf === '=' || buf === '%') 
            && (key === '+' || key === '-' || key === '/' 
            || key === '*' || key === '=' || key === '%')) {
                    out.textContent = a;
    }
    else if ((key === '+' || key === '-' || key === '/' 
        || key === '*' || key === '=' || key === '%') && a === '') {
            out.textContent = 0;
    }
    else if (key === '0' && a === '') {
        out.textContent = 0;
    }
    else {
        if (key !== '=') {
            if (key === '+' || key === '-' || key === '/' 
                || key === '*' || key === '=' || key === '%') {
                    sign += key;
            }     
            a += key;
            out.textContent = a;
            buf = key;
        }
        else if (key === '=') {
            // buf = '';
            // out.textContent = result(a);
            // a = '';
            result(a);
        }
    }
}

function result(tmp) {
    tmp = tmp.split('+');
    tmp = tmp.join(' ');
    tmp = tmp.split('-');
    tmp = tmp.join(' ');
    tmp = tmp.split('/');
    tmp = tmp.join(' ');
    tmp = tmp.split('*');
    tmp = tmp.join(' ');
    tmp = tmp.split('%');
    tmp = tmp.join(' ');
    for (let i = 0; i < tmp.length + sign.length; i++) {
        let nmb = '';
        while (tmp[i] && tmp[i] !== ' ') {
            nmb += tmp[i];
            console.log(tmp[i]);
            console.log(nmb)  
            i++;
        }
        
    }
}







