import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, CssBaseline } from '@material-ui/core'
import UploadForm from '../components/UploadForm';
import { StylesProvider } from "@material-ui/core/styles";

const Home: NextPage = () => {
  return (
   <>
     <Container component='main' maxWidth='md'>
      <Head>
        <title>Challenge Next</title>
        <meta name="description" content="Challenge Next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <StylesProvider injectFirst>
        <UploadForm/>
      </StylesProvider>
    </Container>
   </>
  )
}
export default Home;
