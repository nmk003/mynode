<h1 id="heading">Heading</h1>

<button id="hideHeading">Hide</button>
<button id="showHeading">show</button>

<script>
    $("hideHeading").click(function(){
        $("heading").hide();
    })

    $("showHeading").click(function(){
        $("heading").show();
    })
</script>