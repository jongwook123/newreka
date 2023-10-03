import FetchTemplate from "utils/FetchTemplate";

export const GetKeyword = async () => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/hottopic/keyword/keyWordList',
            headers: {},
            method: "GET",
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}