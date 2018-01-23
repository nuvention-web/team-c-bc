// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyASgeu3l3FEIEgnBPNU8j_Hja7ajaRkfHg',
    authDomain: 'github-weekly-summarizer.firebaseapp.com',
    databaseURL: 'https://github-weekly-summarizer.firebaseio.com',
    projectId: 'github-weekly-summarizer',
    storageBucket: 'gs://github-weekly-summarizer.appspot.com',
    messagingSenderId: '599055165227'
  }
};
