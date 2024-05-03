import { Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import './App.css'
import ParticlesBg from 'particles-bg';

    

const initialState = {
  
    input: '',
    imageUrl: '',
    box: '',
    route: 'signin',
    isSignIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
    
  }
  
}

class App extends Component {
 constructor(){
  super()
  this.state = initialState;
 }

//  componentDidMount() {
//   fetch('http://localhost:3000/')
//     .then(response => response.json())
//     .then(console.log)
// }
 calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      // console.log(width, height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
 }


 displayFaceBox = (box) => {
  // console.log(box)
  this.setState({box: box })
 }

 onInputChange = (event) =>{
    this.setState({input: event.target.value});
 }

 onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input},
          () => { 
            fetch('https://smartbrain-serverside.onrender.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ input: this.state.imageUrl })
              })
            .then(response => response.json())
            .then(result => this.displayFaceBox(this.calculateFaceLocation(result)) )
            .catch(error => console.error('error!!', error));
      });


      if (this.state.imageUrl != null) {
        fetch('https://smartbrain-serverside.onrender.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ id: this.state.user.id })
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(countResponse => {
          this.setState({
            user: {
              ...this.state.user,
              entries: countResponse
            }
          });
        })
        .catch(error => console.error('Error:', error));
      } // this closes the if statement
          
      
}

  onRouteChange = (route) => {
    
    if(route === 'signin'){
      this.setState(initialState, ()=> {
        console.log("Navigating to:", this.state.route);
        console.log("boolean", this.state.isSignIn);
      });
    }else if (route === 'login'){
      this.setState({isSignIn: true}, () => {
        // console.log("Over here:", this.state.route);
        // console.log("Mr boolean", this.state.isSignIn);
      });
    }
    this.setState({route: route});
    
  }

  loadUser = (data) =>{
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    }
    )
    // console.log(data.entries);
  }


 render() {
  const {imageUrl, box, route, isSignIn } = this.state;
  return (
    <>
      <div className="App">
        {/* <ParticlesBg type="fountain" bg={true} /> */}
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignIn}/>
        {route === 'login' ? (
          <>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </>
        ) : (
          route === 'signin' ? 
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : 
          (
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        )}
      </div>
    </>
  );
}
  
}

export default App;
