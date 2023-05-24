//LISTA DE USUÁRIOS
let listaDeUsuarios = [
    {
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        nomeCompleto : "José das Couves",
        nomeUsuario : "jose",
        senhaUsuario : "123456",
    },
    {
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        nomeCompleto : "João Paulino",
        nomeUsuario : "joao",
        senhaUsuario : "123456"
    },
    {
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXN1YXJpb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        nomeCompleto : "Maria Tomaite",
        nomeUsuario : "maria",
        senhaUsuario : "123456"
    },
    {
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        nomeCompleto : "Paulo da Selva",
        nomeUsuario : "paulo",
        senhaUsuario : "123456"
    }
];

localStorage.setItem("listaUser" ,JSON.stringify(listaDeUsuarios));



addEventListener("click", (evento)=>{
     
    let userInput = document.querySelector("#idUser"); 
    let passInput = document.querySelector("#idPass"); 
        
        //MOSTRA SENHA NO OLHINHO
        if(evento.target.className == "fa fa-eye" || evento.target.className == "fa fa-eye-slash"){

            evento.target.setAttribute("style","cursor:pointer")

            if(passInput.getAttribute("type") == "password"){
                passInput.setAttribute("type","text");
                evento.target.setAttribute("class","fa fa-eye-slash")  
            }else{
                evento.target.setAttribute("style","cursor:pointer");
                evento.target.setAttribute("class","fa fa-eye");  
                passInput.setAttribute("type","password"); 
            }

        }

        //USUÁRIO QUE REPRESENTA OS DADOS QUE CHEGAM DO FORMULÁRIO.
        const usuarioLogado = {
            nomeUsuarioLogado : userInput.value,
            senhaUsuarioLogado: passInput.value
        }

        //USUÁRIO QUEVAI REPRESENTAR OS DADOS VALIDADOS
        let usuarioValidado = {};

        let listaDeUsuariosRecuperada = JSON.parse(localStorage.getItem("listaUser"));

        if(evento.target.id == "btnSubmit"){
        
        try{
                listaDeUsuariosRecuperada.forEach((usuario)=>{

                    if(usuarioLogado.nomeUsuarioLogado == usuario.nomeUsuario && usuarioLogado.senhaUsuarioLogado == usuario.senhaUsuario){
                        usuarioValidado = usuario;
                        throw "USUÁRIO VALIDADO!";
                    }
                });

                throw "USUÁRIO OU SENHA INCORRETOS!";

    }catch(msg){

        const msgStatus = document.querySelector("#info");

        if(msg == "USUÁRIO VALIDADO!"){
            //Criar uma msg para o usuário
            msgStatus.setAttribute("style","color:#00ff00");
            msgStatus.innerHTML = `<span><strong>O usuário ${usuarioValidado.nomeCompleto} realizou o login com SUCESSO!!</strong></span>`

            //Adicionar o objeto USUÁRIO-VALIDADO no LOCAL-STORAGE
            localStorage.setItem("user-validado", JSON.stringify(usuarioValidado));

            //CRIANDO A AUTENTICAÇÃO
            let token = Math.random().toString(16).substring(2)+Math.random().toString(16).substring(2);
            //Adicionando o token no LOCAL-STORAGE
            localStorage.setItem("user-token", token);

            //Redirect
            setTimeout(()=>{
                window.location.href = "../sucesso.html";
            },3000);

        }else{
            //Criar uma msg para o usuário
            msgStatus.setAttribute("style","color:#ff0000");
            msgStatus.innerHTML = `<span><strong>Nome de usuário ou senha inválidos...</strong></span>`
        }
    }
  }
});
