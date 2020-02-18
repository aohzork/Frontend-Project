"use strict";
var Hero = /** @class */ (function () {
    function Hero(id, name, primaryAttr, attackType, roles, img) {
        this.id = id;
        this.name = name;
        this.primaryAttr = primaryAttr;
        this.attackType = attackType;
        this.roles = roles;
        this.img = img;
    }
    return Hero;
}());
var Team = /** @class */ (function () {
    function Team(teamId, rating, wins, losses, name, logo) {
        this.teamId = teamId;
        this.rating = rating;
        this.wins = wins;
        this.losses = losses;
        this.name = name;
        this.logo = logo;
    }
    return Team;
}());
//export = Team;
var League = /** @class */ (function () {
    function League(placeholder2, placeholder3) {
        this.placeholder = placeholder2;
    }
    return League;
}());
var PlayHero = /** @class */ (function () {
    function PlayHero(heroId, name, gamesPlayed, wins) {
        this.heroId = heroId;
        this.name = name;
        this.gamesPlayed = gamesPlayed;
        this.wins = wins;
    }
    return PlayHero;
}());
var Match = /** @class */ (function () {
    function Match(placeholder2, placeholder3) {
        this.placeholder = placeholder2;
    }
    return Match;
}());
