class Hero {
  id:number;
  name: string;
  primaryAttr: string;
  attackType: string;
  roles: Array<string>; 
  img: string;

  constructor(id: number, name: string, primaryAttr: string, attackType: string, roles: Array<string>, img: string) {
    this.id = id;
    this.name = name;
    this.primaryAttr = primaryAttr;
    this.attackType = attackType;
    this.roles = roles;
    this.img = img;
    
   

  }



  //id : nr
  //name: string    ej ha med
  //localized_name: string
  //primary_attr: string
  //attack_type: string
  //roles[]: string array
  //img: (url) string
  //icon: (url) string

  //https://api.opendota.com/api/heroStats
}

class Team {
  teamId: number;
  rating: number;
  wins: number;
  losses: number;
  name: string;
  logo: string;
  
  constructor(teamId: number, rating: number, wins: number, losses: number, name: string, logo: string) {
    this.teamId = teamId;
    this.rating = rating;
    this.wins = wins;
    this.losses = losses;
    this.name = name;
    this.logo = logo;
  }

  
  //team_id : nr
  //rating: nr
  //wins: nr
  //losses: nr
  //name: string
  //tag: string
  //logo_url: string
  //https://steamcdn-a.akamaihd.net/apps/dota2/images/team_logos/1838315.png    giltlig
  //	"https://steamusercontent…D94C1C515DACD45A9C33411/"                       genererar ingen bild

  //https://api.opendota.com/api/teams
}

//export = Team;

class League {
  placeholder: string;
  constructor(placeholder2: string, placeholder3: number) {
    this.placeholder = placeholder2;
  }

  //leagueid: nr
  //ticket: string        behövs nog inte
  //banner: string        behövs nog int
  //tier: string
  //name: string
  //https://api.opendota.com/api/leagues

  //https://api.opendota.com/api/teams/{team_id}/matches  attribut i mathes där man kan se vilken league teamet ställt upp i
}

class PlayHero {
  heroId: number;
  name: string;
  gamesPlayed: number;
  wins: number;
  constructor(heroId: number, name: string, gamesPlayed: number, wins: number) {
    this.heroId = heroId;
    this.name = name;
    this.gamesPlayed = gamesPlayed;
    this.wins = wins
  }

  //hero_id: nr
  //localized_name: string        
  //games_played: number        
  //wins: number

  //https://api.opendota.com/api/teams/1838315/heroes
  //https://api.opendota.com/api/teams/{team_id}/heroes //plocka fram hjältar baserat på team id
}

class Match {
  placeholder: string;
  constructor(placeholder2: string, placeholder3: number) {
    this.placeholder = placeholder2;
  }

  //match_id
  //radiant_win: bool
  //radiant: bool
  //leagueid: nr
  //league_name: string
  //opposing_team_id: nr
  //opposing_team_name: string
  //opposing_team_logo: (url) string
  //https://steamcdn-a.akamaihd.net/apps/dota2/images/team_logos/1838315.png    giltlig
  //"https://steamusercontent…D94C1C515DACD45A9C33411/"                           genererar ingen bild

  //https://api.opendota.com/api/teams/{team_id}/matches
}
