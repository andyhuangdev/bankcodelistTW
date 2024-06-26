import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { copyUrl, copyBranchCode } from "../utilities/copy";

export default function BranchDetail() {
  const navigate = useNavigate();
  const { bankCode, branchCode, branchName } = useParams();
  const [branchDetail, setBranchDetail] = useState(null);
  const [allBanks, setAllBanks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const fetchBranchDetail = async (bankCode, branchCode, branchName) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${bankCode}/${branchCode}/${branchName}/`
    );
    setBranchDetail(response.data.branch);
    setBranches(response.data.branches || []);
    setAllBanks(response.data.banks || []);
  };

  useEffect(() => {
    if (bankCode && branchCode && branchName) {
      fetchBranchDetail(bankCode, branchCode, branchName);
    }
  }, [bankCode, branchCode, branchName]);

  const handleBankChange = (selectedOption) => {
    setSelectedBank(selectedOption);
    setSelectedBranch(null);

    const fetchBranches = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${selectedOption.value}/branches/`
      );
      setBranches(response.data || []);
    };
    fetchBranches();
  };

  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption);
    const path = `${import.meta.env.VITE_URL}${selectedBank.value}/${
      selectedOption.value
    }/${selectedOption.label}`;
    window.location.href = path;
  };

  if (!branchDetail) return;

  return (
    <div className="space-y-4">
      <h1 className="text-white">台灣銀行代碼查詢</h1>
      <div className="w-full flex flex-col items-center justify-center w-full md:w-[960px]">
        <label className="text-white">銀行名稱：</label>
        <Select
          className="w-[300px]"
          options={allBanks.map((bank) => ({
            value: bank.code,
            label: `${bank.code} ${bank.name}`,
          }))}
          value={selectedBank}
          onChange={handleBankChange}
          placeholder="請輸入關鍵字或選擇銀行..."
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <label className="text-white">分行名稱：</label>
        <Select
          className="w-[300px]"
          options={branches.map((branch) => ({
            value: branch.code,
            label: branch.name,
          }))}
          value={selectedBranch}
          onChange={handleBranchChange}
          placeholder="請輸入關鍵字或選擇分行名稱..."
          isDisabled={!selectedBank}
        />
      </div>
      <div className="text-xs text-white">
        可使用下拉選單或直接輸入關鍵字查詢
      </div>
      <div className="text-white">
        <h2>{branchDetail.name}</h2>
        <p>分行代碼: {branchDetail.code}</p>
        <p>地址: {branchDetail.address}</p>
        <p>電話: {branchDetail.phone}</p>
      </div>
      <div className="space-x-3 text-white">
        <button onClick={() => navigate("/")}>重新查詢</button>
        <button onClick={() => copyBranchCode(branchDetail.code)}>
          複製分行代碼
        </button>
        <button onClick={copyUrl}>複製此頁面連結</button>
        <button
          onClick={() =>
            (window.location.href = "https://data.gov.tw/dataset/6041")
          }
        >
          資料來源：政府資料開放平台
        </button>
      </div>
    </div>
  );
}
