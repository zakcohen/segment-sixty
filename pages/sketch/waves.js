import Head from 'next/head';
import ScriptTag from 'react-script-tag';


const Waves = () => (
  <div className="container">
    <Head>
      <title>segment-sixty - waves</title>
      <link rel="icon" href="/favicon.ico" />
      <ScriptTag type="text/javascript" src="p5.min.js"/>
    </Head>

    <main>
      <h1 className="title">
        TEST
      </h1>

      
      <ScriptTag type="text/javascript" src="sketches/waves_script.js" />
    </main>
</div>
)

export default Waves