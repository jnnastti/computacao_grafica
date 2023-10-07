<?php

$cloud = 1;
$star = 1;

?>

<section class="cloudPane">
    <div class="stars">
        <?php
            while($star != 11):
        ?>
            <span class="star" id="star<?=$star;?>"></span>
            <span class="star"></span>

        <?php
            $star++;
            endwhile;
        ?> 
    </div>

    <?php 
        while($cloud != 6):
    ?>
        <section class="bigCloud" id="cloud<?=$cloud;?>">
            <div class="largeCircle" id="circ1">
                <span class="largeCircle" id="circ1shadow"></span>
            </div>
            <div class="middleCircle" id="circ2">
                <span class="middleCircle" id="circ2shadow"></span>
            </div>
            <div class="middleCircle" id="circ3">
                <span class="middleCircle" id="circ3shadow"></span>
            </div>
            <div class="smallCircle" id="circ4"></div>
            <div class="smallCircle" id="circ5">
                <span class="smallCircle" id="circ5shadow"></span>
            </div>
            <div class="smallCircle" id="circ6">
                <span class="smallCircle" id="circ6shadow"></span>
            </div>
        </section>
    <?php
        $cloud++;
        endwhile;
    ?>
    
</section>