import React from "react";
import { connect } from "react-redux";
import GoogleAuth from "../../GoogleAuth";
// import { signIn, signOut } from '../../actions';
// import { toggleMenu } from '../../actions'

class Header extends React.Component {

    // componentDidMount() {
    //     this.props.toggleMenu();
    // }

    render() {
        // console.log(this.props.menu)
        return (
            <div className="ui grid header centered aligned sixteen wide column">
                <div className="four wide column">
                    <button className="ui orange compact button inverted"><i className="align bars icon" />Menu</button>
                    {/* <button className="menuBtn left" onClick={() => this.props.toggleMenu()}><img src={menuImg} alt="menuImg" /></button> */}
                </div>
                <div className="eight wide column">
                    <a className="ui header center aligned orange" href="/"><h2><i className="bullhorn icon orange" />Debater</h2></a>
                </div>
                {this.renderButtons()}
                {/* <div className="right aligned four wide column">
                    <a className="ui orange compact button inverted" href="/register"><i className="align signup icon" />Register</a>
                    <a className="ui orange compact button inverted" href="/login"><i className="align sign-in icon" />Login</a>
                </div> */}
            </div>
        )
    }

    renderButtons() {
        if (this.props.isSignedIn) {
            return (
                <div className="right aligned four wide column">
                    <a className="ui orange compact button inverted" href={`/user/${this.props.username}`}><i className="align user icon" />Profile</a>
                </div>
            );
        } else {
            return (
                <div className="right aligned four wide column">
                    <a className="ui orange compact button inverted" href="/register"><i className="align signup icon" />Register</a>
                    <a className="ui orange compact button inverted" href="/login"><i className="align sign-in icon" />Login</a>
                    {/* <GoogleAuth /> */}
                </div>
            );
        }
    }
}

// const title = "Crypto Web App";

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, username: state.auth.userId };
}

export default connect(mapStateToProps, { GoogleAuth })(Header);