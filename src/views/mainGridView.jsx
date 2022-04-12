import React, { useContext } from "react";
import { selectPeers, useHMSStore } from "@100mslive/hms-video-react";
import { GridCenterView, GridSidePaneView } from "./components/gridView";
import { AppContext } from "../store/AppContext";
import { ROLES } from "../common/roles";

export const MainGridView = ({
  isChatOpen,
  toggleChat,
  role,
  isParticipantListOpen,
}) => {
  const { maxTileCount } = useContext(AppContext);
  const peers = useHMSStore(selectPeers);
  const teacherPeers = peers.filter(
    peer => peer.roleName?.toLowerCase() === ROLES.TEACHER
  );
  const studentPeers = peers.filter(
    peer => peer.roleName?.toLowerCase() !== ROLES.TEACHER
  );
  const hideSidePane =
    peers.every(peer => peer.roleName === peers[0].roleName) &&
    peers.some(peer => !peer.isLocal && (peer.audioTrack || peer.videoTrack));

  const centerPeers = role === ROLES.TEACHER ? studentPeers : teacherPeers;
  const sidebarPeers = role === ROLES.TEACHER ? teacherPeers : studentPeers;

  return (
    <React.Fragment>
      <GridCenterView
        peers={hideSidePane ? peers : centerPeers}
        maxTileCount={maxTileCount}
        isChatOpen={isChatOpen}
        toggleChat={toggleChat}
        allowRemoteMute={false}
        hideSidePane={hideSidePane}
        isParticipantListOpen={isParticipantListOpen}
        totalPeers={peers.length}
      />
      {!hideSidePane && (
        <GridSidePaneView
          peers={sidebarPeers}
          isChatOpen={isChatOpen}
          toggleChat={toggleChat}
          isParticipantListOpen={isParticipantListOpen}
          totalPeers={peers.length}
        />
      )}
    </React.Fragment>
  );
};
