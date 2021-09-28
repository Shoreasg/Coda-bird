$(() => {


    setInterval(() => {
        let dodgePipeScore = localStorage.getItem("easyHighScore");
        let collectStarScore = localStorage.getItem("normalHighScore");
        let dodgeBirdScore = localStorage.getItem("hardHighScore");
        $("#dodgepipes").empty();
        $("#dodgepipes").append(dodgePipeScore);
        $("#collectstars").empty();
        $("#collectstars").append(collectStarScore);
        $("#dodgebirds").empty();
        $("#dodgebirds").append(dodgeBirdScore);
    }, 1000);
   

   


});