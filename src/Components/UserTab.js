// 유저 프로필에서 표시되는 상단부 탭을 만듭니다.
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
// 사용자 프로필입니다
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