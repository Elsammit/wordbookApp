import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import Papa from 'papaparse';
import "./tango.css";
import BlankCard from './image/BlankCard.png';
import OK from "./image/OK.png";
import NG from "./image/NG.png";
import Blank from "./image/blank.png";
export default class tango extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            isFlipped: false,
            Tango:undefined,
            English:"",
            Japanese:"",
            Num:0,
            Select:["", "", ""]
        };
        this.handleClick = this.handleClick.bind(this);
    }

    SelectMsg = (Num) =>{
        const {Tango} = this.state;
        
        var one = Num - 1;
        var three = Num + 1;
        if(one < 0){one = Tango.length;}
        if(three > Tango.length){three = 0;}
        this.SetTango(one, Num, three);

    }

    SetTango =(One, Two, Three) =>{
        var a = Math.floor(Math.random() * 5);
        const {Tango} = this.state;
        var Msg = this.state.Select.slice();

        if(a === 0){
            Msg[0] = Tango[One]["Japanese"];
            Msg[1] = Tango[Two]["Japanese"];
            Msg[2] = Tango[Three]["Japanese"];
        }else if(a === 1){
            Msg[0] = Tango[Two]["Japanese"];
            Msg[1] = Tango[Three]["Japanese"];
            Msg[2] = Tango[One]["Japanese"];
        }else if(a === 2){
            Msg[0] = Tango[Three]["Japanese"];
            Msg[1] = Tango[One]["Japanese"];
            Msg[2] = Tango[Two]["Japanese"];
        }else if(a === 3){
            Msg[0] = Tango[Two]["Japanese"];
            Msg[1] = Tango[One]["Japanese"];
            Msg[2] = Tango[Three]["Japanese"];
        }else if(a === 4){
            Msg[0] = Tango[One]["Japanese"];
            Msg[1] = Tango[Three]["Japanese"];
            Msg[2] = Tango[Two]["Japanese"];          
        }else{
            Msg[0] = Tango[Three]["Japanese"];
            Msg[1] = Tango[Two]["Japanese"];
            Msg[2] = Tango[One]["Japanese"];               
        }
        this.setState({Select:Msg})
    }



    GetCSV = () =>{
        var reqq = new XMLHttpRequest();
        reqq.open("get", 'tango.csv',true);
        reqq.send(null);

        reqq.onload = () =>{
            Papa.parse(reqq.responseText,{
                header:true,
                delimiter:',',

                complete:(buf) =>{
                    console.log(buf.data);
                    this.convertCSVtoArray(buf.data);
                }
            })
        }
    }

    SetNextWord = (Tango) =>{
        var a = Math.floor(Math.random() * (Tango.length + 1));
        this.setState({Num:a})
        this.setState({English:Tango[a]["English"]})
        this.setState({Japanese:Tango[a]["Japanese"]})
        this.SelectMsg(a);
    }

    convertCSVtoArray = (str) =>{
        this.setState({Tango:str})
        this.SetNextWord(str);
    }

    componentDidMount(){
        this.GetCSV();
    }

    handleClick(e) {
        /*
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        */
    }

    nextClick = (buttonName) =>{
        const {Tango} = this.state;
        
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        if(buttonName === this.state.Japanese){
            document.getElementById("OKNG").src = OK;
        }else{
            document.getElementById("OKNG").src = NG;
        }
        document.getElementById("button1").disabled = true;
        document.getElementById("button2").disabled = true;
        document.getElementById("button3").disabled = true;

        setTimeout(() =>{
            document.getElementById("card").style.visibility = "hidden";
            this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
            setTimeout(() =>{
                this.SetNextWord(Tango);
                document.getElementById("card").style.visibility = "visible";
                document.getElementById("OKNG").src = Blank;
                document.getElementById("button1").disabled = false;
                document.getElementById("button2").disabled = false;
                document.getElementById("button3").disabled = false;
            },300)
        },1500)
    }

      render() {
        const Msg = this.state.Select.slice();
        const button1 = Msg[0];
        const button2 = Msg[1];
        const button3 = Msg[2];
        return (<div>
            <h1  className="TangoDaimei">単語長アプリ</h1>
            <div className="cardPlace">
                <ReactCardFlip isFlipped={this.state.isFlipped}  flipSpeedFrontToBack={1.0}
                    flipSpeedBackToFront={1.0} flipDirection="vertical" infinite="true" width="300px">
                    <div id="card">
                        <img id="card" src={BlankCard} onClick={this.handleClick} alt="card" className="cardSize" />
                        <p>{this.state.English}</p>
                    </div>
                    <div id="card">
                        <img id="card" src={BlankCard} onClick={this.handleClick} alt="card" className="cardSize" />
                        <p>{this.state.Japanese}</p>
                    </div>         
                </ReactCardFlip>
                <button id="button1" className='NextButton1' onClick={ () => this.nextClick(button1) }>{button1}</button>
                <button id="button2" className='NextButton2' onClick={ () => this.nextClick(button2) }>{button2}</button>
                <button id="button3" className='NextButton3' onClick={ () => this.nextClick(button3) }>{button3}</button>
                <img className="seikai" id="OKNG" src={Blank} alt="" width="200" height="200" />
            </div>
          </div>
        )
      }
  }