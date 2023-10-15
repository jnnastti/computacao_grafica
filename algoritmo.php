<?php
function cartesianoParaPolar($X, $Y) {
    // Retornará nulo caso X ou Y for nulo
    if (isset($X) && isset($Y)){
        // O Raio é calculado a partir de pitágoras
        $raio = sqrt($X * $X + $Y * $Y);
        // Essa função tive uma ajuda desse link e do Gepeto pra entender como 
        // funciona, caso queira entender o arco tangente segue o link:
        // https://www.calculadoraonline.com.br/arco-tangente
        $angulo = atan2($Y, $X); // https://www.w3schools.com/php/func_math_atan2.asp - Graças a deus por essa documentação
        // Porém ele retorna em Radiano, é necessário utilizar a função abaixo para transformar em graus
        return array($raio, radianoParaGraus($angulo));
    } else{
        return null;
    }
}

function radianoParaGraus($radiano) {
    // Retornará nulo caso $radiano for nulo     
    if (isset($radiano)) {
        return $radiano * (180 / M_PI); // O valor de M_PI é o pi
    }else {
        return null;
    }
}

// No slide 4 da aula 4 é demonstrado como utilizando apenas o raio com cos() e sin() é possível pegar o X e Y, coseno para o X e seno para o Y
function polarParaCartesiano($raio, $angulo) {
    // Retornará nulo caso $raio ou $angulo for nulo    
    if (isset($raio) && isset($angulo)){
        $X = $raio * radianoParaGraus(cos($angulo));
        $Y = $raio * radianoParaGraus(sin($angulo));
        return array($X, $Y);
    } else {
        return null;
    }
}

// Translação é apenas adicionar ao valor antigo de X e Y mais os valores de translação
function translacao($X, $Y, $Tx, $Ty) {
    // Retornará nulo caso $Tx ou $Ty for nulo
    if (isset($Tx) && isset($Ty)){
        $Ax = $X + $Tx;
        $Ay = $Y + $Ty;
        return array($Ax, $Ay);
    } else {
        return null;
    }
}

// Quanto à escala, é um simples multiplicar o X e Y pelo Sx e Sy como estão na aula 5 slide 7
function escala($X, $Y, $Sx, $Sy) {
    // Retornará nulo caso $Sx ou $Sy for nulo    
    if (isset($Sx) && isset($Sy)){    
        $Ax = $X * $Sx;
        $Ay = $Y * $Sy;
        return array($Ax, $Ay);
    } else {
        return null; 
    }
}

// Agora a rotação é chatinho que aplicar, é necessário utilizar cosseno e seno como está na aula 5 slide 14
function rotacao($X, $Y, $anguloRotacao) {
    // Retornará nulo caso $X ou $Y ou $anguloRotacao for nulo      
    if (isset($X) && isset($Y) && isset($anguloRotacao)){
        $Ax = ($X * radianoParaGraus(cos($anguloRotacao))) - ($Y * radianoParaGraus(sin($anguloRotacao)));
        $Ay = ($Y * radianoParaGraus(cos($anguloRotacao))) + ($X * radianoParaGraus(sin($anguloRotacao)));
        return array($Ax, $Ay);
    } else {
        return null;
    }
}
?>