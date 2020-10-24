import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import Papa from 'papaparse';
import "./tango.css";
import BlankCard from './image/BlankCard.png';
export default class tango extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            isFlipped: false,
            Tango:undefined,
            English:"",
            Japanese:"",
        };
        this.handleClick = this.handleClick.bind(this);
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
        this.setState({
            English:Tango[a]["English"]
        })
        this.setState({
            Japanese:Tango[a]["Japanese"]
        })
    }

    convertCSVtoArray = (str) =>{
        this.setState({
            Tango:str
        })
        this.SetNextWord(str);
    }

    componentDidMount(){
        this.GetCSV();
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    nextClick = (e) =>{
        const {Tango} = this.state;
        const {isFlipped} = this.state;
        
        if(isFlipped){
            document.getElementById("card").style.visibility = "hidden";
            e.preventDefault();
            this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
            setTimeout(() =>{
                this.SetNextWord(Tango);
                document.getElementById("card").style.visibility = "visible";
            },300)
        }else{
            this.SetNextWord(Tango);
        }
    }

      render() {
        return (<div>
            <h1  className="TangoDaimei">単語長アプリ</h1>
            <div className="cardPlace">
                <ReactCardFlip isFlipped={this.state.isFlipped}  flipSpeedFrontToBack={1.0}
                    flipSpeedBackToFront={1.0} flipDirection="vertical" infinite="true" width="300px">
                    <div id="card">
                        <img id="card" src={BlankCard} onClick={this.handleClick} className="cardSize" />
                        <p>{this.state.English}</p>
                    </div>
                    <div id="card">
                        <img id="card" src={BlankCard} onClick={this.handleClick} className="cardSize" />
                        <p>{this.state.Japanese}</p>
                    </div>         
                </ReactCardFlip>
                <button className='NextButton' onClick={this.nextClick}>次の単語へ</button>       
            </div>
          </div>
        )
      }
  }