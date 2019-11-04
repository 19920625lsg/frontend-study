import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from "./App";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Buttons from "./pages/ui/buttons";
import NotFound404 from "./pages/err/404";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";
import Notification from "./pages/ui/notification";
import Messages from "./pages/ui/messages";
import MyTabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousels";
import LoginForm from "./pages/form/login";
import RegisterForm from "./pages/form/register";
import BaseTable from "./pages/table/base";
import HighTable from "./pages/table/high";
import City from "./pages/city";
import Order from "./pages/order";
import Rich from "./pages/rich";
import Permission from "./pages/permission";

class MyRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path='/admin' render={() =>
                        <Admin>
                            {/*Switch保证一旦匹配到就会退出，如果没有匹配到的最后就会匹配到错误页面*/}
                            <Switch>
                                <Route path='/admin/ui/buttons' component={Buttons}/>
                                <Route path='/admin/ui/modals' component={Modals}/>
                                <Route path='/admin/ui/loadings' component={Loadings}/>
                                <Route path='/admin/ui/notification' component={Notification}/>
                                <Route path='/admin/ui/messages' component={Messages}/>
                                <Route path='/admin/ui/tabs' component={MyTabs}/>
                                <Route path='/admin/ui/gallery' component={Gallery}/>
                                <Route path='/admin/ui/carousels' component={Carousels}/>
                                <Route path='/admin/form/login' component={LoginForm}/>
                                <Route path='/admin/form/register' component={RegisterForm}/>
                                <Route path='/admin/table/basic' component={BaseTable}/>
                                <Route path='/admin/table/high' component={HighTable}/>
                                <Route path='/admin/city' component={City}/>
                                <Route path='/admin/order' component={Order}/>
                                <Route path='/admin/rich' component={Rich}/>
                                <Route path='/admin/permission' component={Permission}/>
                                <Route component={NotFound404}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route path='/login' component={Login}/>
                </App>
            </HashRouter>
        );
    }
}

export default MyRouter;
