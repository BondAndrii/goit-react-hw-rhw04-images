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
                                etShowBtn(false)
                            }
                    }
                )
            } 
        }
    }
)