
import styles from "./Layout.module.css"

function Layout({ children }) {
    return (
        <>
            <header className={styles.header}>
                <h1>Crypto App 💰 | <a href="https://github.com/hasanashrafi">HsN</a></h1>
            </header>

            {children}

            <footer className={styles.footer}>
                <p>Developed by HsN</p>
            </footer>
        </>
    );
}

export default Layout;

