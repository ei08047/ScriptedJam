/**
 * Created by ei08047 on 01/05/2017.
 */
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PlayGround2 from "./Playground2";
const deepstream = require('deepstream.io-client-js');


class Room extends Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state ={
            auth : props.auth,
            roomname : props.match.params.roomname,
            owner : '',
            users: [],
            currentPlayGrounds:[{synthDef: {ugen: "flock.ugen.tri",freq: 440}} , {synthDef: {ugen: "flock.ugen.tri",freq: 100}}]
        };
        this.recordName ='';
        this.playList=[];
        this.enterRoom = this.enterRoom.bind(this);
        this.addPlay = this.addPlay.bind(this);
        this.getRoomData = this.getRoomData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.eventCallback = this.eventCallback.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
        console.log(this.state.value);
    }

    eventCallback(data) {
        //callback for incoming events
        var add = true;
        for(var i in this.state.currentPlayGrounds)
        {
            if(this.state.currentPlayGrounds[i] === data)
            {
                add = false;
            }else{}
        }
        if(add)
        {
            var temp = this.state.currentPlayGrounds;
            temp.push(data);
            this.setState({currentPlayGrounds:temp});
        }

    }

    getRoomData(){
        console.log("fetching room "+this.state.roomname + "   data");
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    console.log('connection on getRoomData');

                    this.recordName = 'rooms/' + this.state.roomname;
                    const roomRec = s.client.record.getRecord(this.recordName);

                    //this.playList = s.client.record.getList(this.recordName + '/playgrounds');
                    //this.playList.subscribe( (data) => {this.setState({currentPlayGrounds:data})} , true );


                    //Subscribing to an event
                    s.client.event.subscribe(this.recordName, this.eventCallback);


                    roomRec.whenReady( ()=>{
                        console.log(roomRec);
                        const ow = roomRec.get('owner');
                        console.log("owner  "+ow);
                        this.setState({owner:ow });
                        const u = roomRec.get('users');
                        this.setState({users:u });
                        const pl = roomRec.get('playgrounds');
                        this.setState({currentPlayGrounds : pl});
                    });

                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    enterRoom(){
        console.log("entering room "+this.state.roomname);
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    console.log('connection on entering room: '+this.state.roomname);
                    s.client.event.subscribe('rooms/'+this.state.roomname , data => {
                        // handle published data
                        console.log("i am subs 'rooms/' " + this.state.roomname);
                        console.log(data);
                        alert(data);
                    });
                    const roomRec = s.client.record.getRecord('rooms/'+this.state.roomname);
                    roomRec.whenReady(()=>{
                        var curr = this.state.users;
                        if (curr.indexOf(this.state.auth.username) > -1) {
                            console.log('already in the room');
                        } else {
                            curr.push(this.state.auth.username);
                            roomRec.set('users',curr);
                            this.setState({users:curr});
                        }
                    })
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    addPlay(event) {
        var a = JSON.parse(this.state.value);
        var temp = this.state.currentPlayGrounds;
        temp.push(a);
        this.setState({currentPlayGrounds: temp});

        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {

                    /*
                    const t =  s.client.getUid();
                    const playRec = s.client.record.getRecord('playgrounds/' + t );
                    playRec.whenReady( ()=>{
                        const playList = s.client.record.getList('playgrounds');
                        playList.addEntry(t);

                        const u = playRec.get('playgrounds');
                        this.setState({currentPlayGrounds:u });
                     });
*/
                        let room = s.client.record.getRecord('rooms/' + this.state.roomname);
                        room.set('playgrounds', temp);
                        // Client B
                        s.client.event.emit('rooms/' + this.state.roomname, a);

                    //this.recordName = 'shared/rooms/' + this.state.roomname + '/' + 'playgrounds';
                    //this.playList = s.client.record.getList(this.recordName );
                    //this.playList.subscribe( (data) => {this.setState({currentPlayGrounds:data})} , true );
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }

    }

    render(){
        return (
            <div className="Room" >
                <h1>{this.state.roomname}</h1>
                <h2>{this.state.owner}</h2>
                <ul>{
                    this.state.users.map( (member) =>
                        <li>{member}</li>)
                }</ul>
                <ul>{
                    this.state.currentPlayGrounds.map( (synth) =>
                        <li> <PlayGround2 synth={synth} /> </li>)
                }</ul>
                <div className="AddPlayGround">
                    <p>New playground</p>
                    <TextareaAutosize cols={50} minRows={10} maxRows={20} defaultValue={""}  onChange={this.handleChange} />
                    <button onClick={this.addPlay} >Add</button>
                </div>
            </div>

        )
    } // <TextareaAutosize cols={50} minRows={10} maxRows={20} defaultValue={JSON.stringify(synth, undefined, 4)}/>
    //<Test roomname={this.state.roomname} auth={this.state.auth}/>

    componentDidMount(){
        /* global flock, fluid*/
        fluid.registerNamespace("myStuff");
        this.environment = flock.init();
        this.getRoomData();
        //this.enterRoom();
        /*
         var list = cli.record.getList('users/' + this.state.auth.username + 'rooms/' + this.state.roomname + 'playgrounds/');
         const r = this.state.auth.client.record.getRecord('rooms/'+ this.state.roomname);
         console.log("Room" + this.state.roomname);
         console.log(r);
         console.log("username"+this.props.auth.username);
         this.currentMembers.push(this.state.auth.username);
         */
        this.environment.start();
        console.log('component Room mounted');
    }

    componentWillUnmount(){
        /*
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    console.log('connection on componentWillUnmount: '+this.state.roomname);
                    //TODO:unsubcribe
                    const roomRec = s.client.record.getRecord('shared/rooms/'+this.state.roomname);
                    roomRec.whenReady(()=>{
                        var curr = this.state.users;
                        if (curr.indexOf(this.state.auth.username) > -1) {
                            curr.remove(this.state.auth.username);
                            roomRec.set('users',curr);
                            this.setState({users:curr});
                        }
                    })
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
        */
        this.environment.stop();
    }
}
export default Room;
