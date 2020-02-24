//-----------------------------------------------------------------
//          CHANGE ONLY THESE PARAMETERS TO ADJUST PROGRAM
//-----------------------------------------------------------------

let teamsLength = 30;   //change how many teams to display
let heroLength = 5;     //change how many heroes per team to display

//-----------------------------------------------------------------

let teams = [];         //holding class-instances of teams from api
let heroes = [];        //holding class-instances of heroes from api

//initiate team instances with arbitrary data
for(let i =0; i < teamsLength; i++){
    teams.push(new Team(3,1,1,1,"hello","hello"));
}

//initiate heroinstances with arbitrary data (119 currently total amount of heroes in the game)
for(let i = 0; i < 119; i++){
    heroes.push(new Hero(1,"hi","a", "a", [],"img"));
}

$(document).ready(function(){

    let urls = ["https://api.opendota.com/api/teams"
                ,"https://api.opendota.com/api/heroStats"];
    let requests = new Array(urls.length);

    //extract api-data into class objects, put in array
    for(let i = 0; i < urls.length; i++){
        fetch(urls[i]).then((resp) => resp.json()).then(function(data){
            console.log(data);
            switch(i){
                case 0:
                    //change arbitrary data for api-data
                    for(let y = 0; y < teamsLength; y++){
                        teams[y].teamId = data[y].team_id;
                        teams[y].rating = data[y].rating;
                        teams[y].wins = data[y].wins;
                        teams[y].losses = data[y].losses;
                        teams[y].name = data[y].name;
                        teams[y].logo = data[y].logo_url;                                                                     
                    }

                    displayTeams();

                    break;
                case 1:
                    for(let y = 0; y < data.length; y++){
                        heroes[y].id = data[y].id;
                        heroes[y].name = data[y].localized_name;
                        heroes[y].primaryAttr = data[y].primary_attr;
                        heroes[y].attackType = data[y].attack_type;
                        heroes[y].roles = data[y].roles;
                        heroes[y].img = data[y].img;
                    }
                                               
                    break;
            };

        })
        .catch(function(error){
            console.log("cannot fetch data from " + urls[i]);
        });
    }
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
        $('.team-item').eq(i).attr("id",`${teams[i].teamId}`);
        $('.team-logo').eq(i).attr("src",`${teams[i].logo}`);
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
       
        $('.click-expand').eq(i).attr("id", `${teams[i].teamId}`);
        $('.expand-heroes').eq(i).attr("id", "hero-items-" + teams[i].teamId);
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
    //let h = $(this);
 
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
