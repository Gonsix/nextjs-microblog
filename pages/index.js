import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout';
import utilStyle from "../styles/utils.module.css";
import {getPostsData }from "../lib/post"


// SSG の場合 
export async function getStaticProps(){
  const allPostsData = getPostsData(); // id, title, date, thumbnail
  console.log(allPostsData);

  return {
    props : {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
   <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p> 
        とある大学生 / ExpertなSystemを作りたい / 暗号・ブロックチェーンと自然言語処理を勉強中 / Pythonしか勝たん🔥
      </p>
    </section>

    <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`} >
      <h2>📝ブログ</h2>
      <div className={styles.grid} >
        {allPostsData.map(({id, title, date, thumbnail}) => (
          <article key={id} >
              
            <Link href={`/posts/${id}`}> 
              <img 
                src={`${thumbnail}`}
                className={styles.thumbnailImage}/>
            </Link>
            <Link href={`/posts/${id}`}> 
              {/* a タグの代わりに使う */}
              <h1 className={utilStyle.boldText}>{title}</h1> 
            </Link>

              <small className={utilStyle.lightText}>{date}</small>
          </article>
        ))}
      </div>
    </section>
   </Layout>
  )
}
