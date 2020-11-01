import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import Papa from 'papaparse';
import "./tango.css";
import BlankCard from './image/BlankCard.png';
import OK from "./image/OK.png";
import NG from "./image/NG.png";
import Blank from "./image/blank.png";
import DocumentMeta from 'react-document-meta';

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
    }

    SelectMsg = (Num, Tango) =>{
        var one = Num - 1;
        var three = Num + 1;
        if(one < 0){one = Tango.length - 1;}
        if(three > (Tango.length -1)){three = 0;}
        this.SetTango(one, Num, three, Tango);

    }

    SetTango =(One, Two, Three, Tango) =>{
        var a = Math.floor(Math.random() * 5);
        var Msg = this.state.Select.slice();
        console.log("One:"+ One + " Two:"+Two + " Three:"+Three);
        if(a === 0){
            Msg[0] = Tango[One].Japanese;
            Msg[1] = Tango[Two].Japanese;
            Msg[2] = Tango[Three].Japanese;
        }else if(a === 1){
            Msg[0] = Tango[Two].Japanese;
            Msg[1] = Tango[Three].Japanese;
            Msg[2] = Tango[One].Japanese;
        }else if(a === 2){
            Msg[0] = Tango[Three].Japanese;
            Msg[1] = Tango[One].Japanese;
            Msg[2] = Tango[Two].Japanese;
        }else if(a === 3){
            Msg[0] = Tango[Two].Japanese;
            Msg[1] = Tango[One].Japanese;
            Msg[2] = Tango[Three].Japanese;
        }else if(a === 4){
            Msg[0] = Tango[One].Japanese;
            Msg[1] = Tango[Three].Japanese;
            Msg[2] = Tango[Two].Japanese;          
        }else{
            Msg[0] = Tango[Three].Japanese;
            Msg[1] = Tango[Two].Japanese;
            Msg[2] = Tango[One].Japanese;               
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
        console.log(Tango[0].English)
        var a = Math.floor(Math.random() * (Tango.length));
        this.setState({Num:a})
        this.setState({English:Tango[a].English})
        this.setState({Japanese:Tango[a].Japanese})
        this.SelectMsg(a, Tango);
    }

    convertCSVtoArray = (str) =>{
        this.setState({Tango:str})
        this.SetNextWord(str);
    }

    componentDidMount(){
        this.setState({Tango:this.props.location.state.Num})
        
        this.SetNextWord(this.props.location.state.Num);
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

    ClickNextPage = () =>{
        this.props.history.push({
            pathname:"/Resister",
            state:{Num:this.state.Tango}
        });
    }

    render() {
        const Msg = this.state.Select.slice();
        const button1 = Msg[0];
        const button2 = Msg[1];
        const button3 = Msg[2];
        

        const meta = {
            title: 'Elsammitの英単語アプリ作成してみた',
            description: 'React初心者が英単語アプリを作ってみました。選択式でクイズを答えるだけ！！ゲーム感覚で単語が覚えられるよ',
            canonical: 'http://example.com/path/to/page',
            meta: {
              charset: 'utf-8',
              name: {
                keywords: 'react,meta,document,html,tags'
              }
            }
          };

        return (<div>
            <DocumentMeta {...meta}>
            
            <h1  className="TangoDaimei">単語帳アプリ</h1>
            <div className="cardPlace">
                <ReactCardFlip isFlipped={this.state.isFlipped}  flipSpeedFrontToBack={1.0}
                    flipSpeedBackToFront={1.0} flipDirection="vertical" infinite="true" width="300px">
                    <div id="card">
                        <img id="card" src={BlankCard} alt="card" className="cardSize" />
                        <p>{this.state.English}</p>
                    </div>
                    <div id="card">
                        <img id="card" src={BlankCard} alt="card" className="cardSize" />
                        <p>{this.state.Japanese}</p>
                    </div>         
                </ReactCardFlip>
                <button id="button1" className='NextButton1' onClick={ () => this.nextClick(button1) }>{button1}</button>
                <button id="button2" className='NextButton2' onClick={ () => this.nextClick(button2) }>{button2}</button>
                <button id="button3" className='NextButton3' onClick={ () => this.nextClick(button3) }>{button3}</button>
                <img className="seikai" id="OKNG" src={Blank} alt="" width="200" height="200" />
            </div>
            </DocumentMeta>
            <button className="NextPageButton" onClick={this.ClickNextPage}>登録内容変更⇒</button>
          </div>
        )
      }
  }