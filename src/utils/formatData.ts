export const formatYMD = (date: any): string => {
  //Lấy ra chuỗi định dạng của tham số date dựa vào thời gian hiện tại
  let today = new Date(date);
  // Lấy ra ngày
  let day = String(today.getDate());
  if (Number(day) > 0 && Number(day) < 10) {
    day = `0${day}`;
  }

  // Lấy ra tháng
  let month = String(today.getMonth() + 1);
  if (Number(month) > 0 && Number(month) < 10) {
    month = `0${month}`;
  }

  // Lấy ra năm
  let year = String(today.getFullYear());

  // Trả ra chuỗi thời gian có định dạng YYYY-MM-DD
  return `${year}-${month}-${day}`;
};
