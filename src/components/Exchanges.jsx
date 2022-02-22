import React, { useState } from 'react';
import { Row, Col, Collapse, Typography, Avatar } from 'antd';
import { useGetBitcoinExhangesQuery } from '../services/cryptoapi';
import millify from 'millify';
import Loader from './Loader';
const { Panel } = Collapse;
const { Title } = Typography;

const Exchanges = () => {
  const { data, isFetching } = useGetBitcoinExhangesQuery();
  if (isFetching) {
    return <Loader />;
  }

  console.log(data);

  return (
    <>
      <Title>Bitcoin Exchanges</Title>

      <Row>
        <Col span={6}>Exhanges</Col>
        <Col span={6}>24 Trade Volume (USD)</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Price (USD)</Col>
      </Row>
      <Col span={24}>
        {data?.data?.exchanges.map((exchange) => (
          <Row style={{ width: '100%' }} className='exchange-card'>
            <Col className='exchange-col1' span={6}>
              {' '}
              <img
                className='exchange-image'
                src={exchange.iconUrl}
                height='30'
                width='30'
              />
              {exchange.name}
            </Col>
            <Col span={6}>{millify(exchange['24hVolume'])}</Col>
            <Col span={6} className='exchange-col2'>
              {exchange.numberOfMarkets}
            </Col>
            <Col span={6}>{millify(exchange.price)}</Col>
          </Row>
        ))}
      </Col>
    </>
  );
};
export default Exchanges;
