import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import { moviesRef } from './firebase/Firebase';
import { Link } from 'react-router-dom';

function Cards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    async function getData() {
      setLoading(true)
      const _data = await getDocs(moviesRef);
      console.log(_data);
      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...(doc.data()), id: doc.id }])
      })
      setLoading(false)
    }
    getData();
  }, [])

  return (
    <>
      <div className='flex flex-wrap justify-center p-3 mt-2 card_main'>
        {loading ? <div className='loader'><ThreeCircles height={80} color='black' /> </div> :
          data.map((e, i) => {
            return (
              <Link to={`/detail/${e.id}`}>
                <div key={i} className='card font-medium shadow-1g hover: -translate-y-2 cursor-pointer md:mt-0 mt-3'>
                  <img
                    className='h-100 movie_img'
                    src={e.image}
                    alt='Movie Img'
                  />
                  <h1 className='movie_name'>
                    <span className='text-gray-500'>Name:</span> {e.title}
                  </h1>
                  <h1 className='flex items-center movie_rating'>
                    <span className='text-gray-500'>Rating:</span> {e.rating}
                    <ReactStars size={20} half={true} value={e.rating / e.rated} edit={false} className='ml-2' />
                  </h1>
                  <h1 className='movie_year'>
                    <span className='text-gray-500'>Year:</span> {e.year}
                  </h1>
                </div>
              </Link>

            )
          })

        }
      </div>
    </>
  )
}

export default Cards
