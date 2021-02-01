import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {getIsAuth} from "../store/reducers/auth/getters";

const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state),
    }
}

const storeEnhancer = connect(mapStateToProps);

const syncAuth = (Component, needAuth = true, url = '/login') =>
    class extends React.Component {


        componentWillMount() {
            this.checkAuth(this.props);
        }


        componentDidUpdate(data) {
            if (this.props.isAuth !== data.isAuth)
                this.checkAuth(this.props);
        }


        checkAuth(data) {
            if (data.isAuth !== needAuth) this.pushUrl(data);
        }

        pushUrl(data) {
            data.history.push(url);
        }


        render() {
            const {isAuth, ...rest} = this.props;
            return <Component {...rest} />
        }
    }

export default compose(storeEnhancer, syncAuth);