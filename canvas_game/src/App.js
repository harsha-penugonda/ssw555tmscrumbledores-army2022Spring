import "./App.css";
import Header from "./components/Header";
import Qa from "./components/Qa";
import Instructions from "./components/Instructions";
import { useEffect, useState } from "react";
import DisplayImage from "./components/DisplayImage";
import Audio from "./components/Audio";
import Footer from "./components/Footer";
import MusicEnable from "./components/MusicEnable";
import Canvas from "./Canvas.tsx";
import Musicbtn from "./Musicbtn";

function App() {
  const [ImageType, setImageType] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [ImageSelected, setImageSelected] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [musicEnable, setMusicEnable] = useState(null);
  const [musicType, setMusicType] = useState(null);
  const [musicData, setMusicData] = useState(null);
  const [musicSelected, setMusicSelected] = useState(null);

  useEffect(() => {
    if (uploadedImage) {
      setImageType(5);
      setImageSelected(uploadedImage);
    }
  }, [uploadedImage]);

  return (
    <div className="App">
      <Header />
      <div className="body">
        {musicSelected === null && musicEnable !== false ? (
          <Instructions />
        ) : null}
        {ImageType === null ? (
          <Qa
            questionType={"image"}
            question={"What kind of scenario are you looking to scribble on?"}
            option1={"Beaches"}
            option2={"Forests"}
            option3={"Lakes"}
            option4={"Mountains"}
            setType={setImageType}
            setUploadedImage={setUploadedImage}
          />
        ) : null}
        {ImageSelected === null &&
        ImageType !== null &&
        uploadedImage === null ? (
          <DisplayImage
            question={"Choose an image to doodle on"}
            setImageSelected={setImageSelected}
            ImageType={ImageType}
            setImageType={setImageType}
            setImageData={setImageData}
          />
        ) : null}
        {ImageSelected !== null &&
        musicType === null &&
        musicEnable === null ? (
          <MusicEnable
            questionType={"enableMusic"}
            question={"Would you like to listen to music while scribbling?"}
            option1={"Yes"}
            option2={"No"}
            setMusicEnable={setMusicEnable}
            setImageSelected={setImageSelected}
          ></MusicEnable>
        ) : null}
        {ImageSelected !== null &&
        musicType === null &&
        musicEnable === true ? (
          <Qa
            questionType={"music"}
            question={"What kind of music do you want to listen to?"}
            option1={"Calming"}
            option2={"Instruments"}
            option3={"Nature"}
            option4={"Time alone"}
            setImageSelected={setMusicEnable}
            setType={setMusicType}
          ></Qa>
        ) : null}
        {musicType !== null &&
        musicEnable === true &&
        musicSelected === null ? (
          <Audio
            setType={setMusicType}
            question={"Choose music that you would like to listen"}
            musicType={musicType}
            setMusicSelected={setMusicSelected}
            setMusicData={setMusicData}
          />
        ) : null}
        {(musicSelected !== null && musicEnable === true) ||
        musicEnable === false ? (
          <div className="canvas">
            {musicEnable === true ? (
              <Musicbtn musicData={musicData}></Musicbtn>
            ) : null}
            <Canvas
              ImageURL={
                uploadedImage ? URL.createObjectURL(uploadedImage) : imageData
              }
            ></Canvas>
          </div>
        ) : null}
        {console.log(
          ImageType,
          ImageSelected,
          musicEnable,
          musicType,
          musicSelected,
          imageData,
          musicData
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
