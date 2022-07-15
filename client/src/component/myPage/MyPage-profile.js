import React, {useEffect, useState} from 'react';
import "../../css/MyPage.css";
import "../../css/font.css";
import axios from "axios";

export default function MyPageProfile(){
    const getProfile = localStorage.getItem('profile');
    const provider = localStorage.getItem('provider');

    const [email, setEmail] = useState();
    const [nickName, setNickName] = useState();
    const [profileImage, setProfileImage] = useState();
    const [count, setCount] = useState(0);

    const getProf = () => {
        try {
            const jsonProf = JSON.parse(getProfile);
            console.log('MyPage-profile jProf : ', jsonProf);

            const email = jsonProf.email;
            setEmail(email);
            axios.post(`/v1/api/picTO/count/${email}/${provider}`)
                .then((response) => {
                    console.log('MyPage-profile getPicToCount : ', response.data);
                    if(response.data.code === 0) {
                        console.log('MyPage-profile getPicToCount count : ', response.data['count']);
                        setCount(response.data['count']);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });

            if(provider === 'LOCAL') {
                setNickName(jsonProf.name);
            } else {
                setNickName(jsonProf.nickname);
            }
            setProfileImage(jsonProf.profile_image_url);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getProf();
    }, []);
    
    return (
        <div className='MyPage-Right'>
            <div className='Right-Contents'>
                <div className='Menu-Name'>
                    내 프로필
                </div>
                <div className='MenuBox'>
                    <div className='Name'>
                        이름
                    </div>
                    <div className='MenuBox-props'>
                        {nickName}
                    </div>
                </div>
                <div className='MenuBox'>
                    <div className='Name'>
                        이메일
                    </div>
                    <div className='MenuBox-props'>
                        {email}
                    </div>
                </div>
                <div className='MenuBox'>
                    <div className='Name'>
                        제작한 픽토
                    </div>
                    <div className='MenuBox-props'>
                        {count}
                    </div>
                </div>
            </div>
        </div>
    );
}