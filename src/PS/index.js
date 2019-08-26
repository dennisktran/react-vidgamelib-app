import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Dropdown} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Playstation extends Component {
  state = {
    names: '',
    cover:'',
    games:[]
  }

  componentDidMount(){
    this.popularGames().then(data=>{
      const { games, images } = data
      let gamesArray = []
      games.forEach(g=>{
        let gameObj = {}
        images.forEach(i=>{
          if (g.cover === i.id){
            gameObj = {...g,...i}
            gamesArray.push(gameObj)
          }
        })
      })
      this.setState({
        games: gamesArray
      })
    })
  }

  popularGames = async () => {
    try {

      const popResponse = await fetch('http://localhost:8000/playstation', {
        method: "GET",
        credentials: 'include'
      })
      const parsed = await popResponse.json()
      console.log(parsed)
      return parsed

    } catch(err) {
      console.log(err);
    }
  }

  render(){
    console.log(this.state.games)
    return(
    <div>
      Coming soon!<br/>
      <br/>
        {
          this.state.games.map((p,i)=>{
          return (
            <div>
              <img src={p.url}/><br/>
              <b>{i + 1}. {p.name}- </b> {p.summary}<br/>
              <br/>
              <b>Releases: </b> {p.human}
            </div>
          )
        })
      }
    </div>
  )
  }
}

export default Playstation;
