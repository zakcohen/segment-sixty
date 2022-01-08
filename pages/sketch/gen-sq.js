import Head from 'next/head';
import ScriptTag from 'react-script-tag';


const GenSq = () => (
  <div className="container">
    <Head>
      <title>segment-sixty - Genuary Square Destroyer</title>
      <link rel="icon" href="/favicon.ico" />
      <ScriptTag type="text/javascript" src="../js/lib/p5.min.js"/>
      <ScriptTag type="text/javascript" src="../js/lib/p5.svg.js"/>
    </Head>

    <main>
      <h2 className="subtitle">Genuary square destroyer</h2>

      <div id="sketchContainer"/>
      <ScriptTag type="text/javascript" src="../js/sketches/gen-sq_script.js" />
    </main>
</div>
)

export default GenSq
