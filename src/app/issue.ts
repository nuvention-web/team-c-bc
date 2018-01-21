export class Issue {
  number: number;
  title: string;
  user: { login: string };
  labels: { name: string, color: string }[];
  milestone: { title: string };
  created_at: string;
  updated_at: string;
  closed_at: string;
  state: string;
}
