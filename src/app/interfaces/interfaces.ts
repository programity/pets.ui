

export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  _id?: string;
  mensaje?: string;
  imgs?: string[];
  coords?: string;
  user?: User;
  created?: string;
}

export interface User {
  _id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  password?: string;
}
