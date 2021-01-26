let input = document.querySelector('#entrada');
let btn = document.querySelector('#btn');
let saida = document.querySelector('#saida');

btn.onclick = function () {

    saida.innerHTML = '';

    // instanciando objeto do tipo ajax

    let request = new XMLHttpRequest();

    // abrir uma conexão (*método http - get, post, put...*)

    request.open('GET', `https://api.github.com/users/${input.value}`);

    // enviar requisição

    request.send(null);

    request.onreadystatechange = function () {

        // criar elemento span

        let spanNome = document.createElement('span');

        // criar variável nome

        let textoNome = '';
        

        if(request.readyState === 4) {
            if(request.status === 200) {

                //transformar dados JSON para array

                usuario = JSON.parse(request.responseText);

                // se o usuário possui nome

                if (usuario['name'] !== null) {

                    // criando um link e colocando o valor nome do array dentro
                    // setando atributo para ir até o perfil do usuário no github

                    let a = document.createElement('a');
                    let link = document.createTextNode(usuario['name']);

                    a.setAttribute('href', usuario['html_url']);
                    a.setAttribute('target', '_blank');
                    a.appendChild(link);
                    
                    // criando imagem e setando o valor do array usuário(avatar)

                    let img = document.createElement('img');
                    img.setAttribute('src', usuario['avatar_url']);
                    img.setAttribute('alt', usuario['name']);
                    img.setAttribute('class', 'foto');
                    saida.appendChild(img);

                
                    // incluindo o link e a imagem dentro do span criado 
                    // e por seguinte dentro da div

                    spanNome.appendChild(a);
                    spanNome.setAttribute('class', 'span');
                    saida.appendChild(spanNome);
                    saida.setAttribute('class', 'div');
                    

                } else {

                    textoNome = document.createTextNode('O usuário digitado não possui um nome.');

                    // setando classe e div de erro

                    spanNome.appendChild(textoNome);
                    spanNome.setAttribute('class', 'spanErro');
                    saida.appendChild(spanNome);
                    saida.setAttribute('class', 'divErro');

                } 

            } else {


                textoNome = document.createTextNode(`Usuário ${input.value} não encontrado!`);

                // setando classe e div de erro

                spanNome.appendChild(textoNome);
                spanNome.setAttribute('class', 'spanErro');
                saida.appendChild(spanNome);
                saida.setAttribute('class', 'divErro');

            }
        }

        input.value = '';

    }

}