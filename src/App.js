import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
// import InfiniteScroll from "react-infinite-scroll-component";

import Button from "components/Button";
import ImageGallery from "components/ImageGallery";
import Searchbar from "components/Searchbar";
import api from "services/api";
import Modal from "components/Modal";
import Spinner from "components/Loader";

import "react-toastify/dist/ReactToastify.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState("");
  const [, setError] = useState(null);
  const [, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    setStatus(Status.PENDING);

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const { totalHits, hits } = await api.getImage(searchQuery, page);
        setImages((prevState) => [...prevState, ...hits]);
        setTotalHits(totalHits);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
        toast.error(`Sorry something went wrong. ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page, searchQuery]);

  useEffect(() => {
    if (page > 1) {
      const CARD_HEIGHT = 300; // preview image height
      window.scrollBy({
        top: CARD_HEIGHT * 2,
        behavior: "smooth",
      });
    }
  }, [page]);

  const handleSearchFormSubmit = (query) => {
    if (searchQuery.toLowerCase() === query.toLowerCase()) {
      return;
    }

    if (query.trim() !== "") {
      toast.info(`You searched: ${query.toLowerCase()}`, {});

      setSearchQuery(query);
      setPage(1);
      setImages([]);
    }

    if (query.trim() === "") {
      toast.warning(
        "No results were found for your search, please try something else.",
        { theme: "dark" }
      );
    }
  };

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleClickImage = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };

  return (
    <div className="App">
      <ToastContainer />
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {isLoading && <Spinner />}

      {/* <InfiniteScroll
        dataLength={images.length}
        next={handleLoadMore}
        hasMore={true}
      > */}
      <ImageGallery images={images} onClickImg={handleClickImage} />
      {/* </InfiniteScroll> */}

      {images.length > 1 && images.length !== totalHits && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {largeImageURL && (
        <Modal largeImage={largeImageURL} tags={tags} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;

// export default class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     searchQuery: "",
//     page: 1,
//     largeImageURL: null,
//     tags: "",
//     error: null,
//     status: Status.IDLE,
//   };

//   totalHits = null;

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.searchQuery !== this.state.searchQuery ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ status: Status.PENDING });
//       this.fetchImages();
//     }

//     if (this.state.page > 1) {
//       const CARD_HEIGHT = 300; // preview image height
//       window.scrollBy({
//         top: CARD_HEIGHT * 2,
//         behavior: "smooth",
//       });
//     }
//   }

//   fetchImages = async () => {
//     const { searchQuery, page } = this.state;
//     this.setState({ isLoading: true });

//     try {
//       const dataImages = await api.getImage(searchQuery, page);
//       this.totalHits = dataImages.totalHits;

//       this.setState(({ images }) => ({
//         images: [...images, ...dataImages.hits],
//         status: Status.RESOLVED,
//       }));
//     } catch (error) {
//       this.setState({ error, status: Status.REJECTED });
//       toast.error(`Sorry something went wrong. ${error.message}`);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleSearchFormSubmit = (query) => {
//     if (this.state.searchQuery.toLowerCase() === query.toLowerCase()) {
//       return;
//     }

//     if (query.trim() !== "") {
//       toast.info(`You searched: ${query.toLowerCase()}`, {});
//       this.setState({ searchQuery: query, page: 1, images: [] });
//     }

//     if (query.trim() === "") {
//       toast.warning(
//         "No results were found for your search, please try something else.",
//         { theme: "dark" }
//       );
//     }
//   };

//   handleLoadMore = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   handleClickImage = (largeImageURL, tags) => {
//     this.setState({ largeImageURL: largeImageURL, tags: tags });
//   };

//   closeModal = () => {
//     this.setState({ largeImageURL: null });
//   };

//   render() {
//     const { images, isLoading, largeImageURL, tags } = this.state;

//     return (
//       <div className="App">
//         <ToastContainer />
//         <Searchbar onSubmit={this.handleSearchFormSubmit} />
//         {isLoading && <Spinner />}
//         <ImageGallery images={images} onClickImg={this.handleClickImage} />
//         {images.length > 1 && images.length !== this.totalHits && (
//           <Button onLoadMore={this.handleLoadMore} />
//         )}
//         {largeImageURL && (
//           <Modal
//             largeImage={largeImageURL}
//             tags={tags}
//             onClose={this.closeModal}
//           />
//         )}
//       </div>
//     );
//   }
// }
