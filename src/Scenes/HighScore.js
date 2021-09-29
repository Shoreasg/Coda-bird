$(() => {


    setInterval(() => {
        let dodgePipeScore = localStorage.getItem("easyHighScore");
        let collectStarScore = localStorage.getItem("normalHighScore");
        let dodgeBirdScore = localStorage.getItem("hardHighScore");
        $("#dodgePipes").empty();
        $("#dodgePipes").append(dodgePipeScore);
        $("#collectStars").empty();
        $("#collectStars").append(collectStarScore);
        $("#dodgeBirds").empty();
        $("#dodgeBirds").append(dodgeBirdScore);
    }, 1000);
   

   


});