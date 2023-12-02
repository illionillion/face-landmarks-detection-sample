import { Center, Input } from "@yamada-ui/react";
import { ChangeEvent } from "react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/types";

function App() {

  const getModel = async () => {
    return await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
  }

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files?.length === 0 || !e.currentTarget.files) return
    console.log(e.currentTarget.files[0])
    const imageObj = new Image()
    imageObj.src = URL.createObjectURL(e.currentTarget.files[0])
    const model = await getModel()
    const predictions = await model.estimateFaces({
      input: imageObj,
    });
    console.log(predictions);
  }

  return (
    <Center w="100vw" className="App">
      <Input type="file" onChange={handleChangeFile} accept="image/*" />
    </Center>
  );
}

export default App;
