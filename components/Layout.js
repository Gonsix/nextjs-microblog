import Head from "next/head";
import styles from "./layout.module.css"; 
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name="Gonsix"
export const siteTitle = "Nextjs Blog"

function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                {home? (
                    <>
                        <Link href="/" className={utilStyles.heading2Xl} >
                        <div>
                        <img src="/images/gorimeta.jpeg" width="128" height="128" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} />
                        <br/>
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                        </div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/">
                        <img src="/images/gorimeta.jpeg" width="128" height="128" className={`${utilStyles.borderCircle}`} />
                        <br/>
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                        </Link>
                    </>
                )}
                

            </header>
            <main>
                {children}
            </main>
            {!home && (
                <div>
                    <Link href="/" className={utilStyles.link}>← ホームヘ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;
