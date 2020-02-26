"use strict";
var Hero = /** @class */ (function () {
    function Hero(id, localized_name, primary_attr, attack_type, roles, img) {
        this.id = id;
        this.localized_name = localized_name;
        this.primary_attr = primary_attr;
        this.attack_type = attack_type;
        this.roles = roles;
        this.img = img;
    }
    return Hero;
}());
var Team = /** @class */ (function () {
    function Team(team_id, rating, wins, losses, name, logo_url) {
        this.team_id = team_id;
        this.rating = rating;
        this.wins = wins;
        this.losses = losses;
        this.name = name;
        this.logo_url = logo_url;
    }
    return Team;
}());
