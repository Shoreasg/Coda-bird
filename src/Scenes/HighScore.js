$(() => {

    let dodgePipeScore = localStorage.getItem("easyHighScore");
    let collectStarScore = localStorage.getItem("normalHighScore");
    let dodgeBirdScore = localStorage.getItem("hardHighScore");
    const $easyScore = $('<h1>').text(dodgePipeScore);
    const $normalScore = $('<h1>').text(collectStarScore);
    const $hardScore= $('<h1>').text(dodgeBirdScore);

    $("#dodgepipes").append($easyScore);
    $("#collectstars").append($normalScore);
    $("#dodgebirds").append($hardScore);


});