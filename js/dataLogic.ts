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
}