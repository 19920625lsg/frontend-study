import React, {Component} from 'react'

class Info extends Component {
    render() {
        return (
            <div>
                {/*infoId就是在router.js里指定地*/}
                测试动态路由，动态路由的值为:{this.props.match.params.infoId}
            </div>
        );
    }
}

export default Info;
