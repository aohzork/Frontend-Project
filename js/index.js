
let teamsLength = 30;
let teams = [];    //holding class-instances of teams from api
let heroes = [];   //holding class-instances of heroes from api

//initiate team instances with arbitrary data
for(let i =0; i < 2; i++){
    teams.push(new Team(3,1,1,1,"hello","hello"));
}

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
                    for(let y = 0; y < 2; y++){
                        teams[y].teamId = data[y].team_id;
                        teams[y].rating = data[y].rating;
                        teams[y].wins = data[y].wins;
                        teams[y].losses = data[y].losses;
                        teams[y].name = data[y].name;
                        teams[y].logo = data[y].logo_url;                         
                    
                        displayTeams();
                    }

                    console.log(teams);
                    console.log(teams[0].teamId);
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
    

    let placeHeader = document.getElementById('content');
    let teamHeader = `<div class="team-header-container">
        <div class="team-header-content">name</div>
        <div class="team-header-content">rating</div>
        <div class="team-header-content">wins</div>
        <div class="team-header-content">losses</div>
    </div>
        <div id="teams"></div>`;

    placeHeader.innerHTML = teamHeader;
    
    let placeTeams = document.getElementById('teams');
    let teamItem = `<div class="team-item" id ="team_id">
        <div class="team-container">           
            <div class="team-content">
                <div class="flex-item">
                    <img src="img\\dotabg.jpg" class="team-logo" alt="">
                    <div>
                        <span class="team-name">team</span><br>
                        <button class="click-expand">Show teamdetails</button>
                    </div>
                </div>                
            </div>
            
            <div class="team-content">
                <span class="team-rating">11245</span>
                <div class="team-meter-outer">
                    <div class="team-meter-inner meter-color1"></div>
                </div>
            </div>
            <div class="team-content">
                <span class="team-wins">11245</span>
                <div class="team-meter-outer">
                    <div class="team-meter-inner meter-color2"></div>
                </div>
            </div>
            <div class="team-content">
                <span class="team-losses">300</span>
                <div class="team-meter-outer">
                    <div class="team-meter-inner meter-color2"></div>
                </div>
            </div>               
        </div>

        <!--expand html-->
        <div class="team-expand">
            <div class="expand-item">
                <div class="expand-header-container">
                    <div class="expand-header-content">most played heroes</div>
                    <div class="expand-header-content">wins</div>
                    <div class="expand-header-content">losses</div>                                        
                </div>
                <div class="expand-heroes" id="hero-items-"></div>
                /*<div class="expand-container">
                    <div class="expand-content">    
                        <div class="flex-item">
                            <img src="img\\dotabg.jpg" class="hero-img" alt="">
                            <div>
                                <span class="hero-name">hero</span><br>
                            </div>
                        </div>      
                    </div>
                    <div class="expand-content">1
                        <div class="team-meter-outer">
                            <div class="team-meter-inner meter-color2"></div>
                        </div>
                    </div>
                    <div class="expand-content">2
                        <div class="team-meter-outer">
                            <div class="team-meter-inner meter-color2"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="expand-item">
                <div class="expand-header-container">
                    <div class="expand-header-content">Played Leagues games</div>
                    <div class="expand-header-content">wins</div>
                    <div class="expand-header-content">losses</div>                                        
                </div>
                <div class="expand-container">
                    <div class="expand-content">3
                        <span>team</span>                            
                    </div>
                    <div class="expand-content">4
                        <div class="team-meter-outer">
                            <div class="team-meter-inner meter-color2"></div>
                        </div>
                    </div>
                    <div class="expand-content">5
                        <div class="team-meter-outer">
                            <div class="team-meter-inner meter-color2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div><!--end team & expand-->`;

    //later for-loop < teamslength, create html for all teams
    for(let i = 0; i < 2; i++){
        placeTeams.innerHTML += teamItem;
    }
       
    
    /*$('.team-item').each(function(i){
        this.id = `${teams[i].teamId}`;
    });
    
    console.log($('.team-item'));*/

    //populate each team with data
    for(let i = 0; i <2; i++){
        $('.team-item').eq(i).attr("id",`${teams[i].teamId}`);
        $('.team-logo').eq(i).attr("src",`${teams[i].logo}`);
        $('.team-name').eq(i).text(`${teams[i].name}`);
        $('.team-rating').eq(i).text(`${teams[i].rating}`);
        $('.team-wins').eq(i).text(`${teams[i].wins}`);
        $('.team-losses').eq(i).text(`${teams[i].losses}`);
        let lossesCSS = teams[i].losses/(teams[i].wins + teams[i].losses);
        let winsCSS = teams[i].wins/(teams[i].wins + teams[i].losses);
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

        if(expandTeamHTML[clickedBtn].style.display=== "none") {
            expandTeamHTML[clickedBtn].style.display = "flex";
        } 
        else {
            expandTeamHTML[clickedBtn].style.display = "none";
        }
    
    });

    
}

