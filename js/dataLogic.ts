class Hero {
  id:number;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: Array<string>; 
  img: string;

  constructor(id: number, localized_name: string, primary_attr: string, attack_type: string, roles: Array<string>, img: string) {
    this.id = id;
    this.localized_name = localized_name;
    this.primary_attr = primary_attr;
    this.attack_type = attack_type;
    this.roles = roles;
    this.img = img;
  }
}

class Team {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  name: string;
  logo_url: string;
  
  constructor(team_id: number, rating: number, wins: number, losses: number, name: string, logo_url: string) {
    this.team_id = team_id;
    this.rating = rating;
    this.wins = wins;
    this.losses = losses;
    this.name = name;
    this.logo_url = logo_url;
  }
}