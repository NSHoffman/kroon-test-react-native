export type GistFileDTO = {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
};

export type SimpleUserDTO = {
  id: number;
  node_id: string;
  type: string;
  login: string;
  site_admin: boolean;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  name?: string | null;
  email?: string | null;
  starred_at?: string;
};

export type BaseGistDTO = {
  id: string;
  node_id: string;
  description: string | null;
  files: Record<string, GistFileDTO>;
  user: SimpleUserDTO | null;
  owner: SimpleUserDTO;
  public: boolean;
  truncated: boolean;
  url: string;
  forks_url: string;
  commits_url: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  comments: number;
  comments_url: string;
  created_at: string;
  updated_at: string;
};
