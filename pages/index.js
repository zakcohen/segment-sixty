import Head from 'next/head'

const Home = () => (
  <div className="container">
    <Head>
      <title>segment-sixty</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        segment-sixty
      </h1>

      <p className="description">
        Things will appear.
      </p>
    </main>

    <footer>
      There will be more.
    </footer>
  </div>
)

export default Home
