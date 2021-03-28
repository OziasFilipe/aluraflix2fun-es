var db = openDatabase('dTios','1.0', 'Meu primeiro Banco',2* 1024 * 1024);

db.transaction(function(tex){

    tex.executeSql('CREATE TABLE FILMES (ID PRIMARY KEY,nomeFilme TEXT ,linkFilme TEXT )');
})





function salvar(){
    let campo = document.getElementById("campo").value;
    let nome = document.getElementById("nome").value;
    alert("Nome"+nome+"--"+"link:"+campo);

    db.transaction(function(tex){
        tex.executeSql('INSERT INTO FILMES (nomeFilme,linkFilme) VALUES (?,?)',[nome,campo]);
    })
}


function pegarDados(){

    db.transaction(function(tex){
        tex.executeSql('SELECT * FROM FILMES ',[],function(tex,resultado){
           var rows = resultado.rows; 
            for(let i = 0; i < rows.length; i++){
                console.log(rows[i].nomeFilme);
                console.log(rows[i].linkFilme);
            }

        });
    })

}

pegarDados();