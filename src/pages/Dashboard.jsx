import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';
import { put } from '@vercel/blob'; // Vercel Blob SDK

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, ChartDataLabels);

function Dashboard() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({ africa1: {}, africa2: {} });
  const [activeMenu, setActiveMenu] = useState(null);
  const [team, setTeam] = useState('africa1');
  const [blobUrls, setBlobUrls] = useState(() => {
    const savedUrls = localStorage.getItem('blobUrls');
    return savedUrls ? JSON.parse(savedUrls) : {};
  });

  useEffect(() => {
    localStorage.setItem('blobUrls', JSON.stringify(blobUrls));
  }, [blobUrls]);

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files).slice(0, 30);
    if (uploadedFiles.length > 0) {
      const latestFile = uploadedFiles.sort((a, b) => b.name.localeCompare(a.name))[0];
      setFiles(uploadedFiles);

      // Vercel Blob에 파일 업로드
      const blob = await put(latestFile.name, latestFile, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      setBlobUrls((prev) => ({
        ...prev,
        [latestFile.name]: blob.url,
      }));

      const reader = new FileReader();
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const africa1Data = {
          K2: parseFloat(sheet['K2']?.v || 0),
          U2: parseFloat(sheet['U2']?.v || 0),
          K4: parseFloat(sheet['K4']?.v || 0), U4: parseFloat(sheet['U4']?.v || 0),
          K23: parseFloat(sheet['K23']?.v || 0), U23: parseFloat(sheet['U23']?.v || 0),
          K34: parseFloat(sheet['K34']?.v || 0), U34: parseFloat(sheet['U34']?.v || 0),
          K48: parseFloat(sheet['K48']?.v || 0), U48: parseFloat(sheet['U48']?.v || 0),
          K61: parseFloat(sheet['K61']?.v || 0), U61: parseFloat(sheet['U61']?.v || 0),
          K68: parseFloat(sheet['K68']?.v || 0), U68: parseFloat(sheet['U68']?.v || 0),
          K70: parseFloat(sheet['K70']?.v || 0), U70: parseFloat(sheet['U70']?.v || 0),
          K72: parseFloat(sheet['K72']?.v || 0), U72: parseFloat(sheet['U72']?.v || 0),
          K74: parseFloat(sheet['K74']?.v || 0), U74: parseFloat(sheet['U74']?.v || 0),
          K76: parseFloat(sheet['K76']?.v || 0), U76: parseFloat(sheet['U76']?.v || 0),
          K83: parseFloat(sheet['K83']?.v || 0), U83: parseFloat(sheet['U83']?.v || 0),
          K88: parseFloat(sheet['K88']?.v || 0), U88: parseFloat(sheet['K88']?.v || 0),
          K84: parseFloat(sheet['K84']?.v || 0), U84: parseFloat(sheet['K84']?.v || 0),
          K85: parseFloat(sheet['K85']?.v || 0), U85: parseFloat(sheet['K85']?.v || 0),
          K86: parseFloat(sheet['K86']?.v || 0), U86: parseFloat(sheet['K86']?.v || 0),
          K87: parseFloat(sheet['K87']?.v || 0), U87: parseFloat(sheet['K87']?.v || 0),
          K89: parseFloat(sheet['K89']?.v || 0), U89: parseFloat(sheet['K89']?.v || 0),
          K90: parseFloat(sheet['K90']?.v || 0), U90: parseFloat(sheet['K90']?.v || 0),
          K91: parseFloat(sheet['K91']?.v || 0), U91: parseFloat(sheet['K91']?.v || 0),
          K92: parseFloat(sheet['K92']?.v || 0), U92: parseFloat(sheet['K92']?.v || 0),
          K93: parseFloat(sheet['K93']?.v || 0), U93: parseFloat(sheet['K93']?.v || 0),
          K94: parseFloat(sheet['K94']?.v || 0), U94: parseFloat(sheet['K94']?.v || 0),
          K95: parseFloat(sheet['K95']?.v || 0), U95: parseFloat(sheet['K95']?.v || 0),
        };
        const africa2Data = {
          K96: parseFloat(sheet['K96']?.v || 0),
          U96: parseFloat(sheet['U96']?.v || 0),
          K98: parseFloat(sheet['K98']?.v || 0), U98: parseFloat(sheet['U98']?.v || 0),
          K109: parseFloat(sheet['K109']?.v || 0), U109: parseFloat(sheet['U109']?.v || 0),
          K119: parseFloat(sheet['K119']?.v || 0), U119: parseFloat(sheet['U119']?.v || 0),
          K128: parseFloat(sheet['K128']?.v || 0), U128: parseFloat(sheet['U128']?.v || 0),
          K136: parseFloat(sheet['K136']?.v || 0), U136: parseFloat(sheet['U136']?.v || 0),
          K141: parseFloat(sheet['K141']?.v || 0), U141: parseFloat(sheet['U141']?.v || 0),
          K147: parseFloat(sheet['K147']?.v || 0), U147: parseFloat(sheet['U147']?.v || 0),
          K155: parseFloat(sheet['K155']?.v || 0), U155: parseFloat(sheet['U155']?.v || 0),
          K157: parseFloat(sheet['K157']?.v || 0), U157: parseFloat(sheet['U157']?.v || 0),
          K164: parseFloat(sheet['K164']?.v || 0), U164: parseFloat(sheet['U164']?.v || 0),
          K169: parseFloat(sheet['K169']?.v || 0), U169: parseFloat(sheet['U169']?.v || 0),
          K180: parseFloat(sheet['K180']?.v || 0), U180: parseFloat(sheet['U180']?.v || 0),
          K175: parseFloat(sheet['K175']?.v || 0), U175: parseFloat(sheet['U175']?.v || 0),
          K176: parseFloat(sheet['K176']?.v || 0), U176: parseFloat(sheet['U176']?.v || 0),
          K177: parseFloat(sheet['K177']?.v || 0), U177: parseFloat(sheet['U177']?.v || 0),
          K178: parseFloat(sheet['K178']?.v || 0), U178: parseFloat(sheet['U178']?.v || 0),
          K179: parseFloat(sheet['K179']?.v || 0), U179: parseFloat(sheet['U179']?.v || 0),
        };
        console.log('Uploaded Data:', { africa1: africa1Data, africa2: africa2Data }); // 디버깅 로그
        setData({ africa1: africa1Data, africa2: africa2Data });
      };
      reader.readAsBinaryString(latestFile);
      setMessage('성공적으로 업로드 되었습니다');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getBudgetData = (cell, teamData) => data[teamData]?.[cell] || 0;
  const getExecutionData = (cell, teamData) => data[teamData]?.[cell] || 0;

  const calculateDifference = (start, end, cell, teamData) => {
    if (!start || !end) return getExecutionData(cell, teamData);
    const startValue = data[`${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`]?.[cell] || 0;
    const endValue = data[`${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`]?.[cell] || 0;
    return endValue - startValue;
  };

  const africa1PieData = {
    labels: ['집행액', '잔여 예산'],
    datasets: [{
      data: [calculateDifference(startDate, endDate, 'U2', 'africa1'), getBudgetData('K2', 'africa1') - calculateDifference(startDate, endDate, 'U2', 'africa1')],
      backgroundColor: ['#4CAF50', '#B0BEC5'],
    }],
  };
  console.log('Africa1 Pie Data:', africa1PieData); // 디버깅 로그

  const africa2PieData = {
    labels: ['집행액', '잔여 예산'],
    datasets: [{
      data: [calculateDifference(startDate, endDate, 'U96', 'africa2'), getBudgetData('K96', 'africa2') - calculateDifference(startDate, endDate, 'U96', 'africa2')],
      backgroundColor: ['#D32F2F', '#B0BEC5'],
    }],
  };
  console.log('Africa2 Pie Data:', africa2PieData); // 디버깅 로그

  const progressData = {
    labels: team === 'africa1' ? ['에티오피아', '르완다', '우간다', '탄자니아', '케냐', '수단', '마다가스카르', '말라위', 'AU', '모잠비크'] : ['가나', '세네갈', '이집트', 'DR콩고', '나이지리아', '카메룬', '코트디부아르', '앙골라', '모로코', '알제리', '튀니지', '토고'],
    datasets: [{
      label: '집행률',
      data: (team === 'africa1' ? ['K4', 'K23', 'K34', 'K48', 'K61', 'K68', 'K70', 'K72', 'K74', 'K76'] : ['K98', 'K109', 'K119', 'K128', 'K136', 'K141', 'K147', 'K155', 'K157', 'K164', 'K169', 'K180']).map(cell => {
        const budget = getBudgetData(cell, team);
        const execution = calculateDifference(startDate, endDate, cell.replace('K', 'U'), team);
        return budget > 0 ? (execution / budget) * 100 : 0;
      }),
      backgroundColor: '#0288D1',
    }],
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button onClick={() => navigate('/')} className="bg-red-500 text-white px-6 py-3 rounded">로그아웃</button>
      </div>
      <div className="mb-8 flex justify-center">
        <input type="file" multiple onChange={handleFileUpload} accept=".xls,.xlsx" className="mb-2" />
      </div>
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold">업로드된 파일 목록</h3>
        <ul>
          {Object.keys(blobUrls).map((fileName) => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div>
      <div className="mb-8 flex justify-center space-x-2">
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy-MM-dd" className="p-2 border rounded" placeholderText="시작일자" />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat="yyyy-MM-dd" className="p-2 border rounded" placeholderText="종료일자" />
        <button onClick={() => {}} className="bg-green-500 text-white px-6 py-3 rounded">검색</button>
      </div>
      <div className="flex flex-col items-center space-y-16 mt-8">
        <button onClick={() => setActiveMenu(null)} className="bg-blue-500 text-white px-24 py-8 rounded text-4xl">아프리카1팀</button>
        <div className="text-center">
          <Pie
            data={africa1PieData}
            options={{
              plugins: {
                legend: { position: 'top' },
                tooltip: { enabled: true },
                datalabels: {
                  color: '#000',
                  formatter: (value, ctx) => {
                    const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                    const amount = (value / 1000000).toFixed(1); // 백만원 단위
                    return ctx.label === '잔여 예산' ? `${percentage}\n${amount}백만 원` : '';
                  },
                },
              },
            }}
          />
        </div>
        <button onClick={() => setActiveMenu(null)} className="bg-pink-500 text-white px-24 py-8 rounded text-4xl">아프리카2팀</button>
        <div className="text-center">
          <Pie
            data={africa2PieData}
            options={{
              plugins: {
                legend: { position: 'top' },
                tooltip: { enabled: true },
                datalabels: {
                  color: '#000',
                  formatter: (value, ctx) => {
                    const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                    const amount = (value / 1000000).toFixed(1); // 백만원 단위
                    return ctx.label === '잔여 예산' ? `${percentage}\n${amount}백만 원` : '';
                  },
                },
              },
            }}
          />
        </div>
      </div>
      {team === 'africa1' && (
        <div className="flex mt-4">
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
        <div className="flex mt-4">
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