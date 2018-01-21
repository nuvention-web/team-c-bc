export class Commit {
  sha: string;
  commit: {
    author: { name: string, email: string, date: string },
    message: string
  };
  author: {
    login: string
  };
}
