import React from "react";
import "../App.css";
const campfireStory =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3";
const bootingUp = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: this.props.location.state.selectedTrack,
      player: "playing",
      currentTime: null,
      duration: null
    };
    console.log(this.state.selectedTrack);
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
    if (this.state.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Music One":
          track = campfireStory;
          break;
        case "Booting Up":
          track = bootingUp;
          break;
        default:
          break;
      }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
        console.log(this.state.player);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Music One":
          track = campfireStory;
          break;
        case "Booting Up":
          track = bootingUp;
          break;
        default:
          break;
      }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
        console.log(this.state.player);
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.props.history.push("/");
        console.log(this.state.player);
        this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

  render() {
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);
    return (
      <div className="App">
        <a href="/">Music Lists </a>
        <h4> Now Playing : {this.props.location.state.selectedTrack}</h4>
        <img
          src="https://is4-ssl.mzstatic.com/image/thumb/Purple122/v4/eb/42/8c/eb428cbf-09a9-575d-266f-30dfc755e099/source/512x512bb.jpg"
          alt="musicplayer background"
          style={{ height: 400 }}
        />
        <div>
          {this.state.player === "paused" && (
            <button
              onClick={() => this.setState({ player: "playing" })}
              style={{ marginRight: 16 }}
            >
              Play
            </button>
          )}
          {this.state.player === "playing" && (
            <button
              onClick={() => this.setState({ player: "paused" })}
              style={{ marginRight: 16 }}
            >
              Pause
            </button>
          )}
          {this.state.player === "playing" || this.state.player === "paused" ? (
            <button onClick={() => this.setState({ player: "stopped" })}>
              Stop
            </button>
          ) : (
            ""
          )}
        </div>
        {this.state.player === "playing" || this.state.player === "paused" ? (
          <div>
            {currentTime} / {duration}
            <br />
            <p>Need some more time to implement it on DLL</p>
          </div>
        ) : (
          ""
        )}
        <audio ref={ref => (this.player = ref)} />
      </div>
    );
  }
}

export default PlayerContainer;
