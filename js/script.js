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

api.interceptors.request.use(async (config)=>{
    try{
        loginSession();
        config.headers.authorization = 'Bearer ' + token;
        return config;
    }catch(error){
        console.log(error);
    }
});

loginSession();

btnLogin.onclick = ()=>{
    let email = inpEmail.value;
    let password = inpPassword.value;
    let dados = {
        "email":email,
        "password":password
    }
    api.post('userauth', dados).then(res=>{
        token = res.data.token;
        Cookies.set('token', token);
        let { nome, level } = jwt_decode(token);
        lblUser.innerHTML = nome;
        lblNivel.innerHTML = level;
    });
}

function loginSession(){
    token = Cookies.get('token');
    if(token){
        let { nome, level } = jwt_decode(token);
        lblUser.innerHTML = nome;
        lblNivel.innerHTML = level;
    }
}

btnCadpro.onclick = ()=>{
    const data = {
        "nome": "Samsung A40",
        "descri": "Smartphone",
        "qtda": 20,
        "Fabricante": "Samsung"
    }
    api.post('sproduto', data).then(resp =>{
        console.log('Cadastro realizado!');
    }).catch(error => console.log('Erro ao realizar cadastro!' + error))
};