import { useEffect, useState } from "react";
// import { ToastContainer } from "react-toastify";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader";
import Button from "./Button";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Api  from "services/api";
import './styles.css'

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [forModal, setForModal] = useState({});
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  useEffect(
    () => {
        if (searchName === '') {
            return
        } else {
            try {
                setStatus('pending');
                Api.fetchPictures(searchName, page)
                    .then(
                        responce => {
                            const { data } = responce;
                            const imagesList = data.hits;
                            const totalHits = data.totalHits;
                            if (imagesList.length === 0) {
                                 setStatus('rejected')
                            } else {
                                setImages(images => [...imagesList, ...images]);
                                setStatus('resolved');   
                            }
                            const maxPage = Math.ceil(totalHits / 12);
                            if (page < maxPage) {
                                setShowBtn(true);
                            } else {
                                setShowBtn(false)
                            }
                    }
                )
            } catch (error) {
              setError(error.massage);
              console.log(error)
            } 
        }
    }, [searchName, page, ]
)
      

                
  

// async componentDidUpdate(prevProps, prevState) {
//     const {searchName, page, images} = this.state;         
//         if (prevState.searchName !== searchName || prevState.page !== page)
//             try {
//               this.setState({ status: 'pending' })// Взводим умову для загрузки лоадера 
              
//               Api.fetchPictures(searchName, page)
//                 .then(responce => {
//                   const { data } = responce;
//                       const imagesList = data.hits;
//                       const totalHits = data.totalHits;
//                       if (imagesList.length === 0) {
//                           this.setState({
//                               status: 'rejected'
//                           })                    
//                       }
//                       else {
//                           this.setState({
//                               images: [...imagesList, ...images ],
//                               status: 'resolved',
//                           })
//                       }
//                       const maxPage = Math.ceil(totalHits / 12)
//                       if (page < maxPage  ) {
//                       this.setState({
//                         showBtn: true,
//                       })
//                       }
//                       else {
//                       this.setState({
//                         showBtn: false,
//                       })
//                       }
//                 })
//                 .catch(error => this.setState({ error }))                                         
//                 } catch (error) {
//                     alert(error);
//                   }
//   }

  const handleSubmit = (searchName) => {
    setSearchName(searchName); // отримуємо ім'я пошукового слова з searchbar
    setImages([]);       
  }
  const handleButton = (prevState) => {
    setPage (prevState.page +1) // при натисканні кнопки збільшуємо номер сторінки на 1      
  }
  const toggleModal = () => {
    setShowModal(showModal => !showModal)
  }
  const handleClickImg = forModal => {
    setForModal(forModal);
    setShowModal(true);    
  }
  return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        {status === 'idle' && <h2>Введіть, щоб ви хотіли побачити...</h2>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h2>Нажаль, за запитом нічого не знайдено</h2>}
        {status === 'resolved' && <ImageGallery images={images} onClick={handleClickImg}/>}        
        {showBtn && <Button onClick={handleButton} /> }
        {showModal && <Modal forRender={forModal} onClose={toggleModal} />}
      </div>
    );
}
export default App;
// export default class App extends Component {
//   state = {
//     searchName: '',
//     images: [],
//     forModal: {},
//     page: 1,
//     // loading: false,
//     showModal: false,
//     showBtn: false,
//     status: 'idle',   
//     error: null,
//   } 
//   async componentDidUpdate(prevProps, prevState) {
//     const {searchName, page, images} = this.state;         
//         if (prevState.searchName !== searchName || prevState.page !== page)
//             try {
//               this.setState({ status: 'pending' })// Взводим умову для загрузки лоадера 
              
//               Api.fetchPictures(searchName, page)
//                 .then(responce => {
//                   const { data } = responce;
//                       const imagesList = data.hits;
//                       const totalHits = data.totalHits;
//                       if (imagesList.length === 0) {
//                           this.setState({
//                               status: 'rejected'
//                           })                    
//                       }
//                       else {
//                           this.setState({
//                               images: [...imagesList, ...images ],
//                               status: 'resolved',
//                           })
//                       }
//                       const maxPage = Math.ceil(totalHits / 12)
//                       if (page < maxPage  ) {
//                       this.setState({
//                         showBtn: true,
//                       })
//                       }
//                       else {
//                       this.setState({
//                         showBtn: false,
//                       })
//                       }
//                 })
//                 .catch(error => this.setState({ error }))                                         
//                 } catch (error) {
//                     alert(error);
//                   }
//   }
//   handleSubmit = (searchName) => {    
//     this.setState({
//       searchName,// отримуємо ім'я пошукового слова з searchbar
//       images: [],
//     });    
//   }
//  handleButton = (prevState) => {
//     this.setState(prevState => ({
//       page: prevState.page +1,// при натисканні кнопки збільшуємо номер сторінки на 1
//     }))    
//   }
//   toggleModal = () => this.setState({
//     showModal: !this.state.showModal,
//   })
//   handleClickImg = forModal => {
//     // console.log("приход с итема", forModal);
//     this.setState({
//       forModal,
//       showModal:true,
//     })
    
//     // console.log("after click", this.state);
    
//   }
//   render() {
//     const { images, showModal, forModal, status, showBtn} = this.state;
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSubmit} />
//         {status === 'idle' && <h2>Введіть, щоб ви хотіли побачити...</h2>}
//         {status === 'pending' && <Loader />}
//         {status === 'rejected' && <h2>Нажаль, за запитом нічого не знайдено</h2>}
//         {status === 'resolved' && <ImageGallery images={images} onClick={this.handleClickImg}/>}        
//         {showBtn && <Button onClick={this.handleButton} /> }
//         {showModal && <Modal forRender={forModal} onClose={this.toggleModal} />}
//       </div>
//     );
//   };
// };

