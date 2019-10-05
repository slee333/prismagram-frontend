import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Helmet } from "rl-react-helmet";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

export default () => {
  const Wrapper = styled.div`
    min-height: 100vh;
  `;

  const [count, setCount] = useState(0);
  useEffect(() => {});

  // Get address from axios
  const addressStr = "서울특별시 강남구 일원로 81";

  export const getGeoCode = async address => {
    // Naver API로부터 주소의 Geocode를 가져옵니다.
    const headers = {
      "X-NCP-APIGW-API-KEY-ID": "oseghom2se",
      "X-NCP-APIGW-API-KEY": "CIS3zyaShaDOlQV9RjY0aQT6DHEbnTIjDl98o9tI"
    };
    const params = {
      query: address
    };
    const config = { headers, params };
    const {
      data: { addresses }
    } = await axios
      .get("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode", config)
      .catch(error => console.log(error));
    return addresses;
  };

  // const Add = getGeoCode(addressStr);
  // console.log(Add)

  //   var instance = axios.create({
  //     baseURL: 'https://some-domain.com/api/',
  //     timeout: 1000,
  //     headers: {'X-Custom-Header': 'foobar'}
  //   });

  const YOUR_CLIENT_ID = "oseghom2se";

  return (
    <Wrapper>
      <Helmet>
        <script
          type="text/javascript"
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=oseghom2se"
        ></script>
      </Helmet>
      <div>
        <RenderAfterNavermapsLoaded ncpClientId="oseghom2se">
          <NaverMap
            mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
            style={{
              width: "100%",
              height: "400px"
            }}
            defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
            defaultZoom={10}
          >
            <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
          </NaverMap>
        </RenderAfterNavermapsLoaded>
      </div>
    </Wrapper>
  );
};

// export const searchAddress = async (
//   query = "",
//   page = "1",
//   size = 10,
//   sort = "sim",
//   target = ""
// ) => {
//   const params = {
//     query,
//     size,
//     page,
//     sort,
//     target
//   };
//   const data = await client
//     .get("/v2/local/search/address", {
//       params
//     })
//     .then(({ status, statusText, data }) => {
//       if (status === 200) {
//         const {
//           meta: {
//             is_end, // 현재 페이지가 마지막 페이지인지 여부(false이면 다음 페이지를 요청할 수 있음)
//             pageable_count, // 검색 결과로 제공 가능한 문서수
//             total_count // 전체 검색된 문서수
//           },
//           documents
//         } = data;

//         const result = {
//           isEnd: is_end,
//           pageableCount: pageable_count,
//           totalCount: total_count,
//           items:
//             documents && documents.length
//               ? documents
//                   .filter(({ thumbnail }) => !!thumbnail) // 표지 이미지 없는 책은 제외
//                   .map(
//                     (
//                       {
//                         title, // 도서 제목
//                         contents, // 도서 소개
//                         url, // 도서 상세 URL
//                         isbn, // 국제 표준 도서번호(ISBN10 ISBN13)
//                         datetime, // 도서 출판날짜(ISO 8601)
//                         authors, // 도서 저자 리스트
//                         publisher, // 도서 출판사
//                         translators, // 도서 번역자 리스트
//                         price, // 도서 정가
//                         sale_price, // 도서 판매가
//                         thumbnail, // 도서 표지 썸네일 URL(120x174)
//                         status // 도서 판매 상태 정보(정상, 품절, 절판)
//                       },
//                       index
//                     ) => {
//                       return {
//                         id: String((page - 1) * size + index),
//                         title: title,
//                         contents,
//                         url,
//                         isbn: isbn ? isbn.split(" ") : [],
//                         authors:
//                           typeof authors === "string" ? [authors] : authors,
//                         translators:
//                           typeof translators === "string"
//                             ? [translators]
//                             : translators,
//                         pubdate: parseDateString(datetime),
//                         publisher,
//                         thumbnail
//                       };
//                     }
//                   )
//               : []
//         };
//         return result;
//       } else {
//         throw new Error(`${status}:${statusText}`);
//       }
//     });
// };

//   const getMapClient = async () => {
//     const client = await axios.create({
//       baseURL: `https://dapi.kakao.com/v2/local/search/address.json`,
//       method: "get",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         Host: "dapi.kakao.com",
//         Authorization: `KakaoAK 08b2b81a0be7786891d433f049e9a944`
//       }
//     });

//     return client
//   };

//   const params = { query: "서울특별시 강남구 일원로 81" }

//   const MapCLI = getMapClient();

//   MapCLI.get()

//   const getMap = async () => {
//     const data = await axios
//       .get("https://dapi.kakao.com/v2/local/search/address.json", {
//         query: "서울특별시 강남구 일원로 81",
//         Authorization: `KakaoAK 08b2b81a0be7786891d433f049e9a944`,
//         Host: "dapi.kakao.com"
//       })
//       .then(data2 => {
//         console.log("data1", data);
//         console.log("data2", data2);
//       });
//   };
//   getMap();
