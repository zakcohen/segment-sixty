import Head from 'next/head';
import ScriptTag from 'react-script-tag';


const Gen10 = () => (
  <div className="container">
    <Head>
      <title>segment-sixty - Genuary 10,000</title>
      <link rel="icon" href="/favicon.ico" />
      <ScriptTag type="text/javascript" src="../js/lib/p5.min.js"/>
      <ScriptTag type="text/javascript" src="../js/lib/p5.svg.js"/>
    </Head>

    <main>
      <h2 className="subtitle">Genuary 10,000</h2>

      <div id="sketchContainer"/>
      <ScriptTag type="text/javascript" src="../js/sketches/gen-10_script.js" />
    </main>
</div>
)

export default Gen10
