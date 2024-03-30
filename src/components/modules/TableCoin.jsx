import { RotatingLines } from "react-loader-spinner";

import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"

import styles from "./TableCoin.module.css"
import { marketChart } from "../../services/cryptoApi";

function TableCoin({ coins, isLoading, currency, setChart }) {

    return (
        <div className={styles.container}>
            {isLoading ? <RotatingLines /> : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Coin</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h</th>
                            <th>Total Volume</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin) =>
                            <TableRow currency={currency} coin={coin} key={coin.id} setChart={setChart} />
                        )}
                    </tbody>
                </table>)}
        </div>
    );
}

export default TableCoin;

const TableRow = ({ coin,currency, setChart }) => {
    const {
        id,
        name,
        symbol,
        image,
        current_price,
        price_change_percentage_24h,
        total_volume,
    } = coin;
    const showHandler = async () => {
        try {
            const res = await fetch(marketChart(id))
            const json = await res.json()
            setChart({ ...json, coin })
        } catch (error) {
            setChart(null)
        }

    }
    return (
        <tr>
            <td>
                <div className={styles.symbol} onClick={showHandler}>
                    <img src={image} />
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>

            <td>{name}</td>

            <td><span>{currency}</span> {current_price.toLocaleString()}</td>

            <td className={price_change_percentage_24h > 0 ? styles.success : styles.error}>
                {price_change_percentage_24h.toFixed(2)}%
            </td>

            <td>{total_volume.toLocaleString()}</td>

            <td>
                <img src={price_change_percentage_24h > 0 ? chartUp : chartDown} />
            </td>
        </tr>)
}