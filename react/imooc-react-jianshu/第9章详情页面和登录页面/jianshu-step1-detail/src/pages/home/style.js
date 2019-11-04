import styled from 'styled-components'

export const HomeWrapper = styled.div`
  overflow: hidden;
  width: 960px;
  margin: 0 auto;
`;

export const HomeLeft = styled.div`
  margin-left: 15px;
  padding-top: 30px;
  width: 625px;
  float: left;
  .banner-img{
    width: 625px;
    height: 270px;
  }
`;

export const HomeRight = styled.div`
  width: 280px;
  float: right;
`;

export const TopicWrapper = styled.div`
  overflow: hidden;
  padding: 20px 0 10px 0;
  margin-left: -18px;
  border-bottom: 1px solid #dcdcdc;
`;

export const TopicItem = styled.div`
  float: left;
  background: #F7F7F7;
  height: 32px;
  line-height: 32px;
  margin-left: 18px;
  margin-top: 10px;
  padding-right: 10px;
  font-size: 14px;
  color: #000;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  .topicPic{
    display: block;
    float: left;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    margin-bottom: 18px;
  }
`;

export const ListItem = styled.div`
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #dcdcdc;
  .listItemPic{
    display: block;
    width: 125px;
    height: 100px;
    float: right;
  }
`;

export const ListInfo = styled.div`
  width: 500px;
  float: left;
  .title{
    font-size: 18px;
    line-height: 27px;
    font-weight: bold;
    color: #333;
  }
  .desc{
    line-height: 24px;
    font-size: 13px;
    color: #999;
  }
`;

export const LoadMore = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 30px 0;
  background: #a5a5a5;
  text-align: center;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
`;

export const BackTop = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 12px;
  cursor: pointer;
`;

export const RecommendWrapper = styled.div`
   margin: 30px 0;
   width: 280px;
`;

export const RecommendItem = styled.div`
  width: 280px;
  height: 50px;
  // 接收Recommend.js里面属性imgUrl传递过来的值
  background: url(${(props) => props.imgUrl});
  background-size: contain;
`;


export const WriterWrapper = styled.div`
  width: 278px;
  border-radius: 3px;
  height: 300px;
  line-height: 300px;
  text-align: center;
`;

export const WriterItem = styled.div`
  overflow: hidden;
  padding: 20px 0;
  .writerItemPic{
    display: block;
    width: 48px;
    height: 48px;
    border-radius: 24px;
    float: left;
  }
`;

export const WriterInfo = styled.div`
  width: 200px;
  float: left;
  .title{
    font-size: 14px;
    line-height: 15px;
    font-weight: bold;
    color: #333;
    float: left;
    padding-top: 5px;
    margin-left: 10px;
    display: block;
    cursor: pointer;
  }
  .desc{
    font-size: 12px;
    line-height: 30px;
    color: #969696;
    float: left;
    padding-top: 2px;
    margin-left: 10px;
    display: block;
    cursor: pointer;
  }
`;
