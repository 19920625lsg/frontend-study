// 不直接用css时为了防止样式干扰，在这里把样式限制在每个组件内
import styled from 'styled-components';
import logoPic from '../../static/logo.png'

export const HeaderWrapper = styled.div`
  position: relative;
  height: 56px;
  border-bottom: 1px solid #f0f0f0;
`;

export const Logo = styled.a.attrs({
    href: '/'
})`
  position: absolute;
  top: 12px;
  left: 100px;
  display: block;
  width: 130px;
  height: 30px;
  background: url(${logoPic});
  background-size: contain;
`;

export const Nav = styled.div`
  width: 960px;
  height: 100%;
  padding-right: 70px;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const NavItem = styled.div`
  line-height: 56px;
  padding: 0 15px;
  font-size: 17px;
  color: #333;
  // &. 表示修饰类
  &.left{
    float: left;
  }
  &.right{
    float: right;
    color: #969696;
  }
  &.active{
    color: #ea6f5a;
  }
`;

export const SearchWrapper = styled.div`
  // 防止页面错乱
  float: left;
  position: relative;
  .iconfont{
    // 搜索按钮外面的圆圈
    position: absolute;
    right: 5px;
    bottom: 4px;
    width: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    &.focused{
      background: #777;
      color: #ffffff;
    }
  }
  // 搜索框的动画效果
    .slide-enter{
      transition: all .2s ease-out;
    }
    .slide-enter-active{
      width: 240px;
    }
    .slide-exit{
      transition: all .2s ease-out;
    }
    .slide-exit-active{
      width: 160px;
    }
`;

export const NavSearch = styled.input.attrs({
    placeholder: '搜索'
})`
  width: 160px;
  height: 38px;
  padding: 0 35px 0 20px;
  margin-top: 9px;
  margin-left: 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 19px;
  background: #eee;
  font-size: 14px;
  color: #666;
  &::placeholder{
    color: #999;
  }
  &.focused{
    width: 240px;
  }
`;

export const Addition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 56px;
`;

export const Button = styled.div`
  float: right;
  margin-top: 9px;
  margin-right: 20px;
  padding: 0 20px;
  line-height: 38px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 14px;
  &.reg{
    color: #ec6149;
  }
  &.writing{
     color: #fff;
     background-color: red;
  }
`;
