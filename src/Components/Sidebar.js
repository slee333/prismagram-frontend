import React from "react";
import styled from "styled-components";
import { ME } from "../SharedQueries";
import { useQuery } from "react-apollo-hooks";
import { Link } from "react-router-dom";

const SideBar = styled.div`
  position: fixed;
  left: 50px;
  top: 150px;
`;

const CLink = styled(Link)`
  color: #a19b9a;
`;

const Category = styled.ul`
  font-size: 22px;
  margin-bottom: 25px;
  color: #615d5c;
`;

const CatTitle = styled.div`
  margin-bottom: 20px;
`;

const SubCategory = styled.li`
  font-size: 16px;
  padding-left: 15px;
  margin-top: 10px;
`;

export default () => {
  const { data, loading } = useQuery(ME);
  if (loading) {
    return <div> </div>;
  } else {
    console.log(data)
    const { adminof, patientof, staffof } = data.me ;
    return (
      <>
        <SideBar>
          <Category>
            {adminof.length !== 0 || staffof.length !== 0 ? (
              <CatTitle>소속</CatTitle>
            ) : (
              <div></div>
            )} 
            {adminof.length > 0 &&
              adminof.map(hpa => (
                <SubCategory key={hpa.id}>
                  <CLink to={`/hospital/${hpa.name}`}>{hpa.name}</CLink>
                </SubCategory>
              ))}
            {staffof.length > 0 &&
              staffof.map(hps => (
                <SubCategory key={hps.id}>
                  <CLink to={`/hospital/${hps.name}`}>{hps.name}</CLink>
                </SubCategory>
              ))}
          </Category>

          <Category>
            {patientof.length !== 0 ? (
              <CatTitle>다니는 병원</CatTitle>
            ) : (
              <div></div>
            )}
            {patientof.length > 0 &&
              patientof.map(hpp => (
                <SubCategory key={hpp.id}>
                  <CLink to={`/hospital/${hpp.name}`}>{hpp.name}</CLink>
                </SubCategory>
              ))}
          </Category>
        </SideBar>
      </>
    );
  }
};
