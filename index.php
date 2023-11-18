<html lang="pt-BR">
        
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> Radar </title>
        <link rel="stylesheet" type="text/css" href="./css/padrao.css">
        <link rel="stylesheet" type="text/css" href="./css/clouds.css">
        <link rel="stylesheet" type="text/css" href="./css/novoaviao.css">
        <link rel="stylesheet" type="text/css" href="./css/transformacao.css">
        <link rel="stylesheet" type="text/css" href="./css/datagrid.css">
        <link rel="stylesheet" type="text/css" href="./css/rastreamento.css">

        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/play-list-add.css' rel='stylesheet'>
        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/airplane.css' rel='stylesheet'>
        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/arrows-expand-down-right.css' rel='stylesheet'>
        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/edit-black-point.css' rel='stylesheet'>
    </head>
    <body>
        <?php include("./cmp/clouds/clouds.php");?>
        
        <?php include("./cmp/navbar/nav.html");?>

        <div class="containeraviao">
            <div class="aviao"><img src="./cmp/imgs/aviao.svg" alt=""></div>
        </div>

        <?php include("./cmp/popups/novoaviao.html");?>

        <?php include("./cmp/popups/transformacao.html");?>

        <?php include("./cmp/popups/rastreamento.html");?>

        <?php include("./cmp/popups/historico.html");?>

        <?php include("./cmp/popups/datagrid.html");?>

        <section id="monitoramento">
            <div class="radar" id="radar">
                <span class="blip"></span>
                <span class="circle"></span>
            </div>
        </section>
        
    </body>

    <script src="./js/functions.js"></script>
    <script src="./js/main.js"></script>
</html>
