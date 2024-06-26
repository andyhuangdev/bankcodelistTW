export const copyBranchCode = (branchCode) => {
  navigator.clipboard.writeText(branchCode).then(() => {
    alert("已複製分行代碼");
  });
};

export const copyUrl = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert("已複製連結");
  });
};
