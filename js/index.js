
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
            //console.log(data[500]);
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

                    //console.log(teams);
                    //console.log(teams[0].teamId);
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

            //console.log(heroes);
        })
        .catch(function(error){
            console.log("cannot fetch data from " + urls[i]);
        });

        //displayTeams();
        //console.log(teams);
    }

    

});

function displayTeams(){

    //combine and sort out data from all these apis in different ways
    //to get the data needed for each team
    //https://api.opendota.com/api/teams
    //https://api.opendota.com/api/teams/1838315/heroes
    //https://api.opendota.com/api/teams/{team_id}/heroes
    //https://api.opendota.com/api/leagues
    

    //teamheader
    let placeHeader = document.getElementById('content');
    let teamHeader = `<div class="team-header-container">
        <div class="team-header-content">name</div>
        <div class="team-header-content">rating</div>
        <div class="team-header-content">wins</div>
        <div class="team-header-content">losses</div>
    </div>
    <div id="teams"><!--generate teams html here--></div>`;

    //place header
    placeHeader.innerHTML = teamHeader;
    
    //teamItem
    let placeTeams = document.getElementById('teams');
    console.log(placeTeams);
    let teamItem = `<div class="-team-item" id ="team_id">
        <div class="team-container">           
            <div class="team-content">
                <div class="flex-item">
                    <img src="img\\dotabg.jpg" class="team-logo" alt="">
                    <div>
                        <span class="team-name">team</span><br>
                        <button class="click-expand">click me</button>
                    </div>
                </div>                
            </div>                    
            <div class="team-content team-rating">
                <span>11245</span>
                <div class="team-meter-outer">
                    <div class="team-meter-inner meter-color1"></div>
                </div>
            </div>
            <div class="team-content team-wins">
                <span>500</span>
                <div class="team-meter-outer">
                    <div class="team-meter-inner meter-color2"></div>
                </div>
            </div>
            <div class="team-content team-losses">
                <span>300</span>
                <div class="team-meter-outer">
                    <div class="team-meter-inner meter-color2"></div>
                </div>
            </div>               
        </div>                
        <div class="team-expand"> <!--expand team-->
            <div class="expand-item">
                <table>
                    <thead>
                        <th >most played heroes</th>
                        <th>wins/played games</th>
                    </thead>
                    <tbody class="expand-heroes" id="hero-items-"><!-- generate hero html here--></tbody>
                </table>                                                                    
            </div> <!--end expand-item-->
            <div class="expand-item">
                <table>
                    <thead>
                        <th>Played Leagues games</th>
                        <th>wins</th>
                        <th>losses</th>
                    </thead>
                    <tbody class="expand-container" id="team-id"><!--insert league html here-->
                        <tr class="league-item">
                            <td class="expand-content">
                                <span>League name</span><br>
                            </td>
                            <td class="expand-content">
                                <span>1</span>
                                <div class="team-meter-outer">
                                    <div class="team-meter-inner meter-color2"></div>
                                </div>
                            </td>
                            <td class="expand-content">
                                <span>1</span>
                                <div class="team-meter-outer">
                                    <div class="team-meter-inner meter-color2"></div>
                                </div>
                            </td>
                        </tr>                                                                
                    </tbody>
                </table>                                                                    
            </div> <!--end expand-item-->
        </div><!-- end expand team-->
    </div> <!--end team-->`;

    //generate html for all teams
    for(let i = 0; i < teamsLength; i++){
        placeTeams.innerHTML += teamItem;
    }

    
    //hero-item
    let placeHeroes = document.getElementsByClassName("expand-heroes");
    console.log(placeHeroes);
    let heroItem = `<tr> <!--hero-item-->
    <td class="expand-content">
            <div class="flex-item">
                <img src="img\\dotabg.jpg" class="hero-img" alt="">
                <div>
                    <span class="hero-name">hero</span>
                </div>
            </div>  
        </td>
        <td class="expand-content winrate">
            <span>1</span>
            <div class="team-meter-outer">
                <div class="team-meter-inner meter-color2"></div>
            </div>
        </td>
    </tr>`;
    
    //generate html for heroes
    for(let i = 0; i < placeHeroes.length; i++){
        for(let y = 0; y < heroLength; y++){
            placeHeroes[i].innerHTML += heroItem;
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
        console.log(lossesCSS);
        console.log(winsCSS);
        $('.click-expand').eq(i).attr("id", `${teams[i].teamId}`);
        $('.expand-heroes').eq(i).attr("id", "hero-items-" + teams[i].teamId);
    }

    //assign clickfunction to show more teamdetails
    $('.click-expand').click(function(){
        let clickedBtn = $('.click-expand').index($(this));
        //console.log(clickedBtn);
        let expandTeamHTML = $('.team-expand');
        
        //let passID = $('.click-expand').attr("id");
        let passID = $(this).attr("id");
        //console.log(passID);
        expandItems(passID);

        if(expandTeamHTML[clickedBtn].style.display=== "flex") {
            expandTeamHTML[clickedBtn].style.display = "none";
        } 
        else {
            expandTeamHTML[clickedBtn].style.display = "flex";
        }
    });    
}

//populate hero data and league data when click button
function expandItems(btnID){
    let id = btnID;
    console.log(heroes);

    console.log("this");
    let h = $(this);
 
    //let heroLength = 5;
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

        console.log(data);
        console.log(heroData[0].hero_id);
        console.log(hImgURL[0]);
                
    })
    .catch(function(error){
        console.log("cannot fetch data from " + teamsHeroUrl);
    }).then(function(){
        //populate heroes with data
        for(let i = 0; i < heroLength; i++){
            $(`#hero-items-${id} .hero-img`).eq(i).attr("src",`https://api.opendota.com${hImgURL[i]}`);
            $(`#hero-items-${id} .hero-name`).eq(i).text(`${heroData[i].localized_name}`);
            $(`#hero-items-${id} .winrate > span`).eq(i).text(`${heroData[i].wins}/${heroData[i].games_played}`);
            let winRate = (heroData[i].wins/heroData[i].games_played)*100;
            $(`#hero-items-${id} .winrate > div > div`).eq(i).width(`${winRate}%`);
        }
    });

    console.log("logga expand contents");
    console.log($(`#hero-items-${id} .hero-img`));  

}
