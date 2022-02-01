import Head from 'next/head';
import ScriptTag from 'react-script-tag';


const NextGeist = () => (
  <div className="container">
    <Head>
      <title>segment-sixty - next geist</title>
      <link rel="icon" href="/favicon.ico" />
      <ScriptTag type="text/javascript" src="../js/lib/p5.min.js"/>
      <ScriptTag type="text/javascript" src="../js/lib/p5.svg.js"/>
    </Head>

    <main>
      <h2 className="subtitle">next geist</h2>

      <div id="sketchContainer"/>
      <ScriptTag type="text/javascript" src="../js/sketches/next-geist_script.js" />
    </main>
</div>
)

export default NextGeist
