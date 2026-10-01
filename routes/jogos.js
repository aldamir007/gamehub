const express = require("express");
const jogos = require("../data/jogos");

const router = express.Router();

router.get("/", (req, res) => {

    // Mostra somente 3 jogos na página inicial
    const jogosDestaque = jogos.slice(0, 3);

    res.render("home", {
        jogos: jogosDestaque
    });

});

router.get("/jogos", (req, res) => {

    const busca = req.query.busca || "";
    const genero = req.query.genero || "";

    // Pesquisa pelo nome do jogo
    let jogosFiltrados = jogos.filter(jogo =>
        jogo.nome.toLowerCase().includes(busca.toLowerCase())
    );

    if (genero !== "") {

        jogosFiltrados = jogosFiltrados.filter(jogo =>
            jogo.genero.toLowerCase() === genero.toLowerCase()
        );

    }

    res.render("jogos", {
        jogos: jogosFiltrados,
        busca: busca,
        genero: genero
    });

});

router.get("/categorias", (req, res) => {

    const categorias = [
        ...new Set(jogos.map(jogo => jogo.genero))
    ];

    res.render("categorias", {
        categorias: categorias
    });

});

router.get("/categorias/:nome", (req, res) => {

    const nome = req.params.nome;

    const jogosFiltrados = jogos.filter(jogo =>
        jogo.genero.toLowerCase() === nome.toLowerCase()
    );

    res.render("categoria", {
        nome: nome,
        jogos: jogosFiltrados
    });

});

router.get("/jogos/:id", (req, res) => {

    const id = Number(req.params.id);

    const jogo = jogos.find(jogo =>
        jogo.id === id
    );

    res.render("detalhes", {
        jogo: jogo
    });

});


module.exports = router;