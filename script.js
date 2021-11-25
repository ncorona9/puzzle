$(document).ready(function(){
    var pieces = createPieces(true);

    $("#puzzleContainer").html(pieces);

    $("#btnStart").click(function(){
        
        var sec = 0;
        function pad ( val ) { return val > 9 ? val : "0" + val; }
        setInterval( function(){
            document.getElementById("seconds").innerHTML=pad(++sec%60);
            document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
        }, 1000);
        
        var pieces = $("#puzzleContainer div");
        pieces.each(function(){
            var leftPosition = 
            Math.floor(Math.random()*290) + "px";
            var topPosition = Math.floor(Math.random()*290) + "px";
            $(this).addClass("draggablePiece")
            .css({
                position:"absolute",
                left:leftPosition,
                top:topPosition
            })
            $("#pieceContainer").append($(this));
        });
        var emptyString = createPieces(false);
    $("#puzzleContainer").html(emptyString);
    $(this).hide();
    $("#btnReset").show()
    implementLogic()
    });
    $("#btnReset").click(function(){
        var newPieces = createPieces(true);
        $("#puzzleContainer").html(newPieces);
        $(this).hide();
        $("#btnStart").show();
        $("#pieceContainer").empty();
    });
    function createPieces(withImage)
    {
        var rows = 4, columns = 4;
        var pieces = "";
        for(var i=0,top=0,order=0;i<rows;i++,top-=100)
        {
            for (var j=0,left=0;j<columns;j++,left-=100,order++)
            {
                if(withImage)
                {
                    pieces += "<div style='background-position:" + left + "px " + top + "px;' class='piece' data-order=" + order + "></div>";
                }
                else
                {
                    pieces += "<div style='background-image:none;' class='piece droppableSpace'></div>";
                }
            }
        }
        return pieces;
    }
    function checkIfPuzzleSolved(){
        if ($("#puzzleContainer) .droppedPiece").length !=16)
        {
            return false;
        }
        for (var k=0;k<16;k++)
        {
            var item = $("#puzzleContainer .droppedPiece:eq(" + k + ")");
            var order = item.data("order");
            if(k != order)
            {
                $("#pieceContainer").text("Uh Oh! Try Again!");
                return false;
            }
        }
        $("#pieceContainer").text("Yay! You did it!");
        return true;
    }

    function implementLogic(){
        $(".draggablePiece").draggable({
            revert:"invalid",
            start:function(){
                if($(this).hasClass("droppedPiece"))
                {
                    $(this).removeClass("droppedPiece");
                    $(this).parent().removeClass("piecePresent");
                }
            }
        });
        $(".droppableSpace").droppable({
            hoverClass:"ui-state-highlight",
            accept:function(){
               return !$(this).hasClass("piecePresent")
            },
            drop:function(event,ui)
            {
                var draggableElement = ui.draggable;
                var droppedOn = $(this);
                droppedOn.addClass("piecePresent");
                $(draggableElement).addClass("droppedPiece")
                .css({
                    top:0,
                    left:0,
                    position:"relative"
                }).appendTo(droppedOn);
                
            }
        });
    }
});
