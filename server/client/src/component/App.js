import React, {useEffect} from 'react';
import {AnimatePresence} from "framer-motion";
import axios from "axios";
import '../App.css';
import {Route, Switch} from 'react-router-dom';
import Main from "./Main";
import SelectContent from "../Page/SelectPage";
import SignUp from "./user/SignUp";
import Introduce from "../Page/IntroducePage";
import QnA from "./contents/QnA";
import Community from "./contents/Community";
import Terms from "./contents/terms";
import Callback from "./oauth2/callback";
import MyPageContent from "./myPage/MyPage";
import PoseWebStudio from "./studio/poseweb/PoseWebStudio"
import EditTool from './studio/edittool/EditTool';

export default function App(){
    const callApi = async () => {
        axios.get('/v1/api/test').then((res) => console.log(res.data.test));
    }

    useEffect(() => {
        callApi();
    }, []);

    return (
        <div className='App'>
            <AnimatePresence>
                <Switch>
                    <Route exact path = '/' component={Main}/>
                    <Route path = '/select' component={SelectContent}/>
                    <Route path = '/signUp' component={SignUp}/>
                    <Route path = '/myPage' component={MyPageContent}/>
                    <Route path = '/introduce' component={Introduce}/>
                    <Route path = '/qna' component={QnA}/>
                    <Route path = '/community' component={Community}/>
                    <Route path = '/terms' component={Terms}/>
                    <Route path = '/oauth2/redirect/kakao' component={Callback} />
                    <Route path='/oauth2/redirect/naver' component={Callback} />
                    <Route path='/oauth2/redirect/google' component={Callback} />
                    <Route path='/studio/pose/web' component={PoseWebStudio}/>
                    <Route path='/edit' component={EditTool}/>
                </Switch>
            </AnimatePresence>
       </div>
    );
}