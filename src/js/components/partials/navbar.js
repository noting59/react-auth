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
    handler(e) {
        this.menuShowHide(e);
        this.logout(e);
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
        const { isAuthenticated, user } = this.props;

        const userLinks = (
            <a className="auth-button__link" href="/user" data-toggle="modal">
                <i className="fa fa-user" aria-hodden='true'>User</i>
            </a>
        );

        const guestLinks = (
            <div className="auth-button">
                <Link className="auth-button__link" to="/login">
                    <i className="fa fa-sign-in" aria-hodden='true'> Login</i>
                </Link>
                <Link className="auth-button__link" to="/signup">
                    <i className="fa fa-pencil-square-o" aria-hodden='true'> Register</i>
                </Link>
            </div>
        );

        return (
            <header className="header clearfix">
                <div className={classnames("overlay-menu", { 'overlay-menu--open': this.state.menu })}>
                    <button className="overlay-menu__close-button" onClick={this.menuShowHide.bind(this)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <nav>
        				<ul>
        					<li><a href="/" onClick={this.menuShowHide.bind(this)}>Home</a></li>
        					<li><a href="/about" onClick={this.menuShowHide.bind(this)}>About</a></li>
        					<li><a href="/contact" onClick={this.menuShowHide.bind(this)}>Contact</a></li>
        				</ul>
        			</nav>
                </div>
                <div className="header__menu-button" onClick={this.menuShowHide.bind(this)}>
                    <i className='fa fa-bars' aria-hodden='true'></i>
                </div>

                { isAuthenticated ? userLinks : guestLinks }

                <div className='header__logo'>
                    <Link to="/">SportShedule</Link>
                </div>
            </header>
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
