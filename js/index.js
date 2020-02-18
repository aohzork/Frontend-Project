
let teamsLength = 30;
let teams = [];    //holding class-instances of teams from api
let heroes = new Array();   //holding class-instances of heroes from api

for(let i =0; i < 2; i++)
    teams.push(new Team(3,1,1,1,"hello","hello"));

/*$(function(){
    $('.click-expand').click(function()
    {
        
        //let expands = $(".team-expand");
        //console.log(expands);
        alert('index: '+ $(".team-expand").index('.team-expand'));          //$(this).index('.team-expand'));
    });
});*/



/* Get all the items with Duplicate id
var $itemsThatHasIdDuplicate = $('[id]').filter(function () {
    return $('[id="' + this.id + '"]').length > 1;
});

 Modify the id for all of them
$itemsThatHasIdDuplicate.attr('id', function (i, val) {
    return 'newID' + (i + 1);
});*/


/*function expandOnClick() {
    let x = document.getElementById("team-expand-item");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}*/

/*function expando(){
    for(let i = 0; i < teamExpands.length; i++)
}*/


$(document).ready(function(){

   
    
    /*$('.click-expand').click(function(){
        let clickedBtn = $('.click-expand').index($(this));
        console.log(clickedBtn);

        let expandTeamHTML = $('.team-expand');
        if(expandTeamHTML[clickedBtn].style.display=== "none") {
            expandTeamHTML[clickedBtn].style.display = "flex";
        } 
        else {
            expandTeamHTML[clickedBtn].style.display = "none";
        }
    
    });*/

    let urls = ["https://api.opendota.com/api/teams"]
        //,"https://api.opendota.com/api/heroStats"];
    let requests = new Array(urls.length);

    //extract api-data into class objects, put in array
    for(let i = 0; i < urls.length; i++){
        fetch(urls[i]).then((resp) => resp.json()).then(function(data){
            console.log(data);
            //console.log(data[500]);
            switch(i){
                case 0:
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
                        heroes[y] = new Hero(data[y].id, data[y].localized_name, data[y].primary_attr, data[y].attack_type, data[y].roles, data[y].img);
                    }
                        
                       
                    break;
            };

            //console.log(teams);
        })
        .catch(function(error){
            console.log("cannot fetch data from " + urls[i]);
        });

        //console.log(teams);
    }

    

});

function displayTeams(){

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
                        <span>team</span><br>
                        <button class="click-expand">click me</button>
                    </div>
                </div>                
            </div>
            
            <div class="team-content">11245
                <div class="team-meter-outer">
                    <div class="team-meter-inner meter-color1"></div>
                </div>
            </div>
            <div class="team-content">500
                <div class="team-meter-outer">
                    <div class="team-meter-inner meter-color2"></div>
                </div>
            </div>
            <div class="team-content">300
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
                <div class="expand-container">
                    <div class="expand-content">    
                        <div class="flex-item">
                            <img src="img\\dotabg.jpg" class="team-logo" alt="">
                            <div>
                                <span>team</span><br>
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

    placeTeams.innerHTML = teamItem;
    
    console.log($('.team-item'));
    //$('.team-item')
    let val = 1234;

    /*$('.team-item').each(function(i){
        this.id = `${teams[i].teamId}`;
    });*/

    let vall = 1;
    for(let i = 0; i <1; i++){
        $('.team-item').eq(i).attr("id",`${val}`);
    }

    //assign clickfunction to show more teamdetails
    $('.click-expand').click(function(){
        let clickedBtn = $('.click-expand').index($(this));
        console.log(clickedBtn);

        let expandTeamHTML = $('.team-expand');
        if(expandTeamHTML[clickedBtn].style.display=== "none") {
            expandTeamHTML[clickedBtn].style.display = "flex";
        } 
        else {
            expandTeamHTML[clickedBtn].style.display = "none";
        }
    
    });
}