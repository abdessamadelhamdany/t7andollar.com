import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Favicon from '@/components/Meta/Favicon';
import MundanaHead from '@/components/Meta/MundanaHead';
import { AuthUser } from 'store/interfaces';
import { parseCookies } from 'lib/helpers';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    const req: any = ctx.req;
    let authUser: AuthUser | undefined;
    if (req && req.cookies && req.cookies['jwt-token']) {
      try {
        authUser = await getAuthUser(req.cookies['jwt-token']);
      } catch (error) {
        console.error(error);
      }
    }

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          props.pageProps.authUser = authUser;
          return <App {...props} />;
        },
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="ar" dir="rtl">
        <Head>
          <MundanaHead />
          <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

const getAuthUser = (jwtToken: string) => {
  return new Promise<AuthUser | undefined>(async (resolve, reject) => {
    try {
      const res = await fetch(`${process.env.APP_URL}/api/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: parseCookies({ ['jwt-token']: jwtToken }),
        },
      });

      const { data: authUser, error } = await res.json();
      if (error) {
        reject(error);
        return;
      }

      resolve(authUser);
    } catch (error) {
      reject(error);
    }
  });
};

export default MyDocument;
