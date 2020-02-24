//universal function to use throughout app
function generateHTML(gen){
    return gen;
}

//generate teamheader
let teamHeaderHtml = `<div class="team-header-container">
<div class="team-header-content">name</div>
<div class="team-header-content">rating</div>
<div class="team-header-content">wins</div>
<div class="team-header-content">losses</div>
</div>
<div id="teams"><!--generate teams html here--></div>`;

//generate team-item
let teamItemHtml = `<div class="-team-item" id ="team_id">
<div class="team-container">           
    <div class="team-content">
        <div class="flex-item">
            <img src="img\\dotabg.jpg" class="team-logo" alt="">
            <div>
                <span class="team-name">team</span><br>
                <button class="click-expand">Show Details</button>
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
            <div class="team-meter-inner meter-color3"></div>
        </div>
    </div>               
</div>                
<div class="team-expand"> <!--expand team-->
    <div class="expand-item">
        <table>
            <thead>
                <th >most played heroes</th>
                <th>wins / played games</th>
            </thead>
            <tbody class="expand-heroes" id="hero-items-"><!-- generate hero html here--></tbody>
        </table>                                                                    
    </div> <!--end expand-item-->           
</div><!-- end expand team-->
</div> <!--end team-->`;

//generate hero-item
let heroItemHtml = `<tr> <!--hero-item-->
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
            <div class="team-meter-inner meter-color1"></div>
        </div>
    </td>
</tr>`;