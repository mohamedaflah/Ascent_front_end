import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

export function Room() {
  const { roomId } = useParams();

  const { user, role } = useSelector((state: RootState) => state.userData);
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const username = role === "company" ? user.name : user.firstname;
    setUsername(username);
  }, [role, user]);
  async function meetingUI(element: HTMLDivElement) {
    console.log("🚀 ~ meetingUI ~ element:", element);
    const appId = import.meta.env.VITE_ZEGOCLOUD_APPID;
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      Number(appId),
      serverSecret,
      String(roomId),
      user?._id,
      username
    );
    console.log("🚀 ~ meetingUI ~ kitToken:", kitToken);

    const ui = ZegoUIKitPrebuilt.create(kitToken);
    ui?.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  }
  return (
    <main className="h-screen">
      <h1>Room</h1>
      <div ref={meetingUI}></div>
    </main>
  );
}
