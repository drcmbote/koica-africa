import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);
  const [team, setTeam] = useState('africa1');

  useEffect(() => {
    fetchLatestData();
  }, []);

  const fetchLatestData = () => {
    const latestData = {
      africa1: {
        K2: 1000000, U2: 400000,
        K4: 100000, U4: 40000, K23: 150000, U23: 60000, K34: 200000, U34: 80000,
        K48: 250000, U48: 100000, K61: 300000, U61: 120000, K68: 350000, U68: 140000,
        K70: 400000, U70: 160000, K72: 450000, U72: 180000, K74: 500000, U74: 200000,
        K76: 550000, U76: 220000, K83: 600000, U83: 240000, K88: 650000, U88: 260000,
        K84: 150000, U84: 60000, K85: 150000, U85: 60000, K86: 150000, U86: 60000,
        K87: 150000, U87: 60000, K89: 90000, U89: 36000, K90: 90000, U90: 36000,
        K91: 90000, U91: 36000, K92: 90000, U92: 36000, K93: 90000, U93: 36000,
        K94: 90000, U94: 36000, K95: 90000, U95: 36000,
      },
      africa2: {
        K96: 2000000, U96: 800000, K98: 200000, U98: 80000, K109: 250000, U109: 100000,
        K119: 300000, U119: 120000, K128: 350000, U128: 140000, K136: 400000, U136: 160000,
        K141: 450000, U141: 180000, K147: 500000, U147: 200000, K155: 550000, U155: 220000,
        K157: 600000, U157: 240000, K164: 650000, U164: 260000, K169: 700000, U169: 280000,
        K180: 750000, U180: 300000, K175: 800000, U175: 320000, K176: 200000, U176: 80000,
        K177: 200000, U177: 80000, K178: 200000, U178: 80000, K179: 200000, U179: 80000,
      },
    };
    setData(latestData);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).slice(0, 30);
    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const workbook = XLSX.read(event.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          setData(prev => ({ ...prev, ...jsonData }));
        };
        reader.readAsBinaryString(file);
      });
      setMessage('성공적으로 업로드 되었습니다');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getBudgetData = (cell) => data[team]?.[cell] || 0;
  const getExecutionData = (cell) => data[team]?.[cell] || 0;

  const calculateDifference = (start, end, cell) => {
    if (!start || !end) return getExecutionData(cell);
    const startValue = data[`${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`]?.[cell] || 0;
    const endValue = data[`${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`]?.[cell] || 0;
    return endValue - startValue;
  };

  const africa1PieData = {
    labels: ['집행액', '잔여 예산'],
    datasets: [{
      data: [calculateDifference(startDate, endDate, 'U2'), getBudgetData('K2') - calculateDifference(startDate, endDate, 'U2')],
      backgroundColor: ['#4CAF50', '#B0BEC5'],
    }],
  };

  const africa2PieData = {
    labels: ['집행액', '잔여 예산'],
    datasets: [{
      data: [calculateDifference(startDate, endDate, 'U96'), getBudgetData('K96') - calculateDifference(startDate, endDate, 'U96')],
      backgroundColor: ['#4CAF50', '#B0BEC5'],
    }],
  };

  const progressData = {
    labels: team === 'africa1' ? ['에티오피아', '르완다', '우간다', '탄자니아', '케냐', '수단', '마다가스카르', '말라위', 'AU', '모잠비크'] : ['가나', '세네갈', '이집트', 'DR콩고', '나이지리아', '카메룬', '코트디부아르', '앙골라', '모로코', '알제리', '튀니지', '토고'],
    datasets: [{
      label: '집행률',
      data: (team === 'africa1' ? ['K4', 'K23', 'K34', 'K48', 'K61', 'K68', 'K70', 'K72', 'K74', 'K76'] : ['K98', 'K109', 'K119', 'K128', 'K136', 'K141', 'K147', 'K155', 'K157', 'K164', 'K169', 'K180']).map(cell => {
        const budget = getBudgetData(cell);
        const execution = calculateDifference(startDate, endDate, cell.replace('K', 'U'));
        return budget > 0 ? (execution / budget) * 100 : 0;
      }),
      backgroundColor: '#0288D1',
    }],
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate('/')} className="bg-red-500 text-white px-6 py-3 rounded mb-4">로그아웃</button>
      <div className="mb-4">
        <input type="file" multiple onChange={handleFileUpload} accept=".xls,.xlsx" className="mb-2" />
        {message && <p className="text-green-600">{message}</p>}
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy-MM-dd" className="p-2 border rounded mr-2" placeholderText="시작일자" />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat="yyyy-MM-dd" className="p-2 border rounded mr-2" placeholderText="종료일자" />
        <button onClick={fetchLatestData} className="bg-green-500 text-white px-6 py-3 rounded">검색</button>
      </div>
      <div className="flex justify-center space-x-8 mb-4">
        <button onClick={() => { setTeam('africa1'); setActiveMenu(null); }} className="bg-blue-500 text-white px-24 py-8 rounded text-4xl">아프리카1팀</button>
        <button onClick={() => { setTeam('africa2'); setActiveMenu(null); }} className="bg-pink-500 text-white px-24 py-8 rounded text-4xl">아프리카2팀</button>
      </div>
      {team === 'africa1' && (
        <div className="text-center">
          <Pie data={africa1PieData} />
        </div>
      )}
      {team === 'africa2' && (
        <div className="text-center">
          <Pie data={africa2PieData} />
        </div>
      )}
      {team === 'africa1' && (
        <div className="flex">
          <div className="w-1/4">
            <button onClick={() => setActiveMenu('country')} className="bg-gray-200 p-4 w-full mb-2">국별협력사업</button>
            <button onClick={() => setActiveMenu('effect')} className="bg-gray-200 p-4 w-full mb-2">사업효과성제고비</button>
            <button onClick={() => setActiveMenu('admin')} className="bg-gray-200 p-4 w-full mb-2">사업행정비</button>
          </div>
          <div className="w-3/4">
            {activeMenu === 'country' && <Bar data={progressData} />}
            {activeMenu === 'effect' && <Bar data={progressData} />}
            {activeMenu === 'admin' && <Bar data={progressData} />}
          </div>
        </div>
      )}
      {team === 'africa2' && (
        <div className="flex">
          <div className="w-1/4">
            <button onClick={() => setActiveMenu('country')} className="bg-gray-200 p-4 w-full mb-2">국별협력사업</button>
            <button onClick={() => setActiveMenu('effect')} className="bg-gray-200 p-4 w-full mb-2">사업효과성제고비</button>
          </div>
          <div className="w-3/4">
            {activeMenu === 'country' && <Bar data={progressData} />}
            {activeMenu === 'effect' && <Bar data={progressData} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;