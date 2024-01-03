import { useEffect, useState } from "react";

import TableCoin from "../modules/TableCoin";
import { getConList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";



function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [chart, setChart] = useState(null);


  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await fetch(getConList(page, currency))
        const json = await response.json()
        setCoins(json)
        setLoading(false)
      } catch (error) {
        alert(error.message)
      }
    }
    getData()
  }, [page, currency])

  return (
    <div>
      <h1>Crypto App 💰 | <a href="https://github.com/hasanashrafi">HsN</a></h1>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin coins={coins} isLoading={isLoading} currency={currency} setCurrency={setCurrency} />
      <Pagination page={page} setPage={setPage} />
      <Chart/>
    </div>

  );
}

export default HomePage;