function expandItems(btnID){
    let id = btnID;
    console.log(heroes);

    let teamsHeroUrl = "https://api.opendota.com/api/teams/" + id + "/heroes";
    fetch(teamsHeroUrl).then(resp => resp.json()).then(function(data){
        let heroData = [];
        let tmpHeroData;
        for(let i = 0; i < 5; i++){
            heroData[i] = data[i];
        }
        console.log(data);
        console.log(heroData);
    })
    .catch(function(error){
        console.log("cannot fetch data from " + teamsHeroUrl);
    });

    //let id = $('click-expand').attr('value');
    console.log("id" + id);

    /*let expandHeader = `<div class="expand-header-container">
        <div class="expand-header-content">most played heroes</div>
        <div class="expand-header-content">wins</div>
        <div class="expand-header-content">losses</div>                                        
    </div>
        <div id="expand-Heroes" id="hero-items"></div>`;*/
    
    let placeHeroes = document.getElementById("hero-items-" + id);
    //console.log(placeHeroes);    
    let heroItem = `<div class="expand-container" id="hero-name">
        <div class="expand-content">    
            <div class="flex-item">
                <img src="img\\dotabg.jpg" class="hero-img" alt="">
                <div>
                    <span class="hero-name">hero</span><br>
                </div>
            </div>      
        </div>
        <div class="expand-content">
            <span class="hero-item-wins">1</span>
            <div class="team-meter-outer">
                <div class="team-meter-inner meter-color2"></div>
            </div>
        </div>
        <div class="expand-content">
            <span class="hero-item-losses">1</span>
            <div class="team-meter-outer">
                <div class="team-meter-inner meter-color2"></div>
            </div>
        </div>
    </div>`;

    for(let i = 0; i < 2; i ++){
        placeHeroes.innerHTML = heroItem;
    }
    

    /*<!--expand html-->
        <div class="team-expand">
            <div class="expand-item">
                <div class="expand-header-container">
                    <div class="expand-header-content">most played heroes</div>
                    <div class="expand-header-content">wins</div>
                    <div class="expand-header-content">losses</div>                                        
                </div>
                <div class="expand-container">
                    <div class="expand-content">    
                        <div class="flex-item">
                            <img src="img\\dotabg.jpg" class="hero-img" alt="">
                            <div>
                                <span class="hero-name">hero</span><br>
                            </div>
                        </div>      
                    </div>
                    <div class="expand-content">1
                        <div class="team-meter-outer">
                            <div class="team-meter-inner meter-color2"></div>
                        </div>
                    </div>
                    <div class="expand-content">2
                        <div class="team-meter-outer">
                            <div class="team-meter-inner meter-color2"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="expand-item">
                <div class="expand-header-container">
                    <div class="expand-header-content">Played Leagues games</div>
                    <div class="expand-header-content">wins</div>
                    <div class="expand-header-content">losses</div>                                        
                </div>
                <div class="expand-container">
                    <div class="expand-content">3
                        <span>team</span>                            
                    </div>
                    <div class="expand-content">4
                        <div class="team-meter-outer">
                            <div class="team-meter-inner meter-color2"></div>
                        </div>
                    </div>
                    <div class="expand-content">5
                        <div class="team-meter-outer">
                            <div class="team-meter-inner meter-color2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div><!--end team & expand-->`;*/


}