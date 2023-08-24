import React, { useEffect, useRef, useState } from "react";
import RecordRTC from "recordrtc";
function ScreenAudioRecorder() {
  const [user, setUser] = useState();
  const videoRef = useRef(null);
  let recorder;

  const startRecording = async () => {
    const displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const allStreams = [displayStream, audioStream];

    const mergedStream = new MediaStream();
    allStreams.forEach((stream) => {
      stream.getTracks().forEach((track) => mergedStream.addTrack(track));
    });

    recorder = new RecordRTC(mergedStream, { type: "video" });
    recorder.startRecording();
  };

  const stopRecording = () => {
    recorder.stopRecording(() => {
      const blob = recorder.getBlob();
      const videoUrl = URL.createObjectURL(blob);
      videoRef.current.src = videoUrl;
    });
  };

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("User"));
    if (User) {
      setUser(User);
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <div className="container mt-5">
            <video className="mt-5" style={{width : "500px"}} ref={videoRef} controls />
            <hr/>
            <button className="btn btn-success text-white p-2 fw-bold fs-5" onClick={startRecording}>Start Recording</button>
            <button  className="btn btn-success text-white p-2 fw-bold fs-5 mx-3" onClick={stopRecording}>Stop Recording</button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center my-5 fw-bold fs-4 text-white">Please Login</h3>
        </>
      )}
    </>
  );
}

export default ScreenAudioRecorder;
