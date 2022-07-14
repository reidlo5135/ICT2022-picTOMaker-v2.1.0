import React from 'react';
import "../../css/font.css"
import "../../css/Top.css"
import { Link } from "react-router-dom";
import axios from "axios";
import {useHistory} from "react-router";

export default function Sidebar(){

    const history = useHistory();
    const access_token = localStorage.getItem('access_token');

    function Logout() {
        try {
            axios.delete(`/v1/api/oauth2/token/invalid/${access_token}`)
                .then((response) => {
                    console.log('res data : ', response.data);

                    if(response.data.code === 0) {
                        console.clear();
                        localStorage.clear();
                        alert('성공적으로 로그아웃 되었습니다!!');
                        history.push("/");
                    }
                });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn" for="menu__toggle">
                <span></span>
                </label>

            <ul className="menu__box">
                <li><Link to='/mypage' className='menu__item'>마이페이지</Link></li>
                <li><a className="menu__item" href="#" onClick={Logout}>로그아웃</a></li>
                <li><Link to='/qna' className='menu__item'>문의하기</Link></li>
            </ul>
        </div>
    );
}