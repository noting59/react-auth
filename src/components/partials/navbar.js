import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import classnames from 'classnames';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: false
        };
    }

    menuShowHide(e) {
        this.setState({ menu: !this.state.menu });
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.context.router.push('/');
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link onClick={this.menuShowHide.bind(this)} to="/signup">Sign Up</Link></li>
                <li><Link onClick={this.menuShowHide.bind(this)} to="/login">Login</Link></li>
            </ul>
        )
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a onClick={this.menuShowHide.bind(this)} type="button" className="navbar-menu">
                            <span className="navbar-menu-icon"></span>
                            <span className="navbar-menu-icon"></span>
                            <span className="navbar-menu-icon"></span>
                        </a>
                        <Link to="/" className="navbar-brand">SportShedule</Link>
                    </div>

                </div>
                <div className={classnames("navbar-collapse navbar-dropdown", { 'navbar-dropdown-active': this.state.menu })}>
                { isAuthenticated ? userLinks : guestLinks }
                </div>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

NavigationBar.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
