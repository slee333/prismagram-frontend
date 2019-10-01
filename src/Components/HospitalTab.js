// 병원과 프로필에서 표시되는 상단부 탭을 만듭니다.
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Tabs = styled.div`
	border-top: 1px solid #efefef;
	align-items: center;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	font-weight: 600;
	font-size: 12px;
	justify-content: center;
	letter-spacing: 1px;
	text-align: center;
`;

const Tab = styled.div`
	height: 52px;
	cursor: pointer;
	text-decoration: none;
`;
// 사용자 프로필일 때와 병원 프로필일 때 두 경우를 구분하겠습니다.
// Props:
//     data: Object. 사용자, 혹은 병원의 데이터
//     isUser: Boolean. 사용자인지 병원인지 구분합니다.
//         사용자라면 해당 사용자의 소개 / 포스트가 뜨고,
//         병원이라면 해당 병원 소개가 메인에 뜨게 됩니다.
export default Tabs = ({data, isUser}) => {
	return 'These are tabs';
};

Tabs.propTypes = {
    data: propTypes.shape({
        
    })
}