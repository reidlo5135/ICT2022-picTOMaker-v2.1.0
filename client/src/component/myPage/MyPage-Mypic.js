import React,{useState,useEffect} from 'react';
import "../../css/MyPage.css";
import "../../css/font.css";
import 'react-fancybox/lib/fancybox.css';
import Pic from "../../image/Human.png"
import Mockup from "../../image/mockup.png"
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";

export default function MyPageMyPic(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);

    const getProfile = localStorage.getItem('profile');
    const prof = JSON.parse(getProfile);
    const email = prof.email;
    const provider = localStorage.getItem("provider");
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        await axios.post(`/v1/api/picTO/find/${email}`)
            .then((response) => {
                console.log('MyPage-Mypic getPicToList response : ', response.data);
                if(response.data.code === 0) {
                    console.log('MyPage-Mypic getPictoList list : ', response.data['list']);
                    setPosts(response.data['list']);
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.error(e);
            });
      };
      fetchData();
    }, []);
  

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
      let currentPosts = 0;
      currentPosts = posts.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    };

    return (
        <div className='MyPage-Right'>
            <div className='right-flex'>
                <Posts posts={currentPosts(posts)} loading={loading}></Posts>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={setCurrentPage}
                />
            </div>
        </div>
    );
}