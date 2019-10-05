import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

const Text = styled.p`
  padding-top: ${props => (props.padding ? String(props.padding) : "0px")};
  font-weight: 200;
  font-size: 13px;
  line-height: 24px;
  color: #666;
`;

export default ({ location = "" }) => {
  const [latitude, setLatitude] = useState(37.3595704);
  const [longitude, setLongitude] = useState(127.105399);
  const [jibunAddress, setJibunAddress] = useState(
    "주소가 주어지지 않았습니다."
  );
  const [roadAddress, setRoadAddress] = useState("주소가 주어지지 않았습니다.");

  const getGeoCode = async address => {
    // Naver API로부터 주소의 Geocode를 가져옵니다.
    const headers = {
      "X-NCP-APIGW-API-KEY-ID": "oseghom2se",
      "X-NCP-APIGW-API-KEY": "CIS3zyaShaDOlQV9RjY0aQT6DHEbnTIjDl98o9tI"
    };
    const params = {
      query: address
    };
    const config = { headers, params };
    await axios
      .get("/map-geocode/v2/geocode", config)
      .then(({ data: { addresses } }) => {
        // console.log(addresses);
        setLongitude(addresses[0].x);
        setLatitude(addresses[0].y);
        setJibunAddress(addresses[0].jibunAddress);
        setRoadAddress(addresses[0].roadAddress);
        return addresses[0];
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    // this is only executed once
    getGeoCode(location);
  }, [])
  

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
          center={{ lat: latitude, lng: longitude }}
          defaultZoom={10}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </div>
  );
};
