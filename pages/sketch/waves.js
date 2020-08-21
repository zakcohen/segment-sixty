import Head from 'next/head';
import ScriptTag from 'react-script-tag';


const Waves = () => (
  <div className="container">
    <Head>
      <title>segment-sixty - waves</title>
      <link rel="icon" href="/favicon.ico" />
      <ScriptTag type="text/javascript" src="../js/lib/p5.min.js"/>
    </Head>

    <main>
      <h2 className="subtitle">waves</h2>

      <div id="sketchContainer"/>
      <ScriptTag type="text/javascript" src="../js/sketches/waves_script.js" />
    </main>
</div>
)

export default Waves
