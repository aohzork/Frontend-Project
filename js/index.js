//-----------------------------------------------------------------
//          CHANGE ONLY THESE PARAMETERS TO ADJUST PROGRAM
//-----------------------------------------------------------------

let teamsLength = 30;   //change how many teams to display
let heroLength = 5;     //change how many heroes per team to display

//-----------------------------------------------------------------

let teams = [];
let heroes = [];

//initiate Team instances with arbitrary data
for(let i =0; i < teamsLength; i++){
    teams.push(new Team(3,1,1,1,"hello","hello"));
}

//initiate Hero instances with arbitrary data (119 in API)
for(let i = 0; i < 119; i++){
    heroes.push(new Hero(1,"hi","a", "a", [],"img"));
}

$(document).ready(function(){
    
    let urlTeam = "https://api.opendota.com/api/teams";
    let urlHero = "https://api.opendota.com/api/heroStats";
    getApi(urlTeam,teams,teamsLength,displayTeams);
    getApi(urlHero,heroes);
    
});

function displayTeams(){

    //generate teamheader
    let placeHeader = document.getElementById('content');
    placeHeader.innerHTML = generateHTML(teamHeaderHtml);
    
    //generate teams
    let placeTeams = document.getElementById('teams');
    for(let i = 0; i < teamsLength; i++){
        placeTeams.innerHTML += generateHTML(teamItemHtml);
    }
   
    //generate heroes
    let placeHeroes = document.getElementsByClassName("expand-heroes");
    for(let i = 0; i < placeHeroes.length; i++){
        for(let y = 0; y < heroLength; y++){
            placeHeroes[i].innerHTML += generateHTML(heroItemHtml);
        }
    }

    //highest teamrating = 100%
    let teamsRating = teams[0].rating;
    
    //populate each team with data
    for(let i = 0; i <teamsLength; i++){
        $('.team-item').eq(i).attr("id",`${teams[i].team_id}`);
        $('.team-logo').eq(i).attr("src",`${teams[i].logo_url}`);
        $('.team-name').eq(i).text(`${teams[i].name}`);
        $('.team-rating > span').eq(i).text(`${teams[i].rating}`);

        let tRatingCSS = (teams[i].rating/teamsRating)*100;
        
        $('.team-rating > div > div').eq(i).width(`${tRatingCSS}%`);
        $('.team-wins > span').eq(i).text(`${teams[i].wins}`);
        $('.team-losses > span').eq(i).text(`${teams[i].losses}`);
       
        let lossesCSS = teams[i].losses/(teams[i].wins + teams[i].losses)*100;
        let winsCSS = teams[i].wins/(teams[i].wins + teams[i].losses)*100;
       
        $('.team-wins > div > div').eq(i).width(`${winsCSS}%`);
        $('.team-losses > div > div').eq(i).width(`${lossesCSS}%`);
       
        $('.click-expand').eq(i).attr("id", `${teams[i].team_id}`);
        $('.expand-heroes').eq(i).attr("id", "hero-items-" + teams[i].team_id);
    }

    //click to show more teamdetails
    clickToExpand();
}

//click to show more teamdetails
function clickToExpand(){
    $('.click-expand').click(function(){
        let clickedBtn = $('.click-expand').index($(this));
        let expandTeamHTML = $('.team-expand');         
        let passID = $(this).attr("id");

        expandItems(passID);

        if(expandTeamHTML[clickedBtn].style.display=== "flex") {
            expandTeamHTML[clickedBtn].style.display = "none";
            $(this).html('Show Details');
        } 
        else {
            expandTeamHTML[clickedBtn].style.display = "flex";
            $(this).html('Hide Details');
        }
    });   
}

//populate hero data and league data when click button
function expandItems(btnID){
    
    let id = btnID;
    let hImgURL = [];
    let heroData = [];
   
    //get team hero data
    let teamsHeroUrl = "https://api.opendota.com/api/teams/" + id + "/heroes";
    fetch(teamsHeroUrl).then(resp => resp.json()).then(function(data){
      
        for(let i = 0; i < heroLength; i++){
            heroData[i] = data[i];
            hImgURL[i] = heroes.filter(function(item){
                return item.id === heroData[i].hero_id;
            }).map(function(item){
                return item.img;
            });           
        }
    })
    .catch(function(error){
        console.log("cannot fetch data from " + teamsHeroUrl);
    }).then(function(){
        //populate heroes with data
        for(let i = 0; i < heroLength; i++){
            $(`#hero-items-${id} .hero-img`).eq(i).attr("src",`https://api.opendota.com${hImgURL[i]}`);
            $(`#hero-items-${id} .hero-name`).eq(i).text(`${heroData[i].localized_name}`);
            $(`#hero-items-${id} .winrate > span`).eq(i).text(`${heroData[i].wins} / ${heroData[i].games_played}`);
            let winRate = (heroData[i].wins/heroData[i].games_played)*100;
            $(`#hero-items-${id} .winrate > div > div`).eq(i).width(`${winRate}%`);
        }
    });
}
