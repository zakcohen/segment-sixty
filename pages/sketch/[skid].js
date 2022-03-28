import { useRouter } from 'next/router'
import Head from 'next/head';
import Script from 'next/script'

const Sketch = () => {
  const router = useRouter()
  const { skid } = router.query

  const title = ("" + skid).replace(/-/g, ' ')
  const script = "../js/sketches/" + skid + "_script.js"

  return (
    <div className="container">
        <Head>
            <title>segment-sixty - {title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Script src="../js/lib/p5.min.js" strategy='beforeInteractive'/>
        <Script src="../js/lib/p5.svg.js" strategy='beforeInteractive'/>
        <main>
            <h2 className="subtitle">{title}</h2>
            <div id="sketchContainer"/>
            <Script src={script} />
        </main>
    </div>)
}

export default Sketch
