export interface Developer {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Version {
  id: string;
  name: string;
  description: string;
  developer: Developer;
}