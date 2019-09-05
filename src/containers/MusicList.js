import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

class MusicListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: null,
      musicList: [
          { id: 1, title: "Music One" },
        { id: 2, title: "Booting Up" }
      ]
    };
  }

  render() {
    const list = this.state.musicList.map(item => {
      return (
          <Link style={{   }}
          to={{
            pathname: "/musicPlayer",
            state: {
              selectedTrack: item.title
            }
          }}
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item.title })}
          ><p style={{height:5}}> {item.title}</p>
          <br />
        </Link>
      );
    });
    return (
        <div className="App">
        <h1>Caliper Music Player</h1>
            <ul style={{backgroundColor:"lightblue"}}>{list}</ul>
      </div>
    );
  }
}

export default MusicListContainer;
