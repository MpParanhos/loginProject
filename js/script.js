//References from DOM - HTML
const lblUser = document.getElementById('lblUser');
const lblNivel = document.getElementById('lblNivel');

const inpEmail = document.getElementById('inpEmail');
const inpPassword = document.getElementById('inpPassword');
const btnLogin = document.getElementById('btnLogin');

const btnCadpro = document.getElementById('btnCadpro');

//Code

let token;

const api = axios.create({
    baseURL: 'http://18.224.8.119:3334/'
});

loginSession();

btnLogin.onclick = ()=>{
    let email = inpEmail.value;
    let password = inpPassword.value;
    let dados = {
        "email":email,
        "password":password
    }
    api.post('user', dados).then(res=>{
        token = res.data.token;
        Cookies.set('token', token);
        let { email, level } = jwt_decode(token);
        lblUser.innerHTML = email;
        lblNivel.innerHTML = level;
    });
}

function loginSession(){
    token = Cookies.get('token');
    if(token){
        let { email, level } = jwt_decode(token);
        lblUser.innerHTML = email;
        lblNivel.innerHTML = level;
    }
}