import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoapi';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState('CryptoCurrency');
  const { data } = useGetCryptosQuery(100);

  const count = simplified === 'false' ? 12 : 6;
  const demoImage =
    'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  if (isFetching) return <Loader />;

  return (
    <Row gutter={[24, 24]} className='crypto-card-container'>
      {count === 12 ? (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a crypto'
            optionFilterProp='children'
            onChange={(value) => setnewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='CryptoCurrency'>CryptoCurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      ) : null}
      {cryptoNews?.value.map((news, index) => {
        return (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>
                    {news.name}
                  </Title>

                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt='news'
                    height='100'
                    width='100'
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar
                      src={
                        news?.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                    />
                    <Text className='provider-name'>
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default News;
