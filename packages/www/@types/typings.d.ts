// tslint:disable-next-line: no-namespace
declare namespace NodeJS {
  interface Process {
    browser: typeof browser;
  }
  interface Global {
    fetch: typeof fetch;
  }
}
