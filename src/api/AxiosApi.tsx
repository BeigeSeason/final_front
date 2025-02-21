import axios from "axios";
import Common from "../util/Common";

const AxiosApi = {
  // 멤버 조회 (전체)
  memberList: async (page = 1, size = 10, searchType = "NAME", searchValue = "") => {
    console.log("params:", {page, size, searchType, searchValue});
    try {
      const response = await axios.get(`${Common.FINAL_DOMAIN}/member/list`, {
        params: { page, size, searchType, searchValue },
      });
      return response.data;
    } catch (error) {
      console.error("멤버 리스트 조회 중 오류 발생:", error);
      throw error;
    }
  },
};
export default AxiosApi;
