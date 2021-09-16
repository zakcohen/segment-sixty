import Head from 'next/head';
import ScriptTag from 'react-script-tag';


const AphexJones = () => (
  <div className="container">
    <Head>
      <title>segment-sixty - aphex jones</title>
      <link rel="icon" href="/favicon.ico" />
      <ScriptTag type="text/javascript" src="../js/lib/p5.min.js"/>
      <ScriptTag type="text/javascript" src="../js/lib/p5.svg.js"/>
    </Head>

    <main>
      <h2 className="subtitle">aphex jones</h2>

      <div id="sketchContainer"/>
      <ScriptTag type="text/javascript" src="../js/sketches/aphex-jones_script.js" />
    </main>
</div>
)

export default AphexJones
