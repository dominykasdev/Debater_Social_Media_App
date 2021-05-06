import React from "react";
import { connect } from "react-redux";
import GoogleAuth from "../../GoogleAuth";
// import { toggleMenu } from '../../actions'
// import menuImg from '../../images/menu.png'

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
                <div className="right aligned four wide column">
                    <GoogleAuth />
                </div>
            </div>
        )
    }
}

// const title = "Crypto Web App";

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps, { GoogleAuth })(Header);