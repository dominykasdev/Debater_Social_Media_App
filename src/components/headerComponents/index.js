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
            <div className="header">
                <h2 className="title centered">Debater</h2>
                {/* <button className="menuBtn left" onClick={() => this.props.toggleMenu()}><img src={menuImg} alt="menuImg" /></button> */}
                <GoogleAuth />
            </div>
        )
    }
}

// const title = "Crypto Web App";

const mapStateToProps = (state) => {
    return { };
}

export default connect(mapStateToProps, { GoogleAuth })(Header);