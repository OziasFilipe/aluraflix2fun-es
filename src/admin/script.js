//var listaFilmes = [
 // "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
  // "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
  //  "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"]

    let linkFilme = document.getElementById("filme");
    let nomeFilme = document.getElementById("nomeFilme");
    let  divListaFilmes = document.getElementById('listaFilmes');

function adicionarFilme(){
 
  let filmesDigitado = linkFilme.value;
  if(filmesDigitado.endsWith('.jpg')){
    let nome = nomeFilme.value;

    if(nome != "" && nome != undefined){

      novoFilmeAdicionar(filmesDigitado);
  
      salvar(nome,filmesDigitado);
    }
    else{
      window.alert("Nome da imagem invalida!");
    }

  }
  else {
    window.alert("Link da imagem e invalida!");
  }
     
}


function novoFilmeAdicionar(filmes){
  let elementoFilmes = "<img src = "+filmes+">";
 // listaFilmes.push(filmes);
  divListaFilmes.innerHTML =  divListaFilmes.innerHTML + elementoFilmes
  linkFilme.value = '';
  nomeFilme.value = '';
}

//Listagem dos meus filmes
//for(let i = 0; i < listaFilmes.length ; i++){

//divListaFilmes.innerHTML = divListaFilmes.innerHTML + "<img src = "+listaFilmes[i]+">";

//}

/*
  listaFilmes.map((item,i)=>{
    let filmeExistente = item == listaFilmes;
    window.alert(filmeExistente);
  })
*/ 

//Listagem de filmes 
// for (var i = 0; i < listaFilmes.length; i++){
 // document.write("<img src=" + listaFilmes[i] + ">")
//}



////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//Banco de dados generico do navegador 

var db = openDatabase('FilmesSalvos','1.0', 'banco de filmes ',2* 1024 * 1024);

db.transaction(function(tex){

    tex.executeSql('CREATE TABLE FILMES (ID PRIMARY KEY,nomeFilme TEXT ,linkFilme TEXT )');
})

function salvar(nome,filme){
  db.transaction(function(tex){
      tex.executeSql('INSERT INTO FILMES (nomeFilme,linkFilme) VALUES (?,?)',[nome,filme]);
  })
}
function pegarDados(){

  db.transaction(function(tex){
    tex.executeSql('SELECT * FROM FILMES ',[],function(tex,resultado){
       var rows = resultado.rows; 
        for(let i = 0; i < rows.length; i++){
            console.log(rows[i].nomeFilme);
            console.log(rows[i].linkFilme);
      
            divListaFilmes.innerHTML = divListaFilmes.innerHTML  + "<div class ='card'><img src = "+rows[i].linkFilme+"><h5>"+rows[i].nomeFilme+"</h5></div>";

        }

    });
})

}

pegarDados();