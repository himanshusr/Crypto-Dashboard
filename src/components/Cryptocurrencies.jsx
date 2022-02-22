import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoapi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified === 'false' ? 100 : 10;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  if (isFetching) return <Loader />;

  return (
    <>
      {count === 100 ? (
        <div className='search-crypto'>
          <Input
            placeholder='Search Crypto Currency'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      ) : null}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((crypto) => {
          return (
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.id}>
              <Link to={`/crypto/${crypto.uuid}`}>
                <Card
                  title={`${crypto.rank}. ${crypto.name}`}
                  extra={
                    <img
                      className='crypto-image'
                      src={crypto.iconUrl}
                      hoverable
                    />
                  }
                >
                  <p>Price : {millify(crypto.price)}</p>
                  <p>MarketCap : {millify(crypto.marketCap)}</p>
                  <p>Daily Change : {millify(crypto.change)} %</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
