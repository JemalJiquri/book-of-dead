import React from 'react';

import Globals from './Globals'



class HelpPage extends React.Component {
    state = {
        visible: false
    }
    descUrl = ""
    componentDidMount() {
        Globals.HelpPage = this
        if (window.SETTINGS.ASSETPATH.length > 0) {
            this.descUrl = window.SETTINGS.ASSETPATH + "/" + window.SETTINGS.GAME + "/desc.html"
          } else {
            this.descUrl = "./desc.html"
          }


    }

    closeHelp() {
        this.setState({
            visible: false
        })
    }

    openHelp() {
        this.setState({
            visible: true
        })
    }

    isOpened(){
        return this.state.visible
    }

    maincenter = {
        position: 'fixed',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    };

    maincenterhidden = {
        display: 'none'
    }

    closebtn = {
        position: 'absolute',
        backgroundColor: 'rgb(105, 116, 120)',
        padding: '1.5px 7px',
        left: '100%',
        marginLeft: '-16px',
        marginTop: '-9px',
        borderRadius: '50%',
        border: '2px solid rgb(255, 255, 255)',
        color: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.1) -3px 1px 6px 0px',
        cursor: 'pointer'
      }
      
      helppage = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        WebkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '80%'
      }



    render() {
        return <div style={this.state.visible ? this.maincenter : this.maincenterhidden}>
            <div style={this.helppage} >
                <div>
                    <div id="xbtnhelp" style={this.closebtn} onClick={() => this.closeHelp()} >X</div>
                </div>
                <iframe title="help page" src={this.descUrl} style={{ border: "0px" }} height="100%" width="100%" />
            </div>
        </div>;
    }
}


export default HelpPage;
