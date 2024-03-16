export interface Config {
    development: {
      username?: string | undefined;
      password?: string | undefined;
      database?: string | undefined;
      host?: string | undefined;
      port?: string | undefined;
      dialect?: string;
      logging?: boolean;
    };
  }