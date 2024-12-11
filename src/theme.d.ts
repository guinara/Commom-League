import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    espacamentos: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
    cores: {
      branco: string;
      neutras: {
        a: string;
      };
      focus: string;
    };
  }
}