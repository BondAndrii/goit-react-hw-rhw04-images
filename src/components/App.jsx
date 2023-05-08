
import { useState } from "react";
import { useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader";
import Button from "./Button";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import picturesApi from '../services/api'
import './styles.css'


export default function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [forModal, setForModal] = useState({});
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [status, setStatus] = useState('idle');  
  
  useEffect(() => {
    if (searchName === '') {
      return
    }
    setStatus('pending')
    picturesApi.fetchPictures(searchName, page)
      .then(data => {
        const imagesList = data.hits;
        const totalHits = data.totalHits;
        if (imagesList.length === 0) {
          setStatus('rejected')                            
        }
        else {
          setImages(images => [...imagesList, ...images]);
          setStatus('resolved');          
        }
        const maxPage = Math.ceil(totalHits / 12)
        if (page < maxPage) {
          setShowBtn(true)          
        }
        else {
          setShowBtn(false)         
        }
      })
      .catch(error => error.message);       

  }, [searchName, page]);
  const handleButton = () => {
    setPage(page => page + 1);   
  }
  const toggleModal = () => setShowModal(showModal => !showModal);
  
  const handleClickImg = forModal => {
    setForModal(forModal);
    setShowModal(true);
  }
 
  const handleAppSubmit = searchName => {
    setSearchName(searchName);
    setImages([]);
  }
 
    return (
          <div className="App">
            <Searchbar priSubmit={handleAppSubmit} />
            {status === 'idle' && <h2>Введіть, щоб ви хотіли побачити...</h2>}
            {status === 'pending' && <Loader />}
            {status === 'rejected' && <h2>Нажаль, за запитом нічого не знайшли</h2>}
            {status === 'resolved' && <ImageGallery images={images} onClick={handleClickImg}/>}        
            {showBtn && <Button onClick={handleButton} /> }
            {showModal && <Modal forRender={forModal} onClose={toggleModal} />}
          </div>
        );
}


