import React, { Component } from 'react';
import Papa from 'papaparse';
import "./resistword.css";

export default class resister extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            TangoList:undefined,
            ResistTangoList:undefined,
        };
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
    convertCSVtoArray = (str) =>{
        this.setState({TangoList:str})
    }


    componentDidMount(){
        //this.setState({TangoList:this.props.location.state.Num})
        this.GetCSV();
    }

    CheckedAll = () =>{
        console.log("test");
        for(var i in this.state.TangoList){
            var IdName = "chbox"+i;
            document.getElementById(IdName).checked = 
                document.getElementById("Allcheck").checked;
        }
    }

    ClickMondaihe = () =>{
        var list = [];
        var count = 0;
        for(var i in this.state.TangoList){
            var IdName = "chbox"+i;
            
            if(document.getElementById(IdName).checked == true){
                count ++ ;
                list.push(this.state.TangoList[i]);
            }
        }

        if(count > 3){
            this.setState({ResistTangoList:list})
            this.props.history.push({
                pathname:"/SelectMondai",
                state:{Num:list}
            });
        }
    }

    render() {
        const {TangoList} = this.state;
        var list = [];
        for(var i in TangoList){
            var japanese = TangoList[i]["Japanese"];
            var english = TangoList[i]["English"];
            var idname = "chbox"+i;
            list.push(
                <tbody>
                    <td><input type="checkbox" id={idname} className="listcheck" /></td>
                    <td>{japanese}</td>
                    <td>{english}</td>
                </tbody>
            )            
        }
    
        return (
        <div>
            <p className="TangoDaimei">単語登録ページ</p>
           <button className="sidebutton1" onClick={this.ClickMondaihe}>単語問題へ⇒</button>
            <div className="AllCheckFont">
                <input type="checkbox" id="Allcheck" className="Allcheck" onClick={this.CheckedAll}/>全選択<br/>
            </div>
            <table border="1">
                <tr>
                    <th>チェック</th>
                    <th>英語</th>
                    <th>日本語</th>
                </tr>
                {list}           
            </table>
      </div>
    );
  }
}