// import { API_PETUGAS } from '../api/api';
// import axios from 'axios';


// //data data API Petugas
// const [dataPetugas, setDataPetugas] = useState([]);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);

// useEffect(() => {
//    axios
//     .get(API_PETUGAS)
//     .then((res) => {
//       setDataPetugas(res.data);
//       console.log('data petugas', dataPetugas);
//     })
//     .catch((err) => {
//       setError(err);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }, []);

// const PETUGAS_LIST = dataPetugas.data.map((petugas) => {
//   return {
//     id: petugas.user.id,
//     nama: petugas.user.name,
//     email: petugas.user.email,
//     alamat: petugas.user.address,
//     notelp: petugas.user.phone,
//   };
// });

// export default getAllPetugas;
