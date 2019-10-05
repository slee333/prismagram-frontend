import React from "react";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

const Text = styled.p`
  padding-top: ${props => (props.padding ? String(props.padding) : "0px")};
  font-weight: 200;
  font-size: 13px;
  line-height: 24px;
  color: #666;
`;

export default ({
  address = {
    Longitude: "127.105399",
    Latitude: "37.3595704",
    jibunAddress: "주소가 주어지지 않았습니다.",
    roadAddress: "주소가 주어지지 않았습니다."
  }
}) => {
  const { Longitude, Latitude, jibunAddress, roadAddress } = address;

  return (
    <div>
      <Text padding="22px">도로명주소: {roadAddress}</Text>
      <Text>지번주소: {jibunAddress}</Text>
      <RenderAfterNavermapsLoaded ncpClientId="oseghom2se">
        <NaverMap
          mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
          style={{
            width: "100%",
            height: "400px"
          }}
          center={{ lat: Latitude, lng: Longitude }}
          defaultZoom={10}
        >
          <Marker
            position={{ lat: Latitude, lng: Longitude }}
          />
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </div>
  );
};
