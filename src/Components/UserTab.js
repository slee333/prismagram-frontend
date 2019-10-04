import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// 유저 프로필 상단부에 표시될 수 있는 상단부 탭 초안입니다.
// 병원과 사용자의 경우 받는 데이터의 유형

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
// 사용자 소개 (이력) ~ Bio, 팔로잉, 팔로워. 대표 포스트, 사진 (갤러리?), 관심사
// 사용자의 포스트와 DM을 구분. DM (Rooms~)은 병원과의 대화로 한정할수도
// 
// Props:
//     data: Object. 사용자, 혹은 병원의 데이터 
export default Tabs = ({data }) => {
	return 'These are tabs';
};

Tabs.propTypes = {
    data: propTypes.shape({
        
    })
}